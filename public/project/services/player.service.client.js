(function(){
    angular
        .module("WebAppMaker")
        .factory("PlayerService", PlayerService);

    var giphyKey = 'dc6zaTOxFJmzC';
    var urlBase = 'http://api.giphy.com/v1/gifs/search?q=TEXT&api_key=KEY&limit=25&rating=pg-13';

    function PlayerService($http) {
        var api = {
            findPlayerByCredentials: findPlayerByCredentials,
            findPlayerById: findPlayerById,
            findPlayersByUsername: findPlayersByUsername,
            createPlayer: createPlayer,
            updatePlayer: updatePlayer,
            deletePlayer: deletePlayer,
            logout: logout,
            login: login,
            register: register,
            avatarSearch: avatarSearch,
            generateStats: generateStats
        };
        return api;

        function register(player) {
            return $http.post("/api/gameregister", player);
        }

        function logout(player) {
            return $http.post("/api/gamelogout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/gamelogin", user);
        }

        function deletePlayer(uid) {
            var url = "/api/player/" + uid;
            return $http.delete(url);
        }

        function updatePlayer(player) {
            var url = "/api/player/" + player._id;
            return $http.put(url, player);
        }

        function findPlayersByUsername(username){
            var url = '/api/player?username='+username;
            return $http.get(url);
        }

        function createPlayer(player) {
//            var player = {
//                username: username,
//                password: password
//            };
            console.log(player);
            return $http.post("/api/player", player);
        }

        function findPlayerById(playerId) {
            var url = "/api/player/"+playerId;
            return $http.get(url);
        }

        function findPlayerByCredentials(username, password) {
            var url = '/api/player?username='+username+'&password='+password;
            return $http.get(url);
        }

        function avatarSearch(searchTerm){
            searchTerm = searchTerm.replace(" ", "+");
            var url = urlBase.replace("KEY", giphyKey).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function generateStats(player){
            var gamesWon = 0;
            var gamesLost = 0;
            
            for(var i = 0; i < player.games.length; i++){
                var game = player.games[i];
                if(game.status == 'COMPLETE'){
                    if(game.winner == player._id){
                        gamesWon++;
                    } else {
                        gamesLost++
                    }
                }
            }
            return {
                'totalGames': player.games.length,
                'gamesWon': gamesWon,
                'gamesLost': gamesLost,
                'friends': player.friends.length,
                'memberSince': player.dateCreated
            }

        }
    }
})();