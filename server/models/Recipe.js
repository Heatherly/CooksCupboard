var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RobotSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Name required"
  },
    power: {
    type: String,
    trim: true,
    required: "Power Level required"
  },
    defense: {
    type: String,
    trim: true,
    required: "Defense Level required"
  },
});

var Robot = mongoose.model("Robot", RobotSchema);
module.exports = Robot;
