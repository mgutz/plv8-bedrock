// Adds some convenience methods to plv8, eg plv8.__executeScalar. Only needs
// to be required once.
require('plv8-mantle/plv8-fill');

// INTENTIONAL global leak
console = require('plv8-mantle/console');
App = require('./app');

