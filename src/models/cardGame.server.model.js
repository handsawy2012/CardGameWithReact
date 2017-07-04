var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cardGameSchema = new Schema({
   winnerName: { type: String },
  score: { type: String },
  createdOn: { type: Date, default: Date.now }
});
module.exports = mongoose.model('cardGameWinner', cardGameSchema);