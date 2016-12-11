(function(){
    angular
        .module("WebAppMaker")
        .factory("MoveService", MoveService);

    function MoveService($http) {
        var api = {
            createMove: createMove,
            findMoveById: findMoveById,
            updateMove: updateMove,
            deleteMove: deleteMove
        };
        return api;

        function createMove(move) {
            return;
            var url = "/api/move/";
            return $http.post(url, move);
        }

        function findMoveById(mid) {
            var url = "/api/move/" + aid;
            return $http.get(url);
        }

        function updateMove(mid, move) {
            var url = "/api/move/" + aid;
            return $http.put(url, move);
        }

        function deleteMove(mid) {
            var url = "/api/move/" + mid;
            return $http.delete(url);
        }

    }

})();