# plv8-bedrock

Migration and JavaScript foundation for PostgreSQL/plv8.

Bedrock is an example project that lets you code PostgreSQL
functions using JavaScript or CoffeeScript while using many node.js npm modules.
[browserify](http://browserify.org/) bundles your code and dependencies into a
self-contained bundle. The bundle is loaded into the plv8 runtime via
[mygrate](https://github.com/mgutz/mygrate), which uses `psql` compatible SQL
files.

## Prerequisites

Tested using [pgdg apt instructions](https://wiki.postgresql.org/wiki/Apt).
In addition to installing postgresql-9.3, install plv8 engine

    sudo apt-get install postgresql-9.3-plv8

TODO: Make it work with OS X

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

Test it

    ./dbconsole

    # inside psql

    # load JS bundle
    select plv8_startup();

    # returns Hello World! string from plv8 function
    select hello('world');

    select addPerson('{ "firstName": "barney", "lastName": "rubble", "likes": ["node.js", "plv8", "postgres"], "meta": { "eyes": "brown"}}'::json);


## Workflow

You are assigned a task to create user authentication.

1.  First create a migration

        mygrate new user-auth

2.  Add or update tables, functions in `up.sql`.  Add corresponding revert
    logic in `down.sql`.

    For plv8 tasks. Edit JavaScript in `plv8/`. Add function declarations
    in `migrations/CURRENT/up-functions.sql`.

    NOTE: The migrations directory resides outside of migrations
    for easy version control. A snapshot of the source is bundled
    by each migration. In practice, you would have many `plv8-startup` migrations
    corresponding to milestones.

3.  Update the database by running

        mygrate up

    If there are errors, fix errors and rerun.

4.  Let's say you need to edit the script. Undo the migration, make changes,
    then update it again

        mygrate down    # undoes last migration
        mygrate up      # run migration again

NOTE:

The `minPrehookDate` property in config.js is checked to determine whether
hooks are run. The prehook in this project updates the JavaScript bundle.
You do not want those to run for migrations that have already been applied
to the production database.

Simply set the `minPrehookDate` to a timestamp before the one you are
coding.  Prehooks must have a timestamp *greater* than `minPrehookDate`
to run.

## Best Practices and Tips

*   Change the `App` namespace in `plv8/index.js`

*   Quickest way to reset the dev database is `mygrate createdb`

*   If config.js database settings are changed, run `mygrate console` to
    update `./dbconsole` script.

*   Define functions by delegating the work to a function in the plv8
    directory. This avoids the costly `find_function`

        CREATE OR REPLACE FUNCTION addPerson(person JSON) RETURNS int AS $$
                return App.example.addPerson(person);
        $$ LANGUAGE plv8 IMMUTABLE STRICT;


