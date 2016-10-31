(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, $http, WidgetService) {
        var vm = this;
        vm.show = true;
        vm.sort = sort;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        vm.pageId = $routeParams["pid"];
        vm.trustSource = trustSource;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
                })            
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function sort(initial,final){
            WidgetService
                .reorderWidgets(initial,final,vm.pageId)
                .success(function(widgets){
                    vm.widgets = widgets;
                })
                .error(function(error){
                    console.log(error);
                });
        }

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
            WidgetService
                .createWidget(vm.websiteId, widget)
                .success(function(){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pid + "/widget");
                })
                .error(function(error){
                    console.log(error);
                });
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

        function init(){
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function(widget){
                    vm.widget = widget;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function update(widget){
            WidgetService
                .updateWidget(widget._id, widget)
                .success(function(){
                    var url = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/";
                    $location.url(url);
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function deleteWidget(widget){
            WidgetService
                .deleteWidget(widget._id)
                .success(function(){
                    var url = "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/";
                    $location.url(url);    
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();