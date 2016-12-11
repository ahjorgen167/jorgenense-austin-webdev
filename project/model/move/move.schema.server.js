module.exports = function() {
    var mongoose = require("mongoose");
    var Game = require("../game/game.schema.server.js")();

    var WebsiteSchema = mongoose.Schema({
        _game: {type: mongoose.Schema.ObjectId, ref:"Game"},
        player1Username: String,
        player2Username: String,
        player1CardPlayed: String,
        player2CardPlayed: String,
        player1Won: Boolean,
        player2Won: Boolean
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};