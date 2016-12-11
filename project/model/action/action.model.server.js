module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var actionSchema = require("./action.schema.server")();
    var Action = mongoose.model("action", actionSchema);
    
    var api = {
        createAction: createAction,
        findActionById: findActionById,
        updateAction: updateAction,
        deleteAction: deleteAction
    };
    return api;

    function createAction(action) {
        var deferred = q.defer();
        Action.create(action, function(err, action){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(action);
            }
        });
        return deferred.promise;
    }
    
    function findActionById(actionId){
        var deferred = q.defer();

        Action
            .findById(actionId)
            .populate('player game')
            .exec(function(err, action){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(action);
                }
            });
        return deferred.promise;
    }

    function updateAction(actionId, action){
        delete action._id;
        var deferred = q.defer();

        Action.update({_id: actionId},{$set: action}, function(err, action){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(action);
            }
        });
        return deferred.promise;
    }

    function deleteAction(actionId) {
        var deferred = q.defer();
        Action.remove({_id: actionId}, function(err, action){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(action);
            }
        });
        return deferred.promise;
    }
};
