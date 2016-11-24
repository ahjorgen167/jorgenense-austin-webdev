(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;
        vm.login = login;
        vm.error = null;
        function login(username, password) {
            if(!username || !password){
                vm.error = "Both username and password must not be blank.";
                return;
            }

            UserService
                .login(username, password)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/" + user._id);
                    }, function(err){
                        vm.error = "This password and username combination could not be found.";
                        console.log(err);
                    });
        }
    }

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        vm.register = register;


        function register(username, password, password2) {
            if(!username){
                vm.error = "You must include a username";
                return;
            }

            if(password != password2 || !password || !password2){
                vm.error = "Your passwords don't match";
                return;
            }

            UserService
                .register(username, password)
                .then(
                    function(response) {
                        var user = response.data;
                        if(user) {
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        } else {
                            vm.error = "Problem loading your profile.\nPlease try again later.";
                        }

                    }, function(err){
                        vm.error = "You must input a unique username.";
                        console.log(err.data);
                    });
        }
    }

    function ProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;                        
                        $location.url("/");
                    });
        }

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user){
                    if(user != null) {
                        vm.user = user;
                    } else {
                        vm.error = "If this message appears, something went wrong!";
                    }
                })
                .error(function(error){
                    console.log(error);
                    vm.error = "User could not be located";
                });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.user)
                .success(function(response){
                    $location.url("/user/" + vm.user._id);
                })
                .error(function(error){
                   console.log(error); 
                });                
        }
        
        function unregisterUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }
})();