'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  money: Number,
  long: Number,
  lat: Number
})
module.exports = mongoose.mode('Player', PlayerSchema);
