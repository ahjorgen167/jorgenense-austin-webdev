(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.create = create;
        vm.userId = $routeParams["uid"];
        vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);
        vm.website = {};

        function create(website){
            var websiteId = WebsiteService.createWebsite(vm.userId, website);
            if(websiteId != null){
                $location.url("/user/" + vm.userId + "/website");
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.delete = deleteWebsite;
        vm.update = update;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.websites = WebsiteService.findWebsitesByUserId(vm.userId);

        var website = WebsiteService.findWebsiteById(vm.websiteId);

        if(website != null) {
            vm.website = website;
        }

        function update(website){
            WebsiteService.updateWebsite(website._id, website);
            $location.url("/user/" + vm.userId + "/website");

        }

        function deleteWebsite(website){
            WebsiteService.deleteWebsite(website._id);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();