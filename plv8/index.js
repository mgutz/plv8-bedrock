// Adds some convenience methods to plv8, eg plv8.__executeScalar
require('./lib/plv8-fill');

// INTENTIONAL global leaks
console = require('./lib/console');
App = require('./app');

