# plv8-bedrock

Migration and JavaScript foundation for PostgreSQL/plv8.

Bedrock is an example project that lets you code PostgreSQL
functions using JavaScript or CoffeeScript while using many node.js npm modules.
[browserify](http://browserify.org/) bundles your code and dependencies into a
self-contained bundle. The bundle is loaded into the plv8 runtime via
[mygrate](https://github.com/mgutz/mygrate), which uses `psql` compatible SQL
files.

## Prerequisites

### Ubuntu

Tested using [pgdg apt instructions](https://wiki.postgresql.org/wiki/Apt).
In addition to installing postgresql-9.3, install plv8 engine

    sudo apt-get install postgresql-9.3-plv8

### Mac

Tested with [Postgres.app](http://postgresapp.com/)


## Getting Started

Clone the project

    git clone https://github.com/mgutz/plv8-bedrock

Install dependencies

    npm install mygrate@0.2.0-pre -g
    npm install

Create the database which requires a superuser with password

    mygrate createdb

Run migrations

    mygrate up

View migrations history

    mygrate

Test it interactively

    ./dbconsole

    -- load JS bundle
    select plv8_startup();

    -- script source in plv8/app/example.coffee
    -- function wrapper in migrations/201312220022-plv8-startup/up-functions.sql
    select app_hello('world');
    select app_add_person('{ "firstName": "barney", "lastName": "rubble", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}}'::json);

Or, run tests

    npm test

## Workflow

For new tasks

1.  Create a migration

        mygrate new user-auth

    To create a plv8 migration, you have to manually copy
    `migrations/*-plv8-startup` for now and change the timestamp.

2.  Add or update tables, functions in `up.sql`.  Add corresponding revert
    logic in `down.sql`.

    For plv8 tasks, edit JavaScript in `plv8/`. Add function declarations
    in `migrations/CURRENT/up-functions.sql`.

    NOTE: The plv8 directory resides outside of migrations
    for easy version control. A snapshot of the source is bundled
    by each migration. In practice, you would have many `plv8-startup` migrations
    corresponding to milestones.

3.  To update the database and mygrate down/up your last migration created
    above

        mygrate last

4.  Run unit tests

        mygrate migrations/test.sql

Repeat steps 2 and 3, 4 as needed

Tip: steps 3 and 4 can also be peformed by running

    npm test

NOTE:

The `minHookDate` property in config.js is checked to determine whether
hooks are run. The prehook in this project updates the JavaScript bundle.
You do not want those to run for migrations that have already been applied
to the production database.

Simply set the `minHookDate` to a folder timestamp before the one you are
coding.


## Unit Testing

`plv8-microspec` is included as a minimal test library.
See `plv8/test/index.js` for an example test suite.

To run tests

*   From psql

        mygrate file migrations/test.sql

*   From pgadmin3, execute the script `migrations/test.sql`

## Globals

These globals are added for convenience

*   `App` - The app namespace

*   `require` - Access modules in bundle

        do language plv8 $$
            var _ = require('underscore');
            # note local folders start with '/'
            var logger = require('/app/logger');
        $$;

## Best Practices and Tips

*   Change the `App` namespace in `plv8/index.js`

*   Use `logger` with guards to avoid processing of arguments.

        var log = require('/plv8-logger').getLogger('person');

        exports.someFunc = function() {
            var record;
            // ...
            if (log.isNotice) log.notice(JSON.stringify(record));
        };

*   Quickest way to reset the dev database is `mygrate createdb`

*   If config.js database settings are changed, run `mygrate console` to
    update `./dbconsole` script.

*   Define functions by delegating the work to a function in the plv8
    directory.

        CREATE OR REPLACE FUNCTION app_add_person(person JSON) RETURNS int AS $$
            return App.example.addPerson(person);
        $$ LANGUAGE plv8 IMMUTABLE STRICT;

*   To minify

        MINIFY=1 mygrate up

