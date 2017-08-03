const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const app = express();
const greeted = [];

//Set middleware for bodyParser and the second line write middleware documantation for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//register a Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// create a route for greet
app.get('/greetings/:name', function(req, res){
res.send("Hello, " + req.params.name);
  greeted.push(req.params.name);
});

//Set Static path
app.use(express.static('public'));


// create a route that sends data to the browser
app.get('/', function (req, resp) {
  resp.sendFile('index.html', {root:path.join(__dirname, 'files')});
})


// create a route for greeted names
app.get('/greeted', function(req, res){
  res.send(greeted);
});

// create a route for counter
app.get('/counter/:username', function(req, res){
  var namesMap = {};
  var timesGreeted = 0;
    for (var i = 0; i < greeted.length; i++) {
      var namesGreeted = greeted[i];
      if(namesMap[namesGreeted] !== undefined) {
        var increment = namesMap[namesGreeted] ? namesMap[namesGreeted] + 1:1;
        namesMap[namesGreeted] = increment;
        timesGreeted = namesMap[namesGreeted];
      }else {
        namesMap[namesGreeted] = 1;
      }
    }
    res.send("Hello, " + req.params.username + " has been greeted " + timesGreeted + " times.");
    // Hello, <USER_NAME> has been greeted <COUNTER> times
});

//start the server at port 3000
var index = app.listen(3000, function () {

});
