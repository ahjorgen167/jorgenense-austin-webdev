(function(){
    angular
        .module("WebAppMaker")
        .controller("MessageController", MessageController);

    function MessageController($routeParams, $location, $scope, PlayerService, MessageService) {
        var vm = this;
        vm.sendMessage = sendMessage;

        vm.playerId = $routeParams["pid"];
        vm.friendId = $routeParams["fid"];


        function checkMessages(){            
            MessageService
                .getMessagesFor2Users(vm.playerId, vm.friendId)
                .success(function(messages){
                    vm.messages = messages;
                })
                .error(function(error){
                    console.log(error);
                })
        }

        function init(){
            PlayerService
                .findPlayerById(vm.playerId)
                .success(function(player){
                    vm.user = player;
                })
                .error(function(error){
                    console.log(error);
                });
            PlayerService
                .findPlayerById(vm.friendId)
                .success(function(player){
                    vm.friend = player;
                })
                .error(function(error){
                    console.log(error);
                });
            checkMessages();
        }

        init();

        var messageCheck = setInterval(checkMessages, 5000);
        $scope.$on("$destroy", function(){
            clearInterval(messageCheck);
        });

        function sendMessage(message){
            if(!message || (message.length == 0)){
                return;
            }
            vm.currentMessage = '';
            newMessage = {
                'message': message,
                'to': vm.friendId,
                'from': vm.playerId
            }
            MessageService
                .createMessage(newMessage)
                .success(function(createdMessage){
                    console.log(createdMessage);
                    vm.messages.unshift(createdMessage);
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();