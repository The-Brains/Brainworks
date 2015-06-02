/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var CommentSchema = require('./Comment').schema;
//Initialisierung des Diagrammschemas
var diagramSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  isPublic: {type: Boolean, 'default': false},
  shapes: [mongoose.Schema.Types.Mixed],
  comments: [CommentSchema],
  thumbnail: {type: String, 'default': 'http://placehold.it/700x300'},
  elementId: {type: Number, 'default': 1}
});

module.exports = mongoose.model('Diagram', diagramSchema);