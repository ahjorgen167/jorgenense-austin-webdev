
module.exports = function() {
    var q = require("q");
    var mongoose = require("mongoose")
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {

        var deferred = q.defer();

        User.create(user, function(err, user_data){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(user_data);
            }
        });
        return deferred.promise;
    }
    
    function findUserById(userId) {
        var deferred = q.defer();

        User.findById(userId, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        User.findOne({username: username}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        delete user._id;
        var deferred = q.defer();

        User.update({_id: userId},{$set: user}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        User.remove({_id: userId}, function(err, response){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        User.findOne({username: username, password: password}, function(err, response){
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