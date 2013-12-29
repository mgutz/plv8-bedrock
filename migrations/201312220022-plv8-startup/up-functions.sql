CREATE OR REPLACE FUNCTION plv8_source(lineno integer) RETURNS void AS $$
  // REMEMBER all argument names are converted to lowercase unless quoted.
  plv8.__dumpSource(lineno, 10);
$$ LANGUAGE plv8;

CREATE OR REPLACE FUNCTION plv8_source(lineno int, context_lines int) RETURNS void AS $$
  plv8.__dumpSource(lineno, context_lines);
$$ LANGUAGE plv8;

/* TODO: add Function declarations here */

CREATE OR REPLACE FUNCTION app_hello(name text) RETURNS text AS $$
  return App.example.hello(name);
$$ LANGUAGE plv8 IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION app_add_person(person JSON) RETURNS int AS $$
  return App.example.addPerson(person);
$$ LANGUAGE plv8;


