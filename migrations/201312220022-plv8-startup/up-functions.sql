/* TODO: add Function declarations here */

CREATE OR REPLACE FUNCTION hello(name text) RETURNS text AS $$
	return App.example.hello(name);
$$ LANGUAGE plv8 IMMUTABLE STRICT;

CREATE OR REPLACE FUNCTION addPerson(person JSON) RETURNS int AS $$
	return App.example.addPerson(person);
$$ LANGUAGE plv8 IMMUTABLE STRICT;


