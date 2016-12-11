module.exports = function() {
    var mongoose = require("mongoose");

    var cardSuit = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
    var cardRank = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']

    var ActionSchema = mongoose.Schema({
        player: {type: mongoose.Schema.ObjectId, ref:"Player"},
        game: {type: mongoose.Schema.ObjectId, ref:'Game'},
        currentMove: {type: {
            rank: {type: String, enum: cardRank},
            suit: {type: String, enum: cardSuit}
            }, default: null},
        deck: [{
            rank: {type: String, enum: cardRank},
            suit: {type: String, enum: cardSuit}
        }]
    }, {collection: "assignment.action"});

    return ActionSchema;
};