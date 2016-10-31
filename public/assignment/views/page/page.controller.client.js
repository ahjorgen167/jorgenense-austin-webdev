(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init(){
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                })
                .error(function(error){
                    console.log(error);
                })
        }
        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.error = null;
        vm.create = create;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.page = {};

        function create(page){
            PageService
                .createPage(vm.websiteId, page)
                .success(function(){
                    console.log("hello");
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.delete = deletePage;
        vm.update = update;

        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init(){
            PageService
                .findPageById(vm.pageId)
                .success(function(page){
                    vm.page = page;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();



        function update(page){
            PageService
                .updatePage(page._id, page)
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function deletePage(page){
            PageService
                .deletePage(page._id)
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();