//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();

//using body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 //using get by default location
 app.get('/', function(req, res){
 //console.log(req);
 res.send('hello world again from REST API!');
 });
 */

//callback function
app.get('/todo/:title', handleTodo);

app.get('/archive', function(req, res){
  res.send('Archive content should go here');
});


function handleTodo(req, res)
{
    console.log(req.params['title']);
    res.send('handle todo!');
}


app.use(express.static(__dirname+'/todo_example'));

var ipaddress = '127.0.0.1';
var port      = 3000;

app.listen(port, ipaddress);

//console.log(process.env);
//console.log(process.env.APPDATA);
//console.log(process.env.ANDROID_HOME);