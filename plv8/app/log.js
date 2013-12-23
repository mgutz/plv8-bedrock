module.exports =  {
  debug: function() {
    plv8.elog.apply(null, [DEBUG1].concat([].slice.call(arguments, 0)));
  }
};
