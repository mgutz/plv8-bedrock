# plv8-logger

Simple named, level logger that delegates to `plv8.elog`

## Using

`client_min_messages` must be set to a minimum level to see output. In
development, set it with this statement

    set client_min_messages = DEBUG1;

To create a logger with default level

    var log = require('plv8-logger').getLogger('a-module');

To create a logger with level

    var log = require('plv8-logger').getLogger('another-module', 'DEBUG');

These methods are available

    log.debug();
    log.log();
    log.info();
    log.notice();
    log.warn();
    log.error();

Use guards to minimize run-time impact!

    if (log.isDebug) log.debug(JSON.stringify(someObject));

## Options

To set global level

    var logger = require('plv8-logger');
    logger.setLevel('DEBUG');




