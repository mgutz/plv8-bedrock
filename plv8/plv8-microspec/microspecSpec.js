var assert = require('assert');
var spec = require('../plv8-microspec');

var ran = 0;
spec('microspec', {

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

  after: function() {
    assert.ok(ran === 3);
  },

  'should have run': function() {
    ran++;
  }
});

ran = 0;
spec('microspec - subset marked with "+"', {
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

  after: function() {
    assert.ok(ran === 2);
  },

  'should have run': function() {
    ran++;
  }
});


spec('microspec - intentional errors', {
  'should catch global var leak': function() {
    spec('global var leak',  function() {
      badvar = 100;
    });
    // delete bad var from above for other tests
    var global = (function() { return this; })(null);
    delete global.badvar;
  },

  'should fail': function() {
    assert.equal("hello", "yello");
  },
});

spec('_microspec - entire spec is pending', {
  'should fail': function() {
    assert.true(false);
  }
});

spec('#microspec - entire spec is ignored', {
  'should fail': function() {
    assert.true(false);
  }
});
