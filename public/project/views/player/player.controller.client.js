(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("AvatarSearchController", AvatarSearchController)
        .controller("SplashController", SplashController);

    function AvatarSearchController($routeParams, $location, PlayerService, $rootScope) {
        var vm = this;
        var playerId = $routeParams.uid;

        vm.selectAvatar = selectAvatar;
        vm.search = search

        function init() {
            PlayerService
                .findPlayerById(playerId)
                .success(function(player){
                    if(player != null) {
                        vm.user = player;
                    } else {
                        vm.error = "If this message appears, something went wrong!";
                    }
                })
                .error(function(error){
                    vm.error = "Player could not be located";
                });
        }
        init();

        function search(query){
            PlayerService
                .avatarSearch(query)
                .then(function(response){
                    vm.images = response.data.data;
                });
        }

        function selectAvatar(image) {
            var giphyUrl = "http://media0.giphy.com/media/IMAGE_ID/giphy-tumblr.gif"
            var avatartUrl = giphyUrl.replace("IMAGE_ID", image.id)
            vm.user.avatar = avatartUrl;
            PlayerService
                .updatePlayer(vm.user)
                .success(function(response){
                    $location.url("/player/" + vm.user._id);
                })
                .error(function(error){
                   console.log(error); 
                });                
        }
    }

    function SplashController($location, PlayerService, $rootScope, $scope, $log) {
        var vm = this;
        vm.user = $rootScope.user;
    }

    function LoginController($location, PlayerService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.error = null;

        function login(username, password) {
            if(!username || !password){
                vm.error = "Both username and password must not be blank.";
                return;
            }

            PlayerService
                .login(username, password)
                .then(
                    function(response) {
                        var player = response.data;
                        $rootScope.user = player;
                        $location.url("/player/" + player._id);
                    }, function(err){
                        vm.error = "This password and username combination could not be found.";
                        console.log(err);
                    });
        }
    }

    function RegisterController($location, PlayerService, $rootScope) {
        var vm = this;
        vm.register = register;

        function register(newUser) {
            if(!newUser.username){
                vm.error = "You must include a username";
                return;
            }

            if(newUser.password != newUser.password2 || !newUser.password || !newUser.password2){
                vm.error = "Your passwords don't match";
                return;
            }
            delete newUser.password2;
            PlayerService
                .register(newUser)
                .then(function(response) {
                        var player = response.data;
                        if(player) {
                            $rootScope.user = player;
                            $location.url("/player/"+player._id);
                        } else {
                            vm.error = "Problem loading your profile.\nPlease try again later.";
                        }

                    }, function(err){
                        vm.error = "You must input a unique username.";
                        console.log(err.data);
                    });
        }
    }

    function ProfileController($routeParams, $location, PlayerService, $rootScope) {
        var vm = this;
        var playerId = $routeParams.uid;

        vm.logout = logout;
        vm.updatePlayer = updatePlayer;
        vm.deletePlayer = deletePlayer;
        function logout() {
            $rootScope.user = null;                        
            $location.url("/");
        }

        function init() {
            PlayerService
                .findPlayerById(playerId)
                .success(function(player){
                    if(player != null) {
                        delete player.password;
                        vm.user = player;
                    } else {
                        vm.error = "If this message appears, something went wrong!";
                    }
                })
                .error(function(error){
                    console.log(error);
                    vm.error = "Player could not be located";
                });
        }
        init();

        function updatePlayer(user) {
            PlayerService
                .updatePlayer(user)
                .success(function(response){
                    $location.url("/player/" + vm.user._id);
                })
                .error(function(error){
                   console.log(error); 
                });                
        }
        
        function deletePlayer() {
            console.log("hello");
            PlayerService
                .deletePlayer(vm.user._id)
                .success(function(){
                    $location.url("/");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();