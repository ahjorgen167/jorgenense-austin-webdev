var express = require('express')
var app = express()

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))

//app.get('/', function(request, response) {
//  response.send('Hello World!')
//})
require ("./test/app.js")(app);



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})