const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
    owner: {type: String, required: true},
    room: {type: String, required: true},
    game: {type: String, required: true},

    homeScore: {type: Number, required: true},
    awayScore: {type: Number, required: true},
    homeWins: {type: Boolean}, // for playoff games
    awayWins: {type: Boolean} // for playoff games
});

module.exports = mongoose.model('Bet', betSchema);

