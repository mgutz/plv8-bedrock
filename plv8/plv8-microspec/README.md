# plv8-microspec

Simple, synchronous unit testing.


## Options

microspec has a few options

    var spec = require('plv8-microspec');

To output colorful red/green (pass/fail) messages

    spec.colorful(true);

Global leaks are checked automatically. To add exclusions

    spec.addGlobals(['YourApp', 'console']);


## Example

A spec is a simple function `spec(name, testsObject)`.
Each spec requires a `name`, which is the subject matter. Test functions are properties
of `testObject`. The first character of a test name may be special character

*   `+` Run ONLY marked tests. A quick way to isolate 1 or more tests.
*   `_` Pending test, will not run.
*   `#` Ignore test.

Any other test is a normal test.

Example

    //// test/example.js

    var assert = require('assert');         // bring your own assert
    var spec = require('plv8-microspec');

    spec('Test Header', {
      '+should run only this test': function() {
      },

      '_should be pending': function(){
      },

      '#should be ignored': function() {
      },

      'should run absence of special character': function() {
        assert.equal(1, 1);
      }
    });

Requiring a spec runs it immediately. For example, to run multiple specs

    require('/test/example');
    require('/test/example2');

