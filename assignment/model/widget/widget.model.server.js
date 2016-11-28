module.exports = function() {

    var q = require("q");
    var mongoose = require("mongoose")
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var Page = require('mongoose').model('Page');

    var api = {
        createWidgetForPage: createWidgetForPage,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets: reorderWidgets
    };
    return api;

    function createWidgetForPage(pageId, widget) {
        widget._page = pageId;
        var deferred = q.defer();
        Widget.create(widget, function (err, widgetResponse) {
            if (err) {
                deferred.reject(err);
            } else {
                Page.findById(pageId, function (err, page) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        page.widgets.push(widgetResponse);
                        page.save(function (err, page) {
                            deferred.resolve(page.widgets);
                        });
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId){
        var deferred = q.defer();
        Page.findById(pageId, function (err, page) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(page.widgets);
            }
        });
        return deferred.promise;

    }

    function findWidgetById(widgetId){
        var deferred = q.defer();

        Widget.findById(widgetId, function(err, widget){
            if (err) {
                deferred.reject(err);
            }
            else{
                deferred.resolve(widget);
            }
        });
        return deferred.promise;

    }

    function updateWidget(widgetId, widget){
        var deferred = q.defer();
        Page.findById(widget._page, function (err, page) {
            if (err) {
                deferred.reject(err);
            } else {

                var widgets = page.widgets;
                for (var i = 0; i < widgets.length; i++) {
                    if (widgets[i]._id == widgetId) {

                        Widget.update({_id: widgetId}, {$set: widget}, 
                            function (err, widgetResponse) {
                                if (err) {
                                    deferred.reject(err);
                                }
                        });
                        page.widgets[i] = widget;                        
                        page.save(function (err, page) {
                            deferred.resolve(page.widgets);
                        });
                    }
                }
            }
        });
        return deferred.promise;

    }

    function deleteWidget(widgetId) {
//        return Widget.remove({_id: widgetId});

        var deferred = q.defer();
        Widget.remove({_id: widgetId}, function (err, widgetResponse) {
            if (err) {
                deferred.reject(err);
            }
        });
        Widget.findById(widgetId, function(err, widget){
            if (err){
                deferred.reject(err);
            } else {
                Page.findById(widget._page, function(err, page){
                    if(err){
                        deferred.reject(err);
                    } else {
                        for (var i = 0; i < page.widgets.length; i++) {
                            if (page.widgets[i]._id == widgetId) {
                                page.widgets.splice(i, 1);
                                page.save(function (err, page) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(page.widgets);
                                    }
                                });
                            }
                        
                        }
                    }
            });
            }
        });
        return deferred.promise;
        
    }

    function reorderWidgets(pageId, startIndex, endIndex){
//        return Widget.find({_page: pageId});
        var deferred = q.defer();
        Page.findById(pageId, function (err, page) {
            if (err) {
                deferred.reject(err);
            } else {
                var tempWidget = page.widgets.splice(startIndex, 1);
                page.widgets.splice(endIndex, 0, tempWidget[0]);
                page.save(function (err, page) {
                    deferred.resolve(page.widgets);
                });
            }
        });
        return deferred.promise;
    }

};
