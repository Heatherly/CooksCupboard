/*NEED TO UPDATE THIS WITH OUR RECIPES MODEL TO INCLUDE THE FOLLOWING FIELDS:
  Title, Ingredients, Source, Source URL, Picture URL (All from Edaman, or when the user creates one)
  
  --ALSO NEEDED FIELDS:
  Notes (Annotatiosn the user can add to Edaman recipes or the recipes the user creates)
  Saved (default: False, a Boolean to say if it's saved to the user's MyCookbook), 
  List (default: False, a Boolean to say if it's added to the Shopping List or not)
*/


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
