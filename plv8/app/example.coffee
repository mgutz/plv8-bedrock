str = require('underscore.string')
dal = require('./dal')
HSTORE = require('pg-hstore')


module.exports =
  hello: (name) ->
    str.titleize "hello #{name}!"

  # select addPerson('{ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}}'::json);
  addPerson: (person) ->
    id = dal.execScalar """
      INSERT INTO people (first_name, last_name, likes, meta)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    """, [person.firstName, person.lastName, person.likes, HSTORE.stringify(person.meta)]



