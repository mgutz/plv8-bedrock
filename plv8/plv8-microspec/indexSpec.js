var assert = require('assert');

exports.microspec = function(o) {
  var ran = 0;

  o.before(function() {
    ran++;
  });

  o.it('should pass', function() {
    assert.ok(true);
    ran++;
  });

  o._it('should have pending', function() {
    // this should not run
    ran++;
  });

  o.it('should catch global var leak', function() {
    // this should not run
    badvar = 100;
    ran++;
  });

  o.after(function() {
    ran++;
  });

  o.it('should have run', function() {
    assert.ok(ran === 4);
  });
};
