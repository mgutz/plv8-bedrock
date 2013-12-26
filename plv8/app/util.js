/**
 * Gets the global context.
 */
exports.getGlobal = function() {
  return (function() { return this; })(null);
};


/**
 * Logs the global context and global.require.
 */
exports.dumpGlobal = function() {
  var global = exports.getGlobal();

  var globals = [];
  for (var k in global) {
    globals.push(k);
  }
  var summary = ['\n', 'Globals', '-------'].concat(globals.sort()).join('\n');

  if (global.require) {
    var packages =  [];
    for (var k in global.require) {
      packages.push(k);
    }
    summary = summary.concat(['\n', 'Requirable Packages', '-------------------'].concat(packages.sort()).join('\n'));
  }
  plv8.elog(LOG, summary);
};
