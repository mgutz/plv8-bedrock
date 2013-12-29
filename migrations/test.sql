-- needed to see all messages
set client_min_messages = DEBUG1;

-- load the bundle
select plv8_startup();

-- run the test
do language plv8 $$
  plv8.__dumpGlobal();

  var spec = require('./test/microspec');
  spec.options({colorful: true});
  var test = require('./test');
  test.run();
$$;

