/**
 * @author Dennis Stumm
 */
var mongoose = requrie('mongoose');

var relationSchema = new mongoose.Schema({
  shapeA: ObjectId,
  shapeB: ObjectId,
  title: String,
  coordsA: Array,
  coordsB: Array
});