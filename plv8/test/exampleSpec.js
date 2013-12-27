var assert = require('assert');
var example = require('../app/example');
var spec = require('plv8-mantle/microspec');


spec('hello', {
  'should enclose within Hello and !': function() {
    assert.equal(example.hello('World'), 'Hello World!');
  },

  'should titleize': function() {
    assert.equal(example.hello('mario'), 'Hello Mario!');
  }
});

spec('addPerson', {
  'should return id': function() {
    var id = example.addPerson({ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}});
    assert.ok(id > 0);
  }
});
