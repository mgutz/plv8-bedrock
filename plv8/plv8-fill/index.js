/**
 * plv8Fill - Adds extra methods to plv8. All methods are prefixed with '_'
 * to future proof.
 */

/**
 * Executes SQL with optional params, returning a scalar value.
 */
plv8._executeScalar = function() {
  var result = plv8.execute.apply(null, [].slice.call(arguments, 0));
  var L = result.length;
  if (L == 0)  {
    return null;
  } else if (L == 1) {
    var row = result[0];
    var scalarKey = Object.keys(row)[0];
    return row[scalarKey];
  } else {
    throw new Error('Expected single row, query returned multiple rows');
  }
};


/**
 * Gets the global context.
 */
plv8._getGlobal = function() {
  return (function() { return this; })(null);
};


/**
 * Logs the global context and global.require.
 */
plv8._dumpGlobal = function() {
  var global = plv8._getGlobal();

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

