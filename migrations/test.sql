set client_min_messages = DEBUG1;
select plv8_startup();

do language plv8 $$
  var global = (function() { return this; }).call(null);

  var globals = [];
  for (var k in global) {
    globals.push(k);
  }
  plv8.elog(LOG, ['', 'Globals', '-------'].concat(globals.sort()).join('\n'));

  var packages =  [];
  for (var k in global.require) {
    packages.push(k);
  }
  plv8.elog(LOG, ['', 'Requirable Packages', '-------------------'].concat(packages.sort()).join('\n'));




  var test = require('/test');
  test.run();
$$;

