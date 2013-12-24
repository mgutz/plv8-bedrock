str = require('underscore.string')
HSTORE = require('pg-hstore')

# create module specific logger
log = require('./logger').getLogger('example')

module.exports =
  hello: (name) ->
    log.debug("ENTER hello") if log.isDebug
    str.titleize "hello #{name}!"

  # select addPerson('{ "firstName": "mario", "lastName": "gutierrez", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}}'::json);
  addPerson: (person) ->
    plv8._executeScalar """
      INSERT INTO people (first_name, last_name, likes, meta)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    """, [person.firstName, person.lastName, person.likes, HSTORE.stringify(person.meta)]



