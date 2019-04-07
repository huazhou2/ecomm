const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/customers');
const secret = 'huazhou';

router.post('/register', function(req, res) {
  const {errors, isValid} = validateRegisterInput(req.body);
  console.log('register', errors);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists',
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        group: 'regular',
        products: [],
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          email: user.name,
        };
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) console.error('There is some error in token', err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            }
          },
        );
      } else {
        errors.password = 'Incorrect Password';
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  '/me',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    return res.json(req.user);
  },
);

router.get(
  '/getadmindata',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    if (req.user.group === 'admin')
      User.find((err, data) => {
        if (err) return res.json('got errors');
        res.status(200).send(data);
      });
    else res.status(401).send({Errors: 'You are not admin'});
  },
);
router.post(
  '/addtocart',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
	
    const {product} = req.body;
    let curproducts = req.user.products || [];
	  
      var foundIndex = curproducts.findIndex(
        x =>
          x.name === product.name &&
          x.size === product.size &&
          x.color === product.color,
      );
      if (foundIndex != -1)
        curproducts[foundIndex].quantity =
          +curproducts[foundIndex].quantity + +product.quantity;
      else curproducts.push(product);
      User.findOneAndUpdate(
        {
          email: req.user.email,
        },
        {$set: {products: curproducts}},
        {new: true},
        function(err, res) {
          if (err) console.log('something wrong in updating');
		// console.log('Success update:', res);
        },
      );
    return res.json(curproducts);
  },
);

router.post(
  '/clearcart',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
      User.findOneAndUpdate(
        {
          email: req.user.email,
        },
        {$set: {products:[] }},
        {new: true},
        function(err, res) {
          if (err) console.log('something wrong in updating');
        },
      );
    return res.json([]);
},
);
router.post(
  '/updatecart',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {products} = req.body;
	  console.log('updating cart:',products);
      User.findOneAndUpdate(
        {
          email: req.user.email,
        },
        {$set: {products: products}},
        {new: true},
        function(err, res) {
          if (err) console.log('something wrong in updating');
        },
      );
    return res.json(products);
},
);
	

module.exports = router;
