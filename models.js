const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connection.on('error', function (err) {
    console.log(err);
  })
  mongoose.connect(mongoUrl, {useMongoClient: true});

  
  const Person = mongoose.model('person', {
    name: String,
    counter: Number

  });

  return {
      Person
  };

}
