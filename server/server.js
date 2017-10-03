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


app.get("/robots", function(req, res) {
	Robot.find(function (error, doc) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(doc);
        }
    });
});

app.post("/robots", function(req, res) {
    
    var robot = new Robot(req.body);

	robot.save(function (error, doc) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(doc);
        }
    });
});

app.listen(8000, function() {
  console.log("App running on port 8000!");
});
