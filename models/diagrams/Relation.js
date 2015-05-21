/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var relationSchema = new mongoose.Schema({
  shapeA: {type: mongoose.Schema.ObjectId, required: true},
  shapeB: {type: mongoose.Schema.ObjectId, required: true},
  title: {type: String, required: true},
  coordsA: {type: Array, required: true},
  coordsB: {type: Array, required: true}
});

/**
 * TODO die anderen relation typen definieren
 */

module.exports = mongoose.model('Relation', relationSchema);