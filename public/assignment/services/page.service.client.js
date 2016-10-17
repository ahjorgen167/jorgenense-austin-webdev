(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function updatePage(pageId, page) {
            for(var p in pages) {
                current_page = pages[p];
                if(current_page._id === pageId) {
                    Object.keys(page).forEach(function(key) {
                        pages[p][key] = page[key];
                    });
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages) {
                page = pages[p];
                if(page._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function findPageById(pageId) {
            for(var p in pages) {
                page = pages[p];
                if(page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id = Math.floor((Math.random() * 999) + 1).toString();
            pages.push(page);
            return page._id;
        }
    }
})();