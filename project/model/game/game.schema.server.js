module.exports = function() {
    var mongoose = require("mongoose");
    var gameStatus = ['WAITING_FOR_SECOND_PLAYER', 'STARTED', 'COMPLETE', 'CANCELLED'];
    var cardSuit = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
    var cardRank = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']

    var GameSchema = mongoose.Schema({
        player1: {type: mongoose.Schema.ObjectId, ref:"Player"},
        player2: {type: mongoose.Schema.ObjectId, ref:"Player"},
        player1Action: {type: mongoose.Schema.ObjectId, ref:"action"},
        player2Action: {type: mongoose.Schema.ObjectId, ref:"action"},
        hold: [{
            rank: {type: String, enum: cardRank},
            suit: {type: String, enum: cardSuit}
        }],
        winner: {type: mongoose.Schema.ObjectId, ref:"Player", default: null},
        status: {type: String, enum: gameStatus, default: 'WAITING_FOR_SECOND_PLAYER'},
        dateStarted: {type: Date, default: Date.now},
        moves: [{
            player1Move: String,
            player2Move: String,
            player1Won: {type: Boolean, default: false},
            player2Won: {type: Boolean, default: false}
        }]
    }, {collection: "assignment.game"});

    return GameSchema;
};