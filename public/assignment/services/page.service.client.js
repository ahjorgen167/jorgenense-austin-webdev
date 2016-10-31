(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(wid, page) {
            var url = "/api/website/" + wid + "/page/";
            return $http.post(url, page);
        }

        function findPageByWebsiteId(wid) {
            var url = "/api/website/" + wid + "/page/";
            return $http.get(url);
        }

        function findPageById(pid) {
            var url = "/api/page/" + pid;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();