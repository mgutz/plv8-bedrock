var example = require('../app/example');
var spec = require('../lib/spec');
var assert = spec.assert;

spec('hello', {
  'should enclose within Hello and !': function() {
    assert(example.hello('World') === 'Hello World!');
  },

  'should titleize': function() {
    assert(example.hello('mario') === 'Hello Mario!');
  }
});

spec('addPerson', {
  'should return id': function() {
    var id = example.addPerson({ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}});
    assert(id > 0);
  }
});

spec('better assert', {
  'should fail': function() {
    assert(3 > 5);
  }
});
