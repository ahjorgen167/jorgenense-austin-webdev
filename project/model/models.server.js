module.exports = function() {
    /*
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/cs5610fall2016';

    if(process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI
    }

    mongoose.connect(connectionString);
    */
    var models = {
        playerModel: require("./player/player.model.server")(),
        actionModel: require("./action/action.model.server")(),
        messageModel: require("./message/message.model.server")(),
        gameModel: require("./game/game.model.server")()
    };

    return models;
};