(function(){
    angular
        .module("WebAppMaker")
        .controller("FriendSearchController", FriendSearchController)
        .controller("FriendFocusController", FriendFocusController);

    function FriendFocusController($routeParams, $location, PlayerService, GameService, ActionService, MessageService) {
        var vm = this;
        vm.error = null;
        vm.userId = $routeParams["uid"];
        vm.friendId = $routeParams["fid"];
        vm.addFriend = addFriend;
        vm.challengeToGame = challengeToGame;
        vm.removeFriend = removeFriend;
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

        function removeFriend(friendId){
            for(var i =0; i < vm.user.friends.length; i++){
                var friend = vm.user.friends[i];
                if(friend._id == friendId){
                    vm.user.friends.splice(i, 1);
                }
            }
            PlayerService
                .updatePlayer(vm.user)
                .success(function(response){
                    var url = "/player/" + vm.user._id + "/friends/" + friendId;
                    $location.url()
                })
                .error(function(error){
                    console.log(error);
                });
        }

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

        vm.showFriends = false;
        vm.showGames = false;
        vm.showMessages = false;
        vm.hideAll = hideAll
        vm.hideAllFriends = hideAllFriends;
        vm.hideAllGames = hideAllGames;
        vm.hideAllMessages = hideAllMessages;
        vm.showAllFriends = showAllFriends;
        vm.showAllGames = showAllGames;
        vm.showAllMessages = showAllMessages;
        function hideAll(){
            vm.hideAllFriends();
            vm.hideAllGames();
            vm.hideAllMessages();
        }

        function hideAllFriends(){
            vm.friends = [];
            vm.showAllFriends = false;
        }

        function hideAllGames(){
            vm.games = [];
            vm.showGames = false;
        }

        function hideAllMessages(){
            vm.messages = [];
            vm.showMessages = false;
        }

        function hideAll(){
            vm.hideAllMessages();
            vm.hideAllFriends();
            vm.hideAllGames();
        }

        function showAllFriends(){
            if(!vm.showFriends){
                vm.hideAll();
                vm.friends = vm.friend.friends;
                vm.showFriends = true;
            } else {
                vm.hideAllFriends();
            }
        }

        function showAllGames(){
            if(!vm.showGames){
                vm.hideAll();
                vm.games = vm.friend.games;
                vm.showGames = true;
            } else {
                vm.hideAllGames();
            }
        }

        function showAllMessages(){
            if(!vm.showMessages){
                vm.hideAll();
                MessageService
                    .getMessagesForUser(vm.friendId)
                    .success(function(messages){
                        vm.messages = messages;
                    })
                    error(function(response){
                        console.log(response);
                    })
                vm.showMessages = true;
            } else {
                vm.hideAllMessages();
            }
        }
        vm.deleteThisUser = deleteThisUser;
        function deleteThisUser(){
            PlayerService
                .deletePlayer(vm.friendId)
                .success(function(response){
                    $location.url("/player/" + vm.user._id + "/friends/")
                })
                .error(function(response){
                    console.log(error);
                });
        }

        vm.deleteMessage = deleteMessage;
        function deleteMessage(messageId){
            for(var i = 0; i < vm.messages.length; i++){
                var message = vm.messages[i];
                if(message._id == messageId){
                    vm.messages.splice(i,1);
                }
            }
            MessageService
                .deleteMessage(messageId)
                .success(function(response){
                    $location.url("/player/" + vm.user._id + "/friends/" + vm.friendId)
                })
                .error(function(error){
                    console.log(error);
                });
        }

        vm.deleteFriendRelation = deleteFriendRelation;
        function deleteFriendRelation(relationId){
            for(var i = 0; i < vm.friend.friends.length; i++){
                var friend = vm.friend.friends[i];
                if(friend._id == relationId){
                    vm.friend.friends.splice(i, 1);
                }
            }
            PlayerService
                .updatePlayer(vm.friend)
                .success(function(response){
                    $location.url("/player/" + vm.user._id + "/friends/" + vm.friendId)
                })
                .error(function(error){
                    console.log(error);
                });
        }

        vm.deleteGame = deleteGame;
        function deleteGame(gameId){
            for(var i = 0; i < vm.games.length; i++){
                var game = vm.games[i];
                if(game._id == gameId){
                    vm.games.splice(i,1);
                }
            }
            GameService
                .deleteGame(gameId)
                .success(function(response){
                    $location.url("/player/" + vm.user._id + "/friends/" + vm.friendId)
                })
                .error(function(error){
                    console.log(error);
                });

        }
    }

    function FriendSearchController($routeParams, $location, PlayerService) {
        var vm = this;
        vm.update = update;
        vm.searchUsername = searchUsername;
        vm.removeFriend = removeFriend;

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

        function removeFriend(friendId){
            for(var i =0; i < vm.user.friends.length; i++){
                var friend = vm.user.friends[i];
                if(friend._id == friendId){
                    vm.user.friends.splice(i, 1);
                }
            }
            PlayerService
                .updatePlayer(vm.user)
                .success(function(response){
                    var url = "/player/" + vm.user._id + "/friends/";
                    $location.url(url)
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function searchUsername(username){
            PlayerService
                .findPlayersByUsername(username)
                .success(function(players){
                    for(var i=0; i < players.length; i++){
                        var player =players[i];
                        for(var j=0; j < vm.user.friends.length; j++){
                            var friend = vm.user.friends[j];
                            if(friend._id == player._id){
                                player.isFriend = true;
                                break;
                            }
                        }
                    }

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