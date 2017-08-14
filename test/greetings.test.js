const assert = require('assert');
var greeted = [];
var namesMap = {};
var counter = 0;

// the funcs to test
function getName(theName) {
  if (namesMap[theName] === undefined) {
    greeted.push(theName);
    namesMap[theName] = 1;
    return theName
  } else {
    return theName
  }
}

function manageCounter(theName) {
  if (namesMap[theName] === undefined) {
    greeted.push(theName);
    namesMap[theName] = 1;
    counter++
    return counter
  }
}

// check which radio button is checked and return the right greeting language
function getLanguage(language) {
  if (language === "English") {
    return "Hello "
  } else if (language === "IsiXhosa") {
    return "Molo "
  } else if (language === "Setswana") {
    return "Dumela "
  }
}

describe('function that returns the name to greet', function() {

  it('should return the name to greet', function(done) {
    assert.equal('Yanga', getName('Yanga'));
    done();
  });

  it('should return the language right greeting in the selected language', function(done) {
    assert.equal('Hello ', getLanguage('English'));
    done();
  });

  it('should increment the counter by one', function(done) {
    assert.equal(1, manageCounter('Oasin'));
    done();
  });

});
