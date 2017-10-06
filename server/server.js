var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Recipe = require("./models/Recipe.js");

mongoose.connect('mongod://localhost:27017/cookscupboard', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;


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
 

app.listen(8000, function() {
  console.log("App running on port 8000!");
});
