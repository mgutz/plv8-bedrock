set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  plv8._dumpGlobal();

  var spec = require('/plv8-microspec');
  spec.colorful(true);
  var test = require('/test');
  test.run();
$$;

