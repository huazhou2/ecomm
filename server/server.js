const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Customers = require('./models/customers.js');
const dbRoute = 'mongodb://localhost:27017/mydb';
const bodyParser = require('body-parser');

const users = require('./routes/user_routes');
mongoose.connect(
  dbRoute,
  {useNewUrlParser: true},
);

const port = 3001;
const app = express();

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
require('./passport')(passport);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const path = require('path');
app.use('/', express.static(path.join(__dirname, '../client/build')));

app.use('/api/customers', users);

//if not api path, reedirect to home
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build')});
});
app.listen(port, () => {
  console.log(`Server is not running on Port ${port}`);
});
