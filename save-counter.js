module.exports = function(models) {

  function getCounter(username, cb) {
    models.Person.findOne({

      name: username
    }, function(err, person) {

      if (err){
        return cb(err);
      }
      cb(null, person.counter)
    })

  }

  function saveName(username, cb) {

    models.Person.findOne({
      name: username
    }, function(err, thePerson) {
      
      if (!thePerson) {

        models.Person.create({
          name: username,
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
    getCounter,
    saveName
  }
}
