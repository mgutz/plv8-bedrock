-- sudo apt-get install postgresl-9.3-plv8
CREATE extension if not exists plv8;

CREATE OR REPLACE FUNCTION plv8_startup() RETURNS VOID AS $$

