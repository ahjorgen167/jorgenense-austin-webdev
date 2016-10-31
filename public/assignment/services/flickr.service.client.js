(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "d35b4bc2048ce341b9b7f859e0819076";
    var secret = "fc4e6234d4a27930";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();