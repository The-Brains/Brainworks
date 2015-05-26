/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var shapeSchema = new mongoose.Schema({
  x: {type: Number, required: true},
  y: {type: Number, required: true},
  name: {type: String, required: true},
  relations: [mongoose.Schema.types.Mixed]
}, {discriminatorKey : '_type'});

var emptyClassSchema = new shapeSchema.extend();

var abstractClassSchema = new shapeSchema.extend();

var commentSchema = new shapeSchema.extend();

var activeClassSchema = new shapeSchema.extend();

var classSchema = new shapeSchema.extend({
  attributes: [String],
  methods: [String]
});

module.exports = {
  EmptyClass: mongoose.model('EmptyClass', emptyClassSchema),
  AbstractClass: mongoose.model('AbstractClass', abstractClassSchema),
  Comment: mongoose.model('Comment', commentSchema),
  ActiveClass: mongoose.model('ActiveClass', activeClassSchema),
  Class: mongoose.model('Class', classSchema)
};