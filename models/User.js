/**
 * New node file
 */

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  forename: String,
  surname: String,
  username: String,
  password: String,
  email: String
});

mongoose.model('User', userSchema, 'user');