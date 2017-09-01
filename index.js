const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();

const SaveName = require('./save-name');
const counterNames = require('./times-greeted');

const Models = require("./models")
const models = Models("mongodb://localhost/greet-me");

const saveName = SaveName(models);
// const timesGreeted = timesGreeted(models);

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

//Set Static path
app.use(express.static('public'));

//create a route for the home page
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

    models.Person.count({}, function(err, counter) {

      var message = getLanguage(language) + name;
      res.render("index", {
        counter: counter,
        message: message
      });

    });

  });

});



// create a route for greeted clients
app.get('/greeted', function(req, res) {

  models.Person.find({}, function(err, showNames) {
    res.render("clients", {
      people: showNames
    });
  })

});

//create a route to display how many times a client has been greeted
app.get('/counter/:name', function(req, res) {
  // Hello, <USER_NAME> has been greeted <COUNTER> time(s).
  var message = "Hello, " + req.param.name + " has been greeted " + count.count + " time(s).";
  models.Person.findOne({}, function(err, message) {
    people: message
  })
});

//create a route function that will remove all the data from the database- models
app.get('/reset', function(req, res) {
  models.Person.remove({}, function(err, cb) {
    if (err) {
      throw (err);
    } else {
      return res.render("clients.handlebars");
    }
  })
});

//start the server at port 3000
var port = process.env.PORT || 3001;

var index = app.listen(port, function() {
  console.log("Server started at port" + " " + port);
});
