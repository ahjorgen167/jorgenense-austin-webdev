(function(){
    angular
        .module("WebAppMaker")
        .factory("GameService", GameService);

    function GameService($http) {
        var api = {
            createGame: createGame,
            findGamesByPlayerId: findGamesByPlayerId,
            findGameById: findGameById,
            updateGame: updateGame,
            deleteGame: deleteGame,
            updateGameState: updateGameState
        };
        return api;

        function createGame(pid, game) {
            game.player1 = pid;
            var url = "/api/player/" + pid + "/game/";
            return $http.post(url, game);
        }

        function findGamesByPlayerId(pid) {
            var url = "/api/player/" + pid + "/game";
            return $http.get(url);
        }

        function findGameById(pid) {
            var url = "/api/game/" + pid;
            return $http.get(url);
        }

        function updateGame(gid, game) {
            var url = "/api/game/" + gid;
            return $http.put(url, game);
        }

        function deleteGame(gameId) {
            var url = "/api/game/" + gameId;
            return $http.delete(url);
        }

        function getPlayer(playerId, game){
            return getPlayerHelper(playerId, game);
        }

        function updateGameState(game){
            if(!game || !game.player2Action || 
                game.status == "COMPLETE" || game.status == "CANCELLED" ||
                (game.player2Action.currentMove === null || game.player1Action.currentMove === null)){
                return game;
            } 
            
            game.updated = true;
            move = {
                player1Move: game.player1Action.currentMove.rank + getSuitSymbol(game.player1Action.currentMove.suit),
                player2Move: game.player2Action.currentMove.rank + getSuitSymbol(game.player2Action.currentMove.suit)
            }
            var player1Value = cardRank.indexOf(game.player1Action.currentMove.rank);
            var player2Value = cardRank.indexOf(game.player2Action.currentMove.rank);

            if(player1Value < player2Value){
                move.player1Won = true;
                while(game.hold.length > 0){
                    game.player1Action.deck.unshift(game.hold.pop());
                }
                game.player1Action.deck.unshift(game.player1Action.currentMove);
                game.player1Action.deck.unshift(game.player2Action.currentMove);
            } else if (player2Value < player1Value) {
                move.player1Won = true;
                while(game.hold.length > 0){
                    game.player2Action.deck.unshift(game.hold.pop());
                }
                game.player2Action.deck.unshift(game.player1Action.currentMove);
                game.player2Action.deck.unshift(game.player2Action.currentMove);
            } else {
                game.hold.push(game.player1Action.currentMove);
                game.hold.push(game.player2Action.currentMove);
            }
            game.moves.unshift(move);
            game.player1Action.currentMove = null;
            game.player2Action.currentMove = null;
            if(game.player2Action.deck.length == 0){
                game.status = "COMPLETE";
                game.winner = game.player1._id;
                game.winnername = game.player1.username;
            } else if (game.player1Action.deck.length == 0){
                game.status = "COMPLETE";
                game.winner = game.player2._id;
                game.winnername = game.player2.username;
            }
            return game;
        }
    }


    var cardRank = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'];

    function getSuitSymbol(suit){
        if(suit == 'DIAMONDS'){
            return "♦";
        } else if (suit == 'CLUBS') {
            return "♣";
        } else if (suit == 'HEARTS'){
            return "♥";
        } else {
            return "♠";
        }
    }

})();