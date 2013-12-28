-- needed to see all messages
set client_min_messages = DEBUG1;

-- load the bundle
select plv8_startup();

-- run the test
do language plv8 $$
  require('./lib/util').dumpGlobal();

  var spec = require('./lib/spec');
  spec.colorful(true);
  var test = require('./test');
  test.run();
$$;

