var assert = require('assert');
var example = require('../app/example');

exports.hello = function(o) {
  o.it('should enclose within Hello and !', function() {
    assert.equal(example.hello('World'), 'Hello World!');
  });

  o.it('should titleize', function() {
    assert.equal(example.hello('mario'), 'Hello Mario!');
  });
};

exports.addPerson = function(o) {
  o.it('should return id', function() {
    var id = example.addPerson({ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}});
    assert.ok(id > 0);
  });
};
