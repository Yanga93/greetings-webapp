var express = require('express');
var app = express();
var greeted = [];

// create a route for greet
app.get('/greetings/:name', function(req, res){

  res.send("Hello, " + req.params.name);
  greeted.push(req.params.name);
});

// create a route for greeted names
app.get('/greeted', function(req, res){
  res.send(greeted);
});

// create a route for counter
app.get('/counter/:username', function(req, res){
  var namesMap = {};
    for (var i = 0; i < greeted.length; i++) {
      var namesGreeted = greeted[i];
      namesMap[namesGreeted] = namesMap[namesGreeted] ? namesMap[namesGreeted] + 1:1;
    }
    res.send("Hello, " + req.params.username + " has been greeted " + namesMap[namesGreeted] + " times.");
    // Hello, <USER_NAME> has been greeted <COUNTER> times
});

//start the server
var index = app.listen(3000, function () {

 // var host = index.address().address;
 // var port = index.address().port;

 // console.log('Example app listening at http://%s:%s', host, port);

});
