CREATE extension if not exists plv8;

CREATE OR REPLACE FUNCTION plv8_startup() RETURNS VOID AS $$
  // resets App global context properties
  var global = (function(){ return this; }).call(null);
  delete global.App;
  delete global.require;

