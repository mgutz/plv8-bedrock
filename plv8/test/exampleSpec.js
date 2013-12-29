var example = require('../app/example');
var spec = require('./microspec');
var assert = require('assert');

spec('hello', {
  'should enclose within Hello and !': function() {
    assert.ok(example.hello('World') === 'Hello World!');
  },

  'should titleize': function() {
    assert.ok(example.hello('mario') === 'Hello Mario!');
  }
});

spec('addPerson', {
  'should return id': function() {
    var id = example.addPerson({ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}});
    assert.ok(id > 0);
  }
});

spec('better assert', {
  'should fail': function() {
    assert.ok(3 > 5);
  }
});
