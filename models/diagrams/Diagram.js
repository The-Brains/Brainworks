/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var diagramSchema = new mongoose.Schema({
  name: String,
  description: String
});

