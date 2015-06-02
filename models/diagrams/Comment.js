/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
/* Definition von Charaktermerkmalen der Elemente in einem Kommentar */
var diagramCommentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  creationDate: {type: Date, 'default': Date.now},
  author: {type: String, required: true}
});
/* An das vom require call erhaltene Objekt wird das Schema gehängt */
module.exports = mongoose.model('DiagramComment', diagramCommentSchema);