(function(){
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable)

    function jgaSortable() {
        var start = -1;
        var end = -1;
        function link(scope, element, attributes) {
            element.sortable({
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.callback({
                        start: start,
                        end: end
                    });
                }
            });
        }
        return {
            scope: {
                callback: '&'
            },
            link: link
        }
    }

})();


/*
(function(){
    angular
        .module("jgaDirectives", [])
        .directive("jgaDraggable", jgaDraggable)
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            element.sortable({
                sort: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.wamCallback({
                        start: start,
                        end: end
                    });
                }
            });
        }
        return {
            scope: {
                wamCallback: '&'
            },
            link: linker
        }
    }

    function jgaDraggable() {
        function linker(scope, element, attributes) {
            console.log(scope);
            console.log(element);
            console.log(attributes);
//            console.log(scope.model);
            console.log(attributes.box);
  //          console.log(scope['model.box1']);
            element
                .draggable();
        }
        return {
            link: linker,
            scope: {
                box: '@'
            }
        }
    }
})();
*/