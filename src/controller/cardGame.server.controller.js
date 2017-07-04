var cardGameWinner = require('../models/cardGame.server.model');

exports.create = function (winnerName, score,cb) {
var entry = new cardGameWinner({
        winnerName: winnerName,
        score: score,
      });
      entry.save(cb);
}

