/**
 * New node file
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  forename: {type: String, required: true},
  surname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
//  failedLoginCount
});

module.exports = mongoose.model('User', userSchema, 'user');