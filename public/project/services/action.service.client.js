(function(){
    angular
        .module("WebAppMaker")
        .factory("ActionService", ActionService);

    function ActionService($http) {
        var api = {
            createAction: createAction,
            findActionById: findActionById,
            updateAction: updateAction,
            deleteAction: deleteAction,
            revealCard: revealCard
        };
        return api;

        function createAction(action) {
            action.deck = generateRandomDeck(26);
            var url = "/api/action/";
            return $http.post(url, action);
        }

        function findActionById(aid) {
            var url = "/api/action/" + aid;
            return $http.get(url);
        }

        function updateAction(aid, action) {
            var url = "/api/action/" + aid;
            return $http.put(url, action);
        }

        function deleteAction(actionId) {
            var url = "/api/action/" + actionId;
            return $http.delete(url);
        }

        function revealCard(action){
            if(action.deck.length > 0){
                action.currentMove = action.deck.pop();
            }
            return action;
        }
    }

    var cardSuit = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
    var cardRank = ['A','K','Q','J','10','9','8','7','6','5','4','3','2']

    function generateRandomDeck(deckSize){
        var i;
        var response = [];
        for(i = 0; i < deckSize; i++){
            var suitIndex = Math.floor(Math.random() * cardSuit.length);
            var rankIndex = Math.floor(Math.random() * cardRank.length);
            var card = {
                suit: cardSuit[suitIndex],
                rank: cardRank[rankIndex]
            }
            response.push(card)
        }
        return response;
    }

    function getPlayerHelper(playerId, action){
        var playerPosition;
        if(action.player1._id == playerId){
            playerPosition = 'player1';
        } else if(action.player2._id == playerId) {
            playerPosition = 'player2';
        } else {
            return 'observer';
        }
    }
})();