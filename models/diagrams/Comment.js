/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var diagramCommentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  creationDate: {type: Date, 'default': Date.now},
  author: {type: String, required: true}
});

module.exports = mongoose.model('DiagramComment', diagramCommentSchema);