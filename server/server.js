var express = require("express");
var MongooseConnection = require('mongoose-connection-promise');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var Recipe = require("./models/Recipe.js");



var app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Static file support with public folder
app.use(express.static("public"));

app.use(require('./routes/general'));

app.use(require('./routes/auth'));
 

// connecting mongoose to datbase using mongoose-connection-promise npm
var opts = {
  host: 'localhost',
  database: 'CooksCupboard'
};
 
var mongooseConnection = new MongooseConnection(opts);
 
mongooseConnection.connect()
  .then(connection => {
    console.log("connected to db");
  })
  .catch(err => {
    console.log(err);
  });


app.listen(8000, function() {
  console.log("App running on port 8000!");
});
