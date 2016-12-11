
module.exports = function() {
    var q = require("q");
    var mongoose = require("mongoose")
    var PlayerSchema = require("./player.schema.server")();
    var Player = mongoose.model("Player", PlayerSchema);

    var api = {
        createPlayer: createPlayer,
        findPlayerById: findPlayerById,
        findPlayerByCredentials: findPlayerByCredentials,
        findPlayerByUsername: findPlayerByUsername,
        findPlayersByUsername: findPlayersByUsername,
        updatePlayer: updatePlayer,
        deletePlayer: deletePlayer
    };
    return api;

    function createPlayer(player) {
        var deferred = q.defer();

        Player.create(player, function(err, player_data){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(player_data);
            }
        });
        return deferred.promise;
    }
    
    function findPlayerById(playerId) {
        var deferred = q.defer();

        Player
            .findById(playerId)
            .populate('friends games')
            .populate(
                {path:'games',
                populate:{path:'player1 player2'}})
            .exec(function(err, response){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(response);
                }
            });
        return deferred.promise;
    }

    function findPlayerByUsername(username) {
        var deferred = q.defer();
        Player
            .findOne({username: username}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }


    function findPlayersByUsername(username) {
        var deferred = q.defer();
        Player
            .find({username: new RegExp(username, "i")})
            .populate('friends games')
            .exec(function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function updatePlayer(playerId, player) {
        delete player._id;
        var deferred = q.defer();
        Player.update({_id: playerId},{$set: player}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function deletePlayer(playerId) {
        var deferred = q.defer();

        Player.remove({_id: playerId}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findPlayerByCredentials(username, password) {
        var deferred = q.defer();

        Player.findOne({username: username, password: password}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }
};