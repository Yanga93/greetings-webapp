module.exports = function GreetManager(models) {
  var Person = models.Person;

  // function that returns the global counter

  
  //how many times a given person was greeted

  function personGreetCounter(name, cb){
    Person.findOne({
        name: name
      }, cb)
  }


  function manageGreetings(name, cb) {
    Person.findOne({
      name: name
    }, function(err, thePerson) {

      if (!thePerson) {

        Person.create({
          name: name,
          counter: 1
        }, cb)
      } else {
        //make sure the counter exists!!!!
        if (!thePerson.counter) {
          thePerson.counter = 0;
        }
        thePerson.counter++;
        thePerson.save(cb);
      }
    });
  }

  return {
    manageGreetings
  }
}
