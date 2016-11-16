module.exports = function() {

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
        console.log("website.model.server.createWebsiteForUser()");
        console.log(website);
        return Website.create(website);
    }

    function findAllWebsitesForUser(userId){
        return Website.find({"_user":userId});
    }
    
    function findWebsiteById(websiteId){
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website){
        var userId = website._user;
        delete website._id;
        delete website._user;
        return Website
            .update({_id: websiteId},{
                $set: website
            });
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

};