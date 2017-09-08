const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const app = express();

const DatabaseService = require('./save-counter');

const Models = require("./models");

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost:27017/greet-me";
const models = Models(mongoURL);

const databaseService = new DatabaseService(models);

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
  // const saveName = SaveName(models);
  var username = req.body.name;
  var language = req.body.language;

  databaseService.saveName(username, function(err) {

    models.Person.count({}, function(err, counter) {

      var message = getLanguage(language) + username;
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
  var username = req.params.name;
  databaseService.getCounter(username, function(err, counter) {
    res.render('client-counter', {
      username,
      counter
    });

  });
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

app.listen(port, function() {
  console.log("Server started at port" + " " + port);
});
