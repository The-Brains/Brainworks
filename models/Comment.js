/**
 * @author Dennis Stumm
 */
var mongoose = require('mogoose');

var commentSchema = new mongoose.Schema({
  text: String,
  creationDate: Date,
  diagramId: ObjectId,
  author: ObjectId
});