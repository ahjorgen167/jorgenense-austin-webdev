(function(){
    angular
        .module("WebAppMaker")
        .controller("FriendSearchController", FriendSearchController)
        .controller("FriendFocusController", FriendFocusController);

    function FriendFocusController($routeParams, $location, PlayerService, GameService, ActionService) {
        var vm = this;
        vm.error = null;
        vm.userId = $routeParams["uid"];
        vm.friendId = $routeParams["fid"];
        vm.addFriend = addFriend;
        vm.challengeToGame = challengeToGame;
        vm.page = {};

        function init(){
            PlayerService
                .findPlayerById(vm.userId)
                .success(function(player){
                    vm.user = player;
                })
                .error(function(error){
                    vm.error = error;
                    console.log(error);
                });
            PlayerService
                .findPlayerById(vm.friendId)
                .success(function(player){
                    vm.friend = player;
                    vm.stats = PlayerService.generateStats(player);
                })
                .error(function(error){
                    vm.error = error;
                    console.log(error);
                });
        }
        init();

        function addFriend(){
            if(!vm.user || !vm.friend){
                vm.error = "There was an error adding this friend to your friend list.";
                return;
            }
            if(vm.friendId == vm.userId){
                return;
            }
            var i = 0;
            for(i = 0; i < vm.user.friends.length; i++){
                if(vm.user.friends[i]._id == vm.friendId){
                    return;
                }
            }
            vm.user.friends.push(vm.friendId);

            PlayerService
                .updatePlayer(vm.user)
                .success(function(){
                    PlayerService
                        .findPlayerById(vm.userId)
                        .success(function(player){
                            vm.user = player;
                        })
                        .error(function(error){
                            vm.error = error;
                            console.log(error);
                        });
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function challengeToGame(){
            var game = {};
            var action1 = {};
            var action2 = {};
            GameService
                .createGame(vm.userId, {player1: vm.userId, player2: vm.friendId})
                .success(function(createdGame){
                    console.log("first");
                    game = createdGame;
                    console.log(game);
                    vm.user.games.push(createdGame._id);
                    vm.friend.games.push(createdGame._id);
                    ActionService
                        .createAction({player: vm.userId, game: game._id})
                        .success(function(createAction1){
                            game.player1Action = createAction1._id;
                            action1 = createAction1;
                            ActionService
                                .createAction({player: vm.friendId, game: game._id})
                                .success(function(createAction2){
                                    game.player2Action = createAction2._id;
                                    action2 = createAction2;
                                    GameService
                                        .updateGame(game._id, game)
                                        .success(function(response){
                                            PlayerService
                                                .updatePlayer(vm.user)
                                                .success(function(response){

                                                    PlayerService
                                                        .updatePlayer(vm.friend)
                                                        .success(function(response){
                                                            console.log("friend update complete");
                                                            var url = "/player/" + vm.userId + "/game/" + createdGame._id
                                                            $location.url(url);
                                                        })
                                                        .error(function(error){
                                                            console.log(error);
                                                            return;
                                                        });
                                                })
                                                .error(function(error){
                                                    console.log(error);
                                                    return;
                                                });
                                        })
                                        .error(function(error){
                                            console.log(error);
                                            return;
                                        });
                                })
                                .error(function(error){
                                    console.log(error);
                                    return;
                                });
                        })
                        .error(function(error){
                            console.log(error);
                            return;
                        });
                })
                .error(function(error){
                    console.log(error);
                    return;
                });
        }
    }

    function FriendSearchController($routeParams, $location, PlayerService) {
        var vm = this;
        vm.update = update;
        vm.searchUsername = searchUsername;

        vm.userId = $routeParams["uid"];

        function init(){
            PlayerService
                .findPlayerById(vm.userId)
                .success(function(player){
                    vm.user = player;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function searchUsername(username){
            PlayerService
                .findPlayersByUsername(username)
                .success(function(players){
                    vm.players = players
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function update(page){
            if(!page.name || (page.name == "")){
                vm.error = "You must include a page name";
                return;
            }
        }
    }
})();