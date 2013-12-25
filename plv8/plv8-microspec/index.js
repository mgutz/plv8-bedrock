var log = require('../plv8-logger').getLogger('', 'LOG');
var globals = [
    'DEBUG5',
    'DEBUG4',
    'DEBUG3',
    'DEBUG2',
    'DEBUG1',
    'DEBUG',
    'LOG',
    'INFO',
    'NOTICE',
    'WARNING',
    'ERROR',
    'plv8'
];

var Spec = function(name) {
  this.name = name;
  this.ran = 0;
  this.pending = 0;
  log.log(name);
};

function runSpec(name, callable) {
  var spec = new Spec(name);
  callable(spec);
  spec.checkGlobals();
  spec.summary();
};

Spec.prototype.it = function(name, callable) {
  log.log("  - " + name);
  callable();
  this.ran += 1;
};

Spec.prototype._it = function(name, callable) {
  log.log("  - (PENDING) " + name);
  this.pending += 1;
};

Spec.prototype.before = function(callable) {
  callable();
};

Spec.prototype.after = function(callable) {
  callable();
};

Spec.prototype.summary = function() {
  log.log('  ran ' + this.ran + ' specs (' + this.pending + ' pending)');
};

Spec.prototype.checkGlobals = function() {
  var global = (function(){ return this; }).call(null);
  Object.keys(global).forEach(function(p) {
    if (globals.indexOf(p) < 0) {
      log.log('');
      log.warn('!!! Global variable leak: ' + p);
    }
  });
};

exports.addGlobals = function(arr) {
  globals = globals.concat(arr);
};

exports.run = function(modules) {
  if (!Array.isArray(modules)) modules = [modules];

  log.log('BEGIN microspec');
  log.log('');
  modules.forEach(function(mod) {
    for (var name in mod) {
      try {
        runSpec(name, mod[name]);

      } catch (e) {
        log.warn('!!! ', e.toString());
      }
    }
  });
  log.log('');
  log.log('END microspec');
};
