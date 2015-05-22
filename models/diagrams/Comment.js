/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  text: String,
  creationDate: Date,
  diagramId: mongoose.Schema.ObjectId,
  author: mongoose.Schema.ObjectId
});