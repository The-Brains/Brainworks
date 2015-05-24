/**
 * New node file
 */
var mongoose = require('mongoose');
var DiagramSchema = require('../diagrams/Diagram');

var userSchema = new mongoose.Schema({
  forename: {type: String, required: true},
  surname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  loggedIn: {type: Boolean},
  diagrams: [DiagramSchema]
});

module.exports = mongoose.model('User', userSchema);