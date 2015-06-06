/**
 * Verbindungsschemen werden erstellt
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
/* Initialisierung des Prototyps der Beziehungselemente */
var relationSchema = new mongoose.Schema({
  _id: Number,
  shapeA: Number,
  shapeB: Number,
  name: {type: String, required: true},
  coordsA: {type: Array, required: true},
  coordsB: {type: Array, required: true}
}, {discriminatorKey : '_type'});

/* Vererbungselement erbt vom Prototyp der Beziehungselemente */
var inheritanceSchema = relationSchema.extend({});
/* Assoziationselement erbt vom Prototyp der Beziehungselemente */
var associationSchema = relationSchema.extend({
  multiplicityA: String,
  multiplicityB: String
});
/* Gerichtetes Assoziationselement erbt vom Prototyp der Beziehungselemente */
var uniDirectionalAssociationSchema = relationSchema.extend({
  multiplicityB: String
});
/* Aggregationselement erbt vom Prototyp der Beziehungselemente */
var aggregationSchema = relationSchema.extend({
  multiplicityA: String,
  multiplicityB: String
});
/* Kompositionselement erbt vom Prototyp der Beziehungselemente */
var compositionSchema = relationSchema.extend({
  multiplicityA: String,
  multiplicityB: String
});
/* Realisierungselement erbt vom Prototyp der Beziehungselemente */
var realizationSchema = relationSchema.extend({});
/* Abhängigkeitselement erbt vom Prototyp der Beziehungselemente */
var dependencySchema = relationSchema.extend({});
/* Verbinderelement erbt vom Prototyp der Beziehungselemente */
var linkSchema = relationSchema.extend({});
/* Erstelle Models für die einzelnen Verbindungselemente */
module.exports = {
  Inheritance: mongoose.model('Inheritance', inheritanceSchema),
  Association: mongoose.model('Association', associationSchema),
  UniDirectionalAssociation: mongoose.model('UniDirectionalAssociation', uniDirectionalAssociationSchema),
  Aggregation: mongoose.model('Aggregation', aggregationSchema),
  Composition: mongoose.model('Composition', compositionSchema),
  Realization: mongoose.model('Realization', realizationSchema),
  Dependency: mongoose.model('Dependency', dependencySchema),
  Link: mongoose.model('Link', linkSchema)
};