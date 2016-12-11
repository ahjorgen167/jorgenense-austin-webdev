module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var messageSchema = require("./message.schema.server")();
    var Message = mongoose.model("message", messageSchema);
    
    var api = {
        createMessage: createMessage,
        findMessageById: findMessageById,
        updateMessage: updateMessage,
        deleteMessage: deleteMessage,
        findMessagesByPlayers: findMessagesByPlayers,
        findAllMessagesForPlayer: findAllMessagesForPlayer
    };
    return api;

    function createMessage(message) {
        var deferred = q.defer();
        Message.create(message, function(err, message){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(message);
            }
        });
        return deferred.promise;
    }

    function findAllMessagesForPlayer(playerId){
        var deferred = q.defer();
        Message
            .find({$or: [{'to': playerId}, {'from': playerId}]})
            .sort({dateSent: -1})
            .exec(function(err, messages){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(messages);
                }
            });
        return deferred.promise; 
    }

    function findMessagesByPlayers(player1, player2){
        var deferred = q.defer();
        Message
            .find({$or: [{'to': player1, 'from': player2}, 
                         {'to': player2, 'from': player1}]})
            .sort({dateSent: -1})
            .exec(function(err, messages){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(messages);
                }
            });
        return deferred.promise;        
    }
    
    function findMessageById(messageId){
        var deferred = q.defer();
        Message
            .findById(messageId, function(err, message){
                if (err) {
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(message);
                }
            });
        return deferred.promise;
    }

    function updateMessage(messageId, message){
        delete message._id;
        var deferred = q.defer();

        Message.update({_id: messageId},{$set: message}, function(err, message){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(message);
            }
        });
        return deferred.promise;
    }

    function deleteMessage(messageId) {
        var deferred = q.defer();
        Message.remessage({_id: messageId}, function(err, message){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(message);
            }
        });
        return deferred.promise;
    }
};
