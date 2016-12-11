module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var moveSchema = require("./move.schema.server")();
    var Move = mongoose.model("move", moveSchema);
    
    var api = {
        createMove: createMove,
        findMoveById: findMoveById,
        updateMove: updateMove,
        deleteMove: deleteMove
    };
    return api;

    function createMove(move) {
        var deferred = q.defer();
        Move.create(move, function(err, move){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(move);
            }
        });
        return deferred.promise;
    }
    
    function findMoveById(moveId){
        var deferred = q.defer();

        Move
            .findById(moveId, function(err, move){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(move);
                }
            });
        return deferred.promise;
    }

    function updateMove(moveId, move){
        delete move._id;
        var deferred = q.defer();

        Move.update({_id: moveId},{$set: move}, function(err, move){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(move);
            }
        });
        return deferred.promise;
    }

    function deleteMove(moveId) {
        var deferred = q.defer();
        Move.remove({_id: moveId}, function(err, move){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(move);
            }
        });
        return deferred.promise;
    }
};
