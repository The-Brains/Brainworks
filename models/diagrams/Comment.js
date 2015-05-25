/**
 * @author Dennis Stumm
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  text: {type: String, required: true},
  creationDate: {type: Date, 'default': Date.now},
  author: {type: String, required: true}
});