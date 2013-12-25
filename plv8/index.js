// add any libraries here that are not used by the app but may be
// used interactively in psql/pgadmin3
var _ = require('underscore');
_.str = require('underscore.string');

// INTENTIONAL global leak
console = require('./plv8-console');
App = require('./app');

