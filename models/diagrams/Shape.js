/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var shapeSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  name: String,
  diagramId: ObjectId
});