module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var GameSchema = require("./game.schema.server")();
    var Game = mongoose.model("Game", GameSchema);
    var Action = mongoose.model('action');
    var Player = mongoose.model('Player');
    var api = {
        createGame: createGame,
        findAllGamesForPlayerId: findAllGamesForPlayerId,
        findGameById: findGameById,
        updateGame: updateGame,
        deleteGame: deleteGame
    };
    
    return api;

    function getGameModel(){
        return Game;
    }

    function createGame(game) {
        console.log(game);
        var deferred = q.defer();
        Game.create(game, function(err, game){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function findAllGamesForPlayerId(playerId){
        var deferred = q.defer();
        Game.find({$or:[ {'player1': playerId}, {'player2': playerId}]})
            .populate('player1 player2 player1Action player2Action moves winner')
            .exec(function(err, game){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(game);
                }
            });
        return deferred.promise;
    }
    
    function findGameById(gameId){
        var deferred = q.defer();

        Game
            .findById(gameId)
            .populate('player1 player2 player1Action player2Action moves winner')
            .exec(function(err, game){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(game);
                }
            });
        return deferred.promise;
    }

    function updateGame(gameId, game){
        delete game._id;
        var player1Action = null;
        var player2Action = null;
        if(isObject(game.player1Action) && isObject(game.player2Action)){
            player1Action = game.player1Action;
            player2Action = game.player2Action;
        }

        var deferred = q.defer();

        Game.update({_id: gameId},{$set: game}, function(err, game){
            if (err) {
                deferred.reject(err);
            }
            else{
                if(player1Action != null && player2Action != null){
                    Action
                        .update(
                            {_id: player1Action._id}, 
                            {$set: player1Action},
                            function(err, response){
                                if(err){
                                    deferred.reject(err);
                                }
                            });
                    Action
                        .update(
                            {_id: player2Action._id}, 
                            {$set: player2Action},
                            function(err, response){
                                if(err){
                                    deferred.reject(err);
                                }
                            });
                }
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function deleteGame(gameId) {
        var deferred = q.defer();
        Game.remove({_id: gameId}, function(err, game){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(game);
            }
        });
        return deferred.promise;
    }

    function isObject(val) {
        if (val === null) { 
            return false;
        }
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

};
