module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function getPageModel(){
        return Page;
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        var deferred = q.defer();
        Page.create(page, function(err, page){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function findAllPagesForWebsite(websiteId){
        var deferred = q.defer();
        Page.find({"_website":websiteId}, function(err, page){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }
    
    function findPageById(pageId){
        var deferred = q.defer();

        Page.findById(pageId, function(err, page){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function updatePage(pageId, page){
        delete page._id;
        delete page._website;
        var deferred = q.defer();

        Page.update({_id: pageId},{$set: page}, function(err, page){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }

    function deletePage(pageId) {
        var deferred = q.defer();

        Page.remove({_id: pageId}, function(err, page){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(page);
            }
        });
        return deferred.promise;
    }
};
