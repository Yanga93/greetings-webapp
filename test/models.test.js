const assert = require('assert');
const Models = require('../models');
const GreetManager = require('../manage-greetings');

describe('models should be able to', function() {

  var models = Models("mongodb://localhost/client");


  beforeEach(function(done) {
    // runs before each test in this block
    //console.log("*****************************************");

    models.Person.remove({name : "Yanga"},
      function(err){
        if (err){
          return done(err)
        }
        models.Person.remove({name : "Andre"}, function(){
          if (err){
            return done(err)
          }
          models.Person.create({
            name : "Yanga",
            counter : 7
          }, function(err){
            done(err);
          })
        });
      });


  });


  it('store greetedNames to MongoDB', function(done) {

    var person = {
      name: 'Yanga',
      counter: 7
    }
    models.Person
      .create(person, function(err, user) {
        assert.equal(person.name, user.name);
        assert.equal(person.counter, user.counter);
        //console.log(user);
        done(err);
      })

  });

  it("should update the counter for the user that was previously greeeted", function(done) {
    var greetingManager = GreetManager(models);
    greetingManager.manageGreetings("Yanga", function(err, user) {
      if (err){
        return done(err)
      }

      //console.log(user);
      //console.log(err);

      assert.equal("Yanga", user.name);
      assert.equal(8, user.counter);
      done();
    });

  });

  it("should update a new entry for a user that was not previously greeeted", function(done) {

    var greetingManager = GreetManager(models);
    greetingManager.manageGreetings("Andre", function(err, user) {

      assert.equal("Andre", user.name);
      assert.equal(1, user.counter);
      done();
    });

  });

});
