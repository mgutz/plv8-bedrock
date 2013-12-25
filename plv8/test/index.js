var microspec = require('../plv8-microspec');

exports.run = function() {
  microspec.addGlobals(['require', 'App']);
  microspec.run([
    require('../plv8-microspec/indexSpec'),
    require('./exampleSpec')
  ]);
};
