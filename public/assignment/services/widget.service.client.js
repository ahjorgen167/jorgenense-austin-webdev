(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidgets: reorderWidgets
        };
        return api;

        function reorderWidgets(initial, final, pageId){
            var url = "/api/page/" + pageId + "/widget?initial=" + initial + "&final=" + final;
            return response = $http.put(url);
        }


        function createWidget(pid, widget) {
            var url = "/api/page/" + pid + "/widget/";
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pid) {
            var url = "/api/page/" + pid + "/widget/";
            return $http.get(url);
        }

        function findWidgetById(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.get(url);
        }

        function updateWidget(wgid, widget) {
            var url = "/api/widget/" + wgid;
            return $http.put(url, widget);
        }

        function deleteWidget(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.delete(url);
        }
    }
})();