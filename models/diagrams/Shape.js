/**
 * Klassenschemen werden erstellt & entsprechenden Klassenelementen zugewiesen
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
/* Initialisierung des Prototyps der Klassenschemen */
var shapeSchema = new mongoose.Schema({
  _id: Number,
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  height: {type: Number, required: true},
  width: {type: Number, required: true},
  name: {type: String, required: true}
}, {discriminatorKey : '_type'});
/* Leere Klasse erbt vom Prototyp der Klassenelemente */
var emptyClassSchema = shapeSchema.extend({});
/* Abstrakte Klasse erbt vom Prototyp der Klassenelemente */
var abstractClassSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});
/* Kommentar erbt vom Prototyp der Klassenelemente */
var commentSchema = shapeSchema.extend({});
/* Aktive Klasse erbt vom Prototyp der Klassenelemente */
var activeClassSchema = shapeSchema.extend({});
/* Standartklasse erbt vom Prototyp der Klassenelemente */
var classSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});
/* Interface erbt vom Prototyp der Klassenelemente */
var interfaceSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});
/* Erstelle Models zu den einzelnen Klassenelementen */
module.exports = {
  EmptyClass: mongoose.model('EmptyClass', emptyClassSchema),
  AbstractClass: mongoose.model('AbstractClass', abstractClassSchema),
  Comment: mongoose.model('Comment', commentSchema),
  ActiveClass: mongoose.model('ActiveClass', activeClassSchema),
  Class: mongoose.model('Class', classSchema),
  Interface: mongoose.model('Interface', interfaceSchema)
};