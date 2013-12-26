set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  require('/app/util').dumpGlobal();

  var spec = require('/plv8-microspec');
  spec.colorful(true);
  var test = require('/test');
  test.run();
$$;

