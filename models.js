const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
  mongoose.connect(mongoUrl);

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
