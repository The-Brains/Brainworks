/**
 * New node file
 */
var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  revokedAt: {type: Date},
  token: {type: String},
  userId: {type: ObjectId},
  loggedIn: {type: Boolean}
});

mongoose.model('Token', tokenSchema, 'token');