create extension if not exists hstore;

create table people (
	id serial primary key,
	first_name text,
	last_name text,
	likes text[],
	meta hstore
);



