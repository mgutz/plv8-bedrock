process.stdout = {
  write: function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(LOG);
    plv8.elog.apply(plv8, args);
  }
};

process.stderr = {
  write: function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(WARNING);
    plv8.elog.apply(plv8, args);
  }
};

module.exports = require('./console');

