(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout,
            login: login,
            register: register
        };
        return api;

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function deleteUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            var response = $http.put(url, user);
            return response;
        }

        function findUserByUsername(username){
            var url = '/api/user?username='+username;
            return $http.get(url);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }
    }

})();