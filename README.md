# grunt-django-wp-convert

> A simple and very very untested and basic tool to convert JSON output from PHPMyAdmin/Wordpress to a format suitable for loading into a Django installation. Highly project-specific, **you probably shouldn't use it for anything at all**.

## Getting Started
This plugin requires Grunt `~0.4.2`

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-django-wp-convert');
```

## The "django_wp_convert" task

### Overview
In your project's Gruntfile, add a section named `django_wp_convert` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  django_wp_convert: {
    options: {
      // Task-specific options/defaults go here.
    },
  },
});
```

### Options


### Usage Examples

```
grunt django_wp_convert --json_input=foo/bar/my_json_wp_export.json --output_dir=migrated/json --model_string=foo.Bar
```
