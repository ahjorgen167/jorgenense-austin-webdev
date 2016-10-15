(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
          { "_id": "123", "name": "Facebook",    "developerId": "456" },
          { "_id": "234", "name": "Tweeter",     "developerId": "456" },
          { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
          { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
          { "_id": "678", "name": "Checkers",    "developerId": "123" },
          { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsitesByUser(uid) {
            var result = [];
            for(var w in websites) {
                if(websites[w].uid === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function findWebsitesById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    return websites[w];
                }
            }
            return null;
        }

        function createWebsite(usedId, website) {
            website._id = Math.floor((Math.random() * 999) + 1).toString();
            website.developerId = userId;
            websites.push(website);
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                current_website = websites[w];
                if(current_website._id === websiteId){
                    websites[w].name = website.name;
                    websites[w].developerId = website.developerId;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var w in website) {
                website = websites[w];
                if(website._id === websiteId){
                    users.splice(w, 1);
                }
            }
        }
    }
})();