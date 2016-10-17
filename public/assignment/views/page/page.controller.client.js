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
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.error = null;
        vm.create = create;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.page = {};
        function create(page){
            if(page.length === 0){
                vm.error = "Please input the title or name of the page";
                return;
            }
            var pageId = PageService.createPage(vm.websiteId, page);
            if(pageId != null){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
            }
        }

    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.delete = deletePage;
        vm.update = update;

        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        var page = PageService.findPageById(vm.pageId);

        if(page != null) {
            vm.page = page;
        }


        function update(page){
            PageService.updatePage(page._id, page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }

        function deletePage(page){
            PageService.deletePage(page._id);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/");
        }
    }
})();