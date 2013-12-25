process.stdout = {
  write: function() {
    plv8.elog.apply(plv8, [LOG].concat([].slice.call(arguments, 0)));
  }
};

process.stderr = {
  write: function() {
    plv8.elog.apply(plv8, [WARNING].concat([].slice.call(arguments, 0)));
  }
};

module.exports = require('./console');

