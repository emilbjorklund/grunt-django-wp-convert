'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.django_wp_convert = {
  setUp: function(done) {
    // setup here if necessary
    grunt.file.mkdir('tmp');
    done();
  },
  // default_options: function(test) {
  //   test.expect(1);

  //   var actual = grunt.file.read('tmp/default_options');
  //   var expected = grunt.file.read('test/expected/default_options');
  //   test.equal(actual, expected, 'should describe what the default behavior is.');

  //   test.done();
  // },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/migrated_foo.Bar.json');
    var expected = grunt.file.read('test/expected/migrated_example_input_1');
    test.equal(actual, expected, 'it should convert from the example input to the expected output');

    test.done();
  },
};
