module.exports = function(app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    console.log(error);
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        userModel
            .updateUser(uid, user)
            .then(
                function(response){
                    res.send(response);
            },
                function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        userModel
            .deleteUser(uid)
            .then(
                function(response) {
                    console.log(response);
                    res.send(response);
                },
                function(error) {
                    console.log(error);
                    res.statusCode(400).send(error);
                }
        );
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    res.json(user);
                },
                function(error){
                    console.log(error);
                    res.statusCode(400).send(error);
                });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.json(user);
                },
            function(error){
                    console.log(error);
                    res.statusCode(400).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(error){
                    console.log(error);
                    res.statusCode(400).send(error);                    
            });
    }
};
