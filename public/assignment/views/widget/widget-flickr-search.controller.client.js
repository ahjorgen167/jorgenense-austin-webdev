(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetFlickrImageSearchController", WidgetFlickrImageSearchController)

    function WidgetFlickrImageSearchController($routeParams, $location, $sce, $http, FlickrService, WidgetService) {
        var vm = this;
        vm.edit = true;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function searchPhotos(searchTerm){
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
            });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .updateWidget(vm.widgetId, {url: url})
                .success(function(success){
                    var url = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/";
                    $location.url(url);
                })
                .error(function(error){
                    console.log(error);
                });
                //.then(...);
        }

    }
})();