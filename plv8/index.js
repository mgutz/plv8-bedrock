// add any libraries here that are not used by the app but may be
// used while coding/testing
var _ = require('underscore');
_.str = require('underscore.string');

// INTENTIONAL global leak
App = require('./app');
App._require = require;

