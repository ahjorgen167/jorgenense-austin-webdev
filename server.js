var express = require('express')
var passport = require('passport');

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var app = express()

app.use(cookieParser());
//app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(session({ secret: "process.env.SESSION_SECRET" }));

app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))

//require ("./test/app.js")(app);
require ("./assignment/app.js")(app);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port') + "\nStarting At:\n" + new Date().toString());
})