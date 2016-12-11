module.exports = function(app, models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    passport.use(new LocalStrategy(localStrategy));
    
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var userModel = models.userModel;

    var bcrypt = require("bcrypt-nodejs");

    var URL = 'http://localhost:3000/auth/facebook/callback';
    if(process.env.FACEBOOK_CALLBACK_URL) {
        URL = process.env.FACEBOOK_CALLBACK_URL
    }

    var facebookConfig = {
        clientID     : '1788990024688611',
        clientSecret : 'e439c402a88df2d02db6bdb416007ece',
        callbackURL  : URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookLogin));

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);
    //app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook', passport.authenticate('facebook'));
/*
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/assignment/#/login' }),
        function(req, res){
            var url = '/assignment/#/user' + req.user._id.toString()
            res.redirect('/assignment/#/user/' + req.user._id.toString());
            //successRedirect: '/assignment/#/user',
        }
    );

    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    return done(null, user);
                                }
                            );
                    }
                }
            );
    }


    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var user = req.body;
        var username = req.body.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel.createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                })
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function localStrategy(username, password, done) {
        console.log("trying local strategy");
        console.log(password);
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;

        user.password = bcrypt.hashSync(user.password);
        //return userModel.createUser(user);
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
        user.password = bcrypt.hashSync(user.password);
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
                    res.send(response);
                },
                function(error) {
                    console.log(error);
                    res.statusCode(400).send(error);
                }
        );
    }

    function findUser(req, res) {
        console.log()
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
                    res.json(user);
                },
                function(error){
                    console.log(error);
                    res.statusCode(400).send(error);                    
            });
    }
};
