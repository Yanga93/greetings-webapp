const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const greeted = [];

//Set middleware for bodyParser and the second line write middleware documantation for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//register a Handlebars view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//create a route for text box to reeturn name greeeted
app.get('/greetings', function(req, res) {
  res.render("index");
})


function getMessage(theName, theLanguage) {
  if (theLanguage === "English") {
    return "Hello, " + theName + "!"
  }else if (theLanguage === "IsiXhosa") {
    return "Molo, " + theName + "!"
  }else if (theLanguage === "Setswana") {
    return "Dumela, " + theName + "!"
  }else {
    return "Language not selected."
  }
}

app.post("/greetings", function(req, res) {
      var name = req.body.name;
      var language = req.body.language;

      var message = getMessage(name, language);

      res.render("index", {
        message: message
      })
});

      // create a route for greet
      app.get('/greetings/:name', function(req, res) {
        res.send("Hello, " + req.params.name);
        greeted.push(req.params.name);
      });

      //Set Static path
      app.use(express.static('public'));


      // create a route for greeted names
      app.get('/greeted', function(req, res) {
        res.send(greeted);
      });

      // create a route for counter
      app.get('/counter/:username', function(req, res) {
        var namesMap = {};
        var timesGreeted = 0;
        for (var i = 0; i < greeted.length; i++) {
          var namesGreeted = greeted[i];
          if (namesMap[namesGreeted] !== undefined) {
            var increment = namesMap[namesGreeted] ? namesMap[namesGreeted] + 1 : 1;
            namesMap[namesGreeted] = increment;
            timesGreeted = namesMap[namesGreeted];
          } else {
            namesMap[namesGreeted] = 1;
          }
        }
        // Hello, <USER_NAME> has been greeted <COUNTER> times
        res.send("Hello, " + req.params.username + " has been greeted " + timesGreeted + " times.");
      });

      //start the server at port 3000
      var index = app.listen(3000, function() {
        console.log("Server starting at port: 3000");

      });
