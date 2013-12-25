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

