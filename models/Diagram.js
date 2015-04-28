/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var diagramSchema = new mongoose.Schema({
  height: Number,
  width: Number,
  name: String,
  description: String
});

