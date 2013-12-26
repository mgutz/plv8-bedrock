
var colors = require('mgutz-colors');
var passColor = colors.fn("green");
var failColor = colors.fn("red");
var headerColor = colors.fn("cyan");

var options = {
  globals: [
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
  ],
  colorful: false
};


function checkGlobals(moreGlobals) {
  var global = (function(){ return this; }).call(null);
  var allGlobals = options.globals.concat(moreGlobals);
  var summary = [];
  Object.keys(global).forEach(function(p) {
    if (allGlobals.indexOf(p) < 0) {
      summary.push('!!! Global variable leak: ' + p);
    }
  });
  return summary;
};

var IGNORE = '#';
var PENDING = '_';
var ONLY = '+';

module.exports = function(group, opts, tests) {
  var name, fn, total, only, message;

  if (arguments.length === 2) {
    tests = opts;
    opts = {};
  }

  var before, after;
  var subset = [];
  var set = [];
  if (typeof tests === 'function') {
    set.push({name: '(anonymous)', fn: tests});
  } else {
    for (name in tests) {
      fn = tests[name];
      if (name === 'before') {
        before = fn;
      } else if (name === 'after') {
        after = fn;
      } else if (name[0] === ONLY) {
        subset.push({name: name, fn: tests[name]});
      } else if (name[0] === IGNORE) {
        continue;
      } else {
        set.push({name: name, fn: tests[name]});
      }
    }
  }

  var ran = 0, pending = 0;

  if (subset.length > 0) set = subset;

  var summary = ['', options.colorful ?  headerColor(group) : group];
  try {
    if (before) before();
    var i, test;
    for (i = 0; i < set.length; i++) {
      test = set[i];
      name = test.name;
      fn = test.fn;
      if (name[0] === PENDING) {
        summary.push('  - (PENDING) ' + name.slice(1));
        pending += 1;
      } else if (name[0] === ONLY) {
        summary.push('  - ' + name.slice(1));
        fn();
        ran += 1;
      } else {
        summary.push('  - ' + name);
        fn();
        ran += 1;
      }

      if (options.colorful) {
        var last = summary[summary.length - 1];
        summary[summary.length-1] = passColor(last);
      }
    }
    if (after) after();

    message = '  ran ' + ran + ' specs';
    if (pending > 0) message += ' (' + pending + ' pending)';
    summary.push(message);
    summary = summary.concat(checkGlobals(opts.globals));
  } catch(e) {
    if (e.stack) {
      message = e.stack;
    } else {
      message = e.message;
    }

    if (options.colorful) {
      var last = summary[summary.length - 1];
      summary[summary.length-1] = failColor(last);
      summary.push(failColor(message));
    } else {
      summary.push(message);
    }
  }

  console.log(summary.join('\n'));
};


module.exports.addGlobals = function(arr) {
  options.globals = options.globals.concat(arr);
};

module.exports.colorful = function(truthy) {
  options.colorful = truthy;
}

