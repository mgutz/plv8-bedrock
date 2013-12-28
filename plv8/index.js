// Adds some convenience methods to plv8, eg plv8.__executeScalar. Only needs
// to be required once.
require('./lib/plv8-fill');

// INTENTIONAL global leak
console = require('./lib/console');
App = require('./app');

