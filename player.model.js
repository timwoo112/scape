var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  money: String,
  long: String,
  lat: String
})
module.exports = mongoose.model('player', PlayerSchema);
