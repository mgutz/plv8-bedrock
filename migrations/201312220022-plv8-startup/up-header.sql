create extension if not exists plv8;

create table if not exists plv8_sources (
  filename text,
  code text
);

-- insert source so assert can give meaningful code context
\set code `cat /tmp/bundle.js`
delete from plv8_sources where filename = 'plv8_startup';
insert into plv8_sources
  (filename, code)
values
  ('plv8_startup', :'code');

create or replace function plv8_startup() returns void as $PLV8$
  // resets App global context properties
  var global = (function(){ return this; }).call(null);
  delete global.App;
  delete global.require;
