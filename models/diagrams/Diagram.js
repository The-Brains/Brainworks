/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');
var ShapeSchema = require('./Shape');
var CommentSchema = require('./Comment');

module.exports = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  isPublic: {type: Boolean, 'default': false},
  shapes: [ShapeSchema],
  comments: [CommentSchema],
  thumbnail: {type: String, 'default': 'http://placehold.it/700x300'}
});