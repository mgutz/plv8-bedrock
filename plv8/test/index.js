var spec = require('./microspec');
spec.options({
  sourceLineOffset: 7,
  contextLines: 2
});

exports.run = function() {
  spec.addGlobals(['require', 'App', 'console']);
  require('plv8-mantle/microspec/microspecSpec');
  require('./exampleSpec');
};
