module.exports = function() {
    var mongoose = require("mongoose");
    var Game = require("../game/game.schema.server.js")();

    var PlayerSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        avatar: {type: String, default: 'http://www.mellottbrothers.com/wp-content/uploads/2013/02/blank-profile-hi-400x380.png'},
        dateCreated: {type: Date, default: Date.now},
        facebook: {
            id:    String,
            token: String
        },
        games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
        friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
        admin: {type: Boolean, default: false}
    }, {collection: "assignment.player"});

    return PlayerSchema;
};