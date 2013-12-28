var microspec = require('../lib/spec');
var assert = microspec.assert;
assert.SOURCE_LINE_OFFSET = 7;  // adjust for preamble lines in the source

exports.run = function() {
  microspec.addGlobals(['require', 'App', 'console']);
  require('plv8-mantle/microspec/microspecSpec');
  require('./exampleSpec');
};
