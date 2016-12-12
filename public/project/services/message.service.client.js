(function(){
    angular
        .module("WebAppMaker")
        .factory("MessageService", MessageService);

    function MessageService($http) {
        var api = {
            createMessage: createMessage,
            findMessageById: findMessageById,
            updateMessage: updateMessage,
            deleteMessage: deleteMessage,
            getMessagesFor2Users: getMessagesFor2Users,
            getMessagesForUser: getMessagesForUser
        };
        return api;

        function getMessagesFor2Users(player1Id, player2Id){
            var url = "/api/message/" + player1Id + "/player/" + player2Id;
            return $http.get(url);
        }

        function getMessagesForUser(playerId){
            var url = "/api/message/" + playerId + "/player/null";
            return $http.get(url);
        }

        function createMessage(message) {
            var url = "/api/message/";
            return $http.post(url, message);
        }

        function findMessageById(mid) {
            var url = "/api/message/" + aid;
            return $http.get(url);
        }

        function updateMessage(mid, message) {
            var url = "/api/message/" + aid;
            return $http.put(url, message);
        }

        function deleteMessage(mid) {
            var url = "/api/message/" + mid;
            return $http.delete(url);
        }

    }

})();