module.exports = function() {

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
        console.log("page.model.server.createPage()");
        console.log(page);
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({"_website":websiteId});
    }
    
    function findPageById(pageId){
        return Page.findById(pageId);
    }

    function updatePage(pageId, page){
        delete page._id;
        delete page._website;
        return Page
            .update({_id: pageId},{
                $set: page
            });
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};
