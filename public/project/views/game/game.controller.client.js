(function(){
    angular
        .module("WebAppMaker")
        .controller("GamePlayController", GamePlayController)
        .controller("GameSearchController", GameSearchController);

    function GamePlayController($routeParams, $location, $scope, GameService, PlayerService, ActionService) {
        var vm = this;
        vm.playerId = $routeParams["pid"];
        vm.gameId = $routeParams["gid"];
        vm.revealCard = revealCard;
        vm.error = null;
        vm.watchMode = false;
        vm.deleteGame = deleteGame;

        var gameInterval = setInterval(initGameState, 5000);

        function initGameState(){
            if(vm.game && (vm.game.status == "COMPLETE" || vm.game.status == "CANCELLED")){
                return;
            }
            GameService
                .findGameById(vm.gameId)
                .success(function(game){
                    vm.game = GameService.updateGameState(game);
                    if(vm.game.status == "COMPLETE"){
                        var winner = '';
                        if(vm.game.winnername){
                            winner = vm.game.winnername;
                        } else {
                            winner = vm.game.winner.username;
                        }
                        vm.success = "CONGRATS! " + winner + " wins the game!";
                    }
                    if(vm.game.updated){
                        vm.game = game;
                        GameService
                            .updateGame(game._id, game)
                            .error(function(error){
                                console.log(error);
                            });
                    }
                })
                .error(function(error){
                    console.log(error);
                });

        }

        function init(){
            PlayerService
                .findPlayerById(vm.playerId)
                .success(function(user){
                    vm.user = user;
                })
                .error(function(error){
                    console.log(error);
                });
            initGameState();
        }
        init();

        function revealCard(actionSet){
            if(vm.playerId != actionSet.player){
                return;
            }
            if(actionSet.currentMove){
                return;
            }            
            actionSet = ActionService.revealCard(actionSet);
            ActionService
                .updateAction(actionSet._id, actionSet)
                .error(function(error){
                    console.log(error);
                });
        }

        $scope.$on("$destroy", function(){
            clearInterval(gameInterval);
        });


        function deleteGame(gameId){
            GameService
                .deleteGame(gameId)
                .success(function(response){
                    var url = "/player/" + vm.playerId + "/game/";
                    $location.url(url);
                })
                .error(function(error){
                    console.log(error);
                    return;
                });
        }


    }

    function GameSearchController($location, $routeParams, GameService, PlayerService, ActionService) {
        var vm = this;
        vm.error = null;
        vm.createGame = createGame;
        vm.searchGamesByUsername = searchGamesByUsername;
        vm.joinGame = joinGame;
        vm.deleteGame = deleteGame;


        vm.playerId = $routeParams["pid"];
        function init(){
            PlayerService
                .findPlayerById(vm.playerId)
                .success(function(player){
                    vm.user = player;
                })
                .error(function(error){
                    console.log(error);
                });
        }
        init();

        function createGame(){
            var game;
            var action;
            GameService
                .createGame(vm.playerId, {player1: vm.playerId})
                .success(function(createdGame){
                    game = createdGame;
                    vm.user.games.push(createdGame._id);
                    ActionService
                        .createAction({player: vm.playerId, game: game._id})
                        .success(function(createAction){
                            action = createAction;
                            game.player1Action = createAction._id;
                            GameService
                                .updateGame(game._id, game)
                                .success(function(response){
                                    PlayerService
                                        .updatePlayer(vm.user)
                                        .success(function(response){
                                            var url = "/player/" + vm.playerId + "/game/" + game._id;
                                            $location.url(url);
                                        })
                                        .error(function(error){
                                            console.log(error);
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

        function deleteGame(gameId){
            GameService
                .deleteGame(gameId)
                .success(function(response){
                    var url = "/player/" + vm.playerId + "/game/";
                    $location.url(url);
                })
                .error(function(error){
                    console.log(error);
                    return;
                });
        }


        function searchGamesByUsername(username){
            PlayerService
                .findPlayersByUsername(username)
                .success(function(players){
                    vm.players = players;
                })
                .error(function(error){
                    console.log(error);
                });
        }

        function joinGame(game){
            var action = {
                player: vm.playerId,
                game: game._id 
            }
            ActionService
                .createAction(action)
                .success(function(action){
                    game.status = "STARTED";
                    game.player2 = vm.playerId;
                    game.player2Action = action._id;
                    GameService
                        .updateGame(game._id, game)
                        .success(function(response){
                            vm.user.games.push(game._id);
                            PlayerService
                                .updatePlayer(vm.user)
                                .success(function(response){
                                    $location.url("/player/" + vm.playerId + "/game/" + game._id);
                                })
                                .error(function(error){
                                    console.log(error);
                                });
                        })
                        .error(function(error){
                            console.log(error);
                        });
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();