(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;


        function createUser(user) {
            user._id = Math.floor((Math.random() * 999) + 1).toString();
            users.push(user);
            return user._id;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                current_user = users[u];
                if(current_user._id === userId) {
                    Object.keys(user).forEach(function(key) {
                        users[u][key] = user[key];
                    });
                }
            }
        }

        function deleteUser(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

        function findUserByUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }



        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }
    }
})();