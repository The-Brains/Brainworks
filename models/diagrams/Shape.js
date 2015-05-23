/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

var shapeSchema = new mongoose.Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  name: {type: String, required: true},
  diagramId: {type: mongoose.Schema.ObjectId, required: true, auto: false}
});

var classSchema = new mongoose.Schema({
  //attributes: 
  //methods
});

/**
 * TODO die anderen shapes typen definieren
 */

module.exports = mongoose.model('Shape', shapeSchema);