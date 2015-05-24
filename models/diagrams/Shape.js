/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var RelationSchema = require('./Relation');

var shapeSchema = new mongoose.Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  name: {type: String, required: true},
  relations: [RelationSchema]
}, {collection : 'shapes', discriminatorKey : '_type'});

var classSchema = new mongoose.Schema({
  attributes: [String],
  methods: [String]
});
