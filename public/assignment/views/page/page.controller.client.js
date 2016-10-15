(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($location, PageService) {
        var vm = this;
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;
    }

    function EditPageController($routeParams, PageService) {
        var vm = this;

        vm.pageId = $routeParams["pid"];

        var user = PageService.findPageById(vm.pageId);

        if(user != null) {
            vm.page = page;
        }
    }
})();