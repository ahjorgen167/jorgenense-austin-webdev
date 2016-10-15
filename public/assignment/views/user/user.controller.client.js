(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($routeParams, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, passwordVerification) {
            if(password != passwordVerification){
                vm.error = "Invalid registration - passwords must match";
                return;
            }
            var user;
            user.username = username;
            user.password = password;
            var userId = UserService.createUser(user);
            if(userId === null){
                vm.error = "There was an error creating this user.  Please try again.";   
            } else{
                $location.url("/user/" + userId);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.userId = $routeParams["uid"];

        var user = UserService.findUserById(vm.userId);

        if(user != null) {
            vm.user = user;
        }
    }
})();