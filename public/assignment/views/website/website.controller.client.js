(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($location, WebsiteService) {
        var vm = this;
    }

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
    }

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];

        var website = WebsiteService.findUserById(vm.websiteId);

        if(website != null) {
            vm.website = website;
        }
    }
})();