/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var diagramSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  authorId: {type: mongoose.Schema.ObjectId, auto: false, required: true},
  isPublic: {type: Boolean}
});

module.exports = mongoose.model('Diagram', diagramSchema);