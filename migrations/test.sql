set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  require('plv8-mantle/util').dumpGlobal();
  var spec = require('plv8-mantle/microspec');
  spec.colorful(true);
  var test = require('./test');
  test.run();
$$;

