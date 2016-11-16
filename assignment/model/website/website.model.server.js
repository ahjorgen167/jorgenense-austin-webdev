module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var WebsiteSchema = require("./Website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        var deferred = q.defer();

        Website.create(website, function(err, website){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function findAllWebsitesForUser(userId){
        var deferred = q.defer();

        Website.find({"_user":userId}, function(err, website){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }
    
    function findWebsiteById(websiteId){
        var deferred = q.defer();

        Website.findById(websiteId, function(err, website){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website){
        var userId = website._user;
        delete website._id;
        delete website._user;
        var deferred = q.defer();

        Website.update({_id: websiteId},{$set: website}, function(err, website){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();

        Website.remove({_id: websiteId}, function(err, website){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(website);
            }
        });
        return deferred.promise;
    }

};