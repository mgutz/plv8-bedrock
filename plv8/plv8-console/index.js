process.stdout = {
  write: function() {
    var args = [].slice.call(arguments, 0);
    args.unshift(LOG);
    plv8.elog.apply(plv8, args);
  }
};

process.stderr = {
  write: function() {
    var args = [].slice.call(arguments, 0);
    args.unshift(WARNING);
    plv8.elog.apply(plv8, args);
  }
};

module.exports = require('./console');

