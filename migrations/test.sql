set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  var test = require('/test');
  test.run();
$$;

