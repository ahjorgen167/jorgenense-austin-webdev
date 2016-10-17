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
            findWebsitesByUserId: findWebsitesByUserId,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsitesByUserId(uid) {
            var result = [];
            for(var w in websites) {
                if(websites[w].developerId === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    return websites[w];
                }
            }
            return null;
        }

        function createWebsite(userId, website) {
            website._id = Math.floor((Math.random() * 999) + 1).toString();
            website.developerId = userId;
            websites.push(website);
            return website._id;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                current_website = websites[w];
                if(current_website._id === websiteId){
                    Object.keys(website).forEach(function(key) {
                        websites[w][key] = website[key];
                    });
                }
            }
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                website = websites[w];
                if(website._id === websiteId){
                    websites.splice(w, 1);
                }
            }
        }
    }
})();