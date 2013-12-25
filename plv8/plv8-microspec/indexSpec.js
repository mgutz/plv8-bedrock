var assert = require('assert');
var describe = require('../plv8-microspec');

var ran = 0;
describe('microspec', {

  before: function() {
    ran++;
  },

  'should pass': function() {
    assert.ok(true);
    ran++;
  },

  '_should be pending': function() {
    // should not run
    ran++;
  },

  '#should be ignored': function() {
    // should not run
    ran++;
  },

  'should catch global var leak': function() {
    badvar = 100;
    ran++;
  },

  after: function() {
    assert.ok(ran === 4);
  },

  'should have run': function() {
    ran++;
  }
});

ran = 0;
describe('microspec - subset marked with "+"', {
  before: function() {
    ran++;
  },

  '+should pass': function() {
    assert.ok(true);
    ran++;
  },

  '_should be pending': function() {
    // should not run
    ran++;
  },

  '#should be ignored': function() {
    // should not run
    ran++;
  },

  '+should catch global var leak': function() {
    badvar = 100;
    ran++;
  },

  after: function() {
    assert.ok(ran === 3);
  },

  'should have run': function() {
    ran++;
  }
});
