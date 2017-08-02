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

//start the server
var index = app.listen(3000, function () {

});
