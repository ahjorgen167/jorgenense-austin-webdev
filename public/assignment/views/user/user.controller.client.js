(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.error = null;
        function login(username, password) {
            UserService
                .findUserByCredentials(username, password)
                .success(function(user){
                    if(user == null) {
                        vm.error = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(error){
                    console.log(error);
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;        
        vm.register = register;


        function register(username, password, passwordVerification) {
            if(password !== passwordVerification){
                vm.error = "Invalid registration - passwords must match";
                return;
            }

            UserService
                .createUser(username, password)
                .success(function(user){
                    if(user != null){
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "There is no user by that name";
                    }
                })
                .error(function (error) {
                    console.log(error);        
                });
            }
    }

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user){
                    if(user != null) {
                        vm.user = user;
                    } else {
                        vm.error = "There is no user by that name";
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