/**
 * New node file
 */

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  forename: String,
  surname: String,
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);