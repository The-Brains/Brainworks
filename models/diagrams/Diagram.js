/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  isPublic: {type: Boolean, 'default': false}
});