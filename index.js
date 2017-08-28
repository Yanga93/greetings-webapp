const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();

const SaveName = require('./save-name');

const Models = require("./models")
const models = Models("mongodb://localhost/greet-me");
const saveName = SaveName(models);


//Set middleware for bodyParser and the second line write middleware documantation for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//register a Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//create a route for text box to reeturn name greeeted
app.get('/', function(req, res) {
  res.render("index");
})


/**
@todo-Create  function that takes language as parameter and checkes which language is
selected and return right greeting message in that language.
**/

function getLanguage(language) {
  if (language === "English") {
    return "Hello "
  } else if (language === "IsiXhosa") {
    return "Molo "
  } else if (language === "Setswana") {
    return "Dumela "
  }
}


app.post("/greetings", function(req, res) {
  var name = req.body.name;
  var language = req.body.language;

  saveName(name, function(err) {

    models.Person.count({}, function (err, counter) {

        var message = getLanguage(language) + name;
        res.render("index", {
            counter: counter,
            message: message
        });

    });

  });

});


// create a route for greet
app.get('/greetings/:name', function(req, res) {
  res.send("Hello, " + req.params.name);
  greeted.push(req.params.name);
});

//Set Static path
app.use(express.static('public'));


// create a route for greeted clients
app.get('/greeted', function(req, res) {

  models.Person.find({}, function(err, people) {
    res.render("clients", {
      people: people
    });
  })

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
var port = process.env.PORT || 3001;

var index = app.listen(port, function() {
  console.log("Server started at port" + " " + port);
});
