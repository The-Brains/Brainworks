/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var shapeSchema = new mongoose.Schema({
  _id: Number,
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  height: {type: Number, required: true},
  width: {type: Number, required: true},
  name: {type: String, required: true}
}, {discriminatorKey : '_type'});

var emptyClassSchema = shapeSchema.extend({});

var abstractClassSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});

var commentSchema = shapeSchema.extend({});

var activeClassSchema = shapeSchema.extend({});

var classSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});

var interfaceSchema = shapeSchema.extend({
  attributes: [String],
  methods: [String]
});

module.exports = {
  EmptyClass: mongoose.model('EmptyClass', emptyClassSchema),
  AbstractClass: mongoose.model('AbstractClass', abstractClassSchema),
  Comment: mongoose.model('Comment', commentSchema),
  ActiveClass: mongoose.model('ActiveClass', activeClassSchema),
  Class: mongoose.model('Class', classSchema),
  Interface: mongoose.model('Interface', interfaceSchema)
};