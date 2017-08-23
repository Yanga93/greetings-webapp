
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
var greeted = [];
var namesMap = {};
var counter = 0;
var models = require("./models")

//Set middleware for bodyParser and the second line write middleware documantation for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//register a Handlebars view engined
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//create a route for text box to reeturn name greeeted
app.get('/', function(req, res) {
  res.render("index2");
})

/**
This function takes in theName && theLanguage as param and return greet messgein that language,
otherwise return error checks if the name exist or not in the namesMap object, either way it returns name...**/

function getName(theName) {
  if (namesMap[theName] === undefined) {
    greeted.push(theName);
    namesMap[theName] = 1;
    return theName
  } else {
    return theName
  }
}

// if the name does not exist increment the counter...
function manageCounter(theName) {
  if (namesMap[theName] === undefined) {
    greeted.push(theName);
    namesMap[theName] = 1;
    counter++
  }
}

// check which radio button is checked and return the right greeting lanuage
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

  manageCounter(name);
  var message = getLanguage(language) + getName(name);

  res.render("index", {
    counter: counter,
    message: message
  })
});

function saveName(name, cb) {
  var person = new person({
    name: name
  });
  person.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('database is created');
    }
  });

  saveName(name, cb);

}

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
var port = process.env.PORT || 3000;

var index = app.listen(port, function() {
  console.log("Server started at port" + port);

});
