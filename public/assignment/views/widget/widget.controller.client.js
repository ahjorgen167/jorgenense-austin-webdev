(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.show = true;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.trustSource = trustSource;

        vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        var youTubeUrls = [
            {url: 'https://www.youtube.com/embed/lc8804tkoaM'},
            {url: 'https://www.youtube.com/embed/v_-MLIn3O-c'},
            {url: 'https://www.youtube.com/embed/sC9abcLLQpI'},
            {url: 'https://www.youtube.com/embed/AM2Ivdi9c4E'}
        ];

        vm.urls = youTubeUrls;

        function trustSource(url){
            return $sce.trustAsResourceUrl(url);
        }       
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.new = true;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];

        vm.create = create;
        vm.widget = {};
        function create(widget){
            var widgetId = WidgetService.createPage(vm.websiteId, page);
            if(pageId != null){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pid + "/widget");
            }
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.edit = true;

        var vm = this;
        vm.delete = deleteWidget;
        vm.update = update;

        vm.pageId = $routeParams["pid"];
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.widgetId = $routeParams["wgid"];


        var widget = WidgetService.findWidgetById(vm.widgetId);

        if(widget != null) {
            vm.widget = widget;
        }

        function update(widget){
            WidgetService.updateWidget(widget._id, widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }

        function deleteWidget(widget){
            WidgetService.deleteWidget(widget._id);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
        }
    }
})();