module.exports = function(app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use('local.player', new LocalStrategy(localStrategy));
    
    var playerModel = models.playerModel;

    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/player', createPlayer);
    app.get('/api/player', findPlayer);
    app.get('/api/player/:uid', findPlayerById);
    app.put('/api/player/:uid', updatePlayer);
    app.delete('/api/player/:uid', deletePlayer);
    app.post('/api/gamelogin', login);
    app.post('/api/gameregister', register);

    function register(req, res) {
        var player = req.body;
        var username = req.body.username;
        playerModel
            .findPlayerByUsername(username)
            .then(
                function(player) {
                    if(player) {
                        res.status(400).send("Username already in use");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        playerModel
                            .createPlayer(req.body)
                            .then(
                                function(user) {
                                    res.send(user);
                                },
                                function(err) {
                                    res.status(400).send("Issue logging in.  Please try again later.");
                                }
                            );;
                    }
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function login(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        playerModel
            .findPlayerByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        res.send(user);
                    } else {
                        res.status(400).send("That username/password combination does not exist");
                    }
                },
                function(err) {
                    if (err) { 
                        res.status(400).send("Issue logging in.  Please try again later.");
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        console.log("local strat");
        playerModel
            .findPlayerByUsername(username)
            .then(
                function(user) {
                    console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        //delete user.password;
                        console.log("save user");
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createPlayer(req, res) {
        var player = req.body;
        player.password = bcrypt.hashSync(player.password);
        playerModel
            .createPlayer(player)
            .then(
                function(player) {
                    res.json(player);
                },
                function(error) {
                    console.log(error);
                    res.statusCode(400).send(error);
                }
            );
    }

    function updatePlayer(req, res) {
        var player = req.body;
        delete player.password;
        var uid = req.params.uid;
        playerModel
            .updatePlayer(uid, player)
            .then(
                function(response){
                    res.send(response);
            },
                function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
            });
    }

    function deletePlayer(req, res) {
        var uid = req.params.uid;
        playerModel
            .deletePlayer(uid)
            .then(
                function(response) {
                    res.send(response);
                },
                function(error) {
                    console.log(error);
                    res.statusCode(400).send(error);
                }
        );
    }

    function findPlayer(req, res) {
        console.log()
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findPlayerByCredentials(req, res);
        } else if(query.username) {
            findPlayerByUsername(req, res);
        } else {
            res.statusCode(400).send("Must submit username and or password.");;
        }
    }

    function findPlayerByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        playerModel
            .findPlayerByCredentials(username, password)
            .then(
                function(player){
                    res.json(player);
                },
                function(error){
                    console.log(error);
                    res.statusCode(400).send(error);
                });
    }

    function findPlayerByUsername(req, res) {
        var username = req.query.username;
        playerModel
            .findPlayersByUsername(username)
            .then(
                function(players){
                    res.json(players);
                },
            function(error){
                    console.log(error);
                    res.statusCode(400).send(error);
            });
    }

    function findPlayerById(req, res) {
        var playerId = req.params.uid;
        playerModel
            .findPlayerById(playerId)
            .then(
                function(player){
                    res.json(player);
                },
                function(error){
                    console.log(error);
                    res.statusCode(400).send(error);                    
            });
    }
};
