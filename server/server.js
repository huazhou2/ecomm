const express = require('express');
const mongoose = require('mongoose');
const port = 3001;
const app = express();
const router = express.Router();
const Customers = require('./customers.js');
const dbRoute = 'mongodb://localhost:27017/mydb';
const bodyParser = require('body-parser');

mongoose.connect(
  dbRoute,
  {useNewUrlParser: true},
);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router.get('/getdata', function(req, res) {
  Customers.find((err, data) => {
    if (err) return res.json('got errors');
    return res.json(data);
  });
});

router.post('/put', function(req, res) {
  Customers.findOne({name: req.body.name}, function(err, user) {
    if (user) res.status(300).send({message:'User Already Registered'});
  });
  let data = new Customers();
  const {name, password} = req.body;
  data.name = name;
  data.password = password;
  data.group = 'regular';
  data.products = [];
  data.save()
    .then(data => {
	data.message='User Created Successfully';
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send({message:'Unable to save to database'});
    });
});

router.post('/check', function(req, res) {
  let data = {};
  const {name, password} = req.body;
  data.name = name;
  Customers.findOne(data, function(err, user) {
    if (err) res.status(400).send({message: 'Server Error'});
    if (!user) res.status(300).send({message: 'User Not Found'});
    else if (user.password === password) {
      data.password = password;
      data.group = 'regular';
      data.products = [];
      return res.send(user);
    } else {
      return res.status(300).send({message: 'Password Incorrect'});
    }
  });
});

app.use('/customers', router);
app.listen(port);
