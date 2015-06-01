/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var relationSchema = new mongoose.Schema({
  shapeA: {type: mongoose.Schema.ObjectId},
  shapeB: {type: mongoose.Schema.ObjectId},
  name: {type: String, required: true},
  coordsA: {type: Array, required: true},
  coordsB: {type: Array, required: true}
}, {discriminatorKey : '_type'});

var inheritanceSchema = relationSchema.extend({});

var associationSchema = relationSchema.extend({
  multiplicityA: Number,
  multiplicityB: Number
});

var uniDirectionalAssociationSchema = relationSchema.extend({
  multiplicityB: Number
});

var aggregationSchema = relationSchema.extend({
  multiplicityA: Number,
  multiplicityB: Number
});

var compositionSchema = relationSchema.extend({
  multiplicityA: Number,
  multiplicityB: Number
});

var realizationSchema = relationSchema.extend({});

var dependencySchema = relationSchema.extend({});

var linkSchema = relationSchema.extend({});

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