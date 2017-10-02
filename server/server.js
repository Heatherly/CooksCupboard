var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var Robot = require("./models/Robot.js");


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


// Database configuration for mongoose
// db: week18day3mongoose
mongoose.connect("mongodb://localhost/robotbattle");
// Hook mongoose connection to db
var db = mongoose.connection;

// Log any mongoose errors
//THIS .on IS A DEPRECATED METHOD. LOOK UP THE NEW WAY TO START MONGOOSE'S CONNECTION TO DB
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
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
