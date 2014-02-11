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

  grunt.registerMultiTask('django_wp_convert', 'A simple tool to convert JSON output from PHPMyAdmin/Wordpress to a format suitable for loading into a Django installation.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      output_dir: grunt.option('output_dir'),
      json_input: grunt.option('json_input'),
      model_string: grunt.option('model_string')
    });
    grunt.log.writeln(grunt.option('json_input'));
    // Check for file existance:
    if (!grunt.file.exists(options.json_input)) {
      grunt.log.warn("JSON file for input '" + options.json_input + "' not found.");
      return false;
    }
    grunt.log.writeln(options.json_input);

    if (!grunt.file.isDir(options.output_dir)) {
      grunt.log.warn('The directory "'+ options.output_dir +'" doesn\'t seem to be a directory...');
      return false;
    }
    grunt.log.writeln(options.output_dir);

    var orig_file = grunt.file.readJSON(options.json_input);

    // Check for file JSON validity:
    if (!orig_file) {
      grunt.log.warn('Something is wonky with the JSON input. Check it, foo.');
      return false;
    }
    //grunt.log.write(JSON.stringify(orig_file));

    // Initialize array to hold result:
    var resultJSON = [];

    // Iterate over each object in the original file and convert it:
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
    grunt.log.write(resultJSONString);
    var output_file = path.join(options.output_dir + '/migrated_' + options.model_string + '.json');
    grunt.log.writeln(output_file);
    grunt.file.write(output_file , resultJSONString);
    // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });

};
