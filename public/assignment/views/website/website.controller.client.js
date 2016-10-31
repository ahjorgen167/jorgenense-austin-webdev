(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams["uid"];
        
        function init() {
            WebsiteService
                .findWebsitesByUserId(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(error){
                    console.log(error);
                    vm.error = "There was an issue retrieving these webpages.";
                });
        }
        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.create = create;
        vm.userId = $routeParams["uid"];
        website = {};

        function init(){
            WebsiteService
                .findWebsitesByUserId(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function create(website){
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function(website){
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.delete = deleteWebsite;
        vm.update = update;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.website = {};
        function init(){
            WebsiteService
                .findWebsitesByUserId(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(error){
                    console.log(error);
                });
                
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function(website){
                    vm.website = website;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function update(website){
            WebsiteService
                .updateWebsite(website._id, website)
                .success(function(website){
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function deleteWebsite(website){
            WebsiteService
                .deleteWebsite(website._id)
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();