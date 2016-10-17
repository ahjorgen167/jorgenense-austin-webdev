(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
		  { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
		  { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
		  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
		    "url": "http://lorempixel.com/400/200/"},
		  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
		  { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
		  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
		    "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
		  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
		];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    result.push(widgets[w]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            widget._id = Math.floor((Math.random() * 999) + 1).toString();
            widget.pageId = pageId;
            widgets.push(widget);
            return widget._id;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                current_widget = widgets[w];
                if(current_widget._id === widgetId){
                    Object.keys(widget).forEach(function(key) {
                        widgets[w][key] = widget[key];
                    });
                }
            }
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                widget = widgets[w];
                if(widget._id === widgetId){
                    widgets.splice(w, 1);
                }
            }
        }
    }
})();