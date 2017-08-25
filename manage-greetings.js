module.exports = function GreetManager(models) {
  var Person = models.Person;

  /**
    @todo - how not to add duplicate names and to increment the counter for an already existing username
    * check if there is a person for that name - using a findOne query
    * if there is not a person already add the new user using .save
    * otherwise use the person object returned - increment it's counter and then save using .save()
  */

  function manageGreetings(name, cb) {
    models.Person.findOne({
      name: name
    }, function(err, thePerson) {
      console.log(thePerson);
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
