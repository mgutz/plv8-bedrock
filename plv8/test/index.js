var spec = require('./microspec');
spec.options({
  sourceLineOffset: 7,
  contextLines: 5
});

exports.run = function() {
  spec.addGlobals(['require', 'App', 'console']);
  require('./exampleSpec');
  spec.run();
};
