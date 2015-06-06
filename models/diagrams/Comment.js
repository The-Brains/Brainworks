/**
 * Diagrammkommentarschema wird erstellt
 */
var mongoose = require('mongoose');

/* Definition von Charaktermerkmalen des Kommentars */
var diagramCommentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  creationDate: {type: Date, 'default': Date.now},
  author: {type: String, required: true}
});

/* Erstellen des Models aus dem definierten Schema */
module.exports = mongoose.model('DiagramComment', diagramCommentSchema);