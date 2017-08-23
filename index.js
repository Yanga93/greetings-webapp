
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

/**
* @todo - remove these as you are using mongodb
*/
const greeted = [];
const namesMap = {};

/**
  @todo - you should start using the database for your counter - the counter variable should be removed
*/
const counter = 0;

const Models = require("./models")
const models = Models("mongodb://localhost/greet-me");

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
  res.render("index");
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

  saveName(name, function(err){

    manageCounter(name);
    var message = getLanguage(language) + getName(name);

    res.render("index", {
      counter: counter,
      message: message
    });

  });

});



/**
  @todo - how not to add duplicate names and to increment the counter for an already existing username
  * check if there is a person for that name - using a findOne query
  * if there is not a person already add the new user using .save
  * otherwise use the person object returned - increment it's counter and then save using .save()
*/
function saveName(name, cb) {
  var person = new models.Person({
    name: name,
    counter : 1
  });
  person.save(cb);

  //saveName(name, cb);

}

// create a route for greet
app.get('/greetings/:name', function(req, res) {
  res.send("Hello, " + req.params.name);
  greeted.push(req.params.name);
});

//Set Static path
app.use(express.static('public'));


// create a route for greeted clients
app.get('/greeted', function(req, res) {

  models.Person.find({}, function(err, people){
    res.render("clients", {people : people});
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
var port = process.env.PORT || 3000;

var index = app.listen(port, function() {
  console.log("Server started at port" + " " + port);

});
