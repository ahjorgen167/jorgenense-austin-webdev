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
		    "url": "https://youtu.be/AM2Ivdi9c4E" },
		  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
		];

        var api = {
            createWidget: createWidget,
            findWidgetsByUser: findWidgetsByUser,
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

        function findWidgetsById(widgetId) {
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
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                current_widget = widgets[w];
                if(current_widget._id === widgetId){
                    widgets[w].text = widget.text;
                    widgets[w].widgetType = widget.widgetType;
                    widgets[w].pageId = widget.pageId;

                }
            }
        }

        function deleteWidget(widgetId) {
            for(var w in widget) {
                widget = widgets[w];
                if(widget._id === widgetId){
                    users.splice(w, 1);
                }
            }
        }
    }
})();