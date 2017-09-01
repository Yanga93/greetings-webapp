const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greet-me";
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
