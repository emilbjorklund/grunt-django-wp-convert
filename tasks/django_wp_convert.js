/*
 * grunt-django-wp-convert
 * https://github.com/emilbjorklund/grunt-django-wp-convert
 *
 * Copyright (c) 2014 Emil Björklund
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('django_wp_convert',
    'A simple tool to convert JSON output from PHPMyAdmin/Wordpress to a format suitable for loading into a Django installation.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      output_dir: grunt.option('output_dir'),
      json_input: grunt.option('json_input'),
      model_string: grunt.option('model_string')
    });
    
    // Check for file existance:
    if (!grunt.file.exists(options.json_input)) {
      grunt.log.warn("JSON file for input '" + options.json_input + "' not found.");
      return false;
    }

    if (!grunt.file.isDir(options.output_dir)) {
      grunt.log.warn('The directory "'+ options.output_dir +'" doesn\'t seem to be a directory...');
      return false;
    }

    var orig_file = grunt.file.readJSON(options.json_input);

    // Check for file JSON validity:
    if (!orig_file) {
      grunt.log.warn('Something is wonky with the JSON input. Check it, foo.');
      return false;
    }
    //grunt.log.write(JSON.stringify(orig_file));

    // Initialize array to hold result:
    var resultJSON = [];

    // Iterate over each object in the original file and convert it.
    // I should probably go full hipster (kidding!) and do this in a more functional way.
    // Or something.
    orig_file.forEach(function (obj) {
        var resObj = {};
        resObj.pk = obj.id;
        resObj.model = options.model_string;
        resObj.fields = {};
        for (var key in obj) {
          if (key !== 'id') {
            resObj.fields[key] = obj[key];
          }
        }
        resultJSON.push(resObj);
    });

    var resultJSONString = JSON.stringify(resultJSON);

    var output_file = path.join(options.output_dir + '/migrated_' + options.model_string + '.json');

    // Write to the file:
    grunt.file.write(output_file , resultJSONString);
  });

};
