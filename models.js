const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connection.on('error', function (err) {
    console.log(err);
  })
  mongoose.connect(mongoUrl, {useMongoClient: true});

  // name: String,
  const Person = mongoose.model('person', {
    name: String,
    counter: Number

  });

  return {
      Person
  };
  // module.exports = Person;
}
