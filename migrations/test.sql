set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  require('./lib/util').dumpGlobal();
  var spec = require('./lib/spec');
  spec.colorful(true);
  var test = require('./test');
  test.run();
$$;

