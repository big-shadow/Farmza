/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    watch: {
      // If any .less file changes in directory "build/less/" run the "less"-task.
      files: ["build/less/*.less", "build/less/skins/*.less", "js/app.js"],
      tasks: ["less", "uglify"]
    },
    // "less"-task configuration
    // This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
    less: {
      // Development not compressed
      development: {
        options: {
          // Whether to compress or not
          compress: false
        },
        files: {
          // compilation.css  :  source.less
          "css/AdminLTE.css": "build/less/AdminLTE.less",
          //Non minified skin files
          "css/skins/skin-blue.css": "build/less/skins/skin-blue.less",
          "css/skins/skin-black.css": "build/less/skins/skin-black.less",
          "css/skins/skin-yellow.css": "build/less/skins/skin-yellow.less",
          "css/skins/skin-green.css": "build/less/skins/skin-green.less",
          "css/skins/skin-red.css": "build/less/skins/skin-red.less",
          "css/skins/skin-purple.css": "build/less/skins/skin-purple.less",
          "css/skins/skin-blue-light.css": "build/less/skins/skin-blue-light.less",
          "css/skins/skin-black-light.css": "build/less/skins/skin-black-light.less",
          "css/skins/skin-yellow-light.css": "build/less/skins/skin-yellow-light.less",
          "css/skins/skin-green-light.css": "build/less/skins/skin-green-light.less",
          "css/skins/skin-red-light.css": "build/less/skins/skin-red-light.less",
          "css/skins/skin-purple-light.css": "build/less/skins/skin-purple-light.less",
          "css/skins/_all-skins.css": "build/less/skins/_all-skins.less"
        }
      },
      // Production compresses version
      production: {
        options: {
          // Whether to compress or not
          compress: true
        },
        files: {
          // compilation.css  :  source.less
          "css/AdminLTE.min.css": "build/less/AdminLTE.less",
          // Skins minified
          "css/skins/skin-blue.min.css": "build/less/skins/skin-blue.less",
          "css/skins/skin-black.min.css": "build/less/skins/skin-black.less",
          "css/skins/skin-yellow.min.css": "build/less/skins/skin-yellow.less",
          "css/skins/skin-green.min.css": "build/less/skins/skin-green.less",
          "css/skins/skin-red.min.css": "build/less/skins/skin-red.less",
          "css/skins/skin-purple.min.css": "build/less/skins/skin-purple.less",
          "css/skins/skin-blue-light.min.css": "build/less/skins/skin-blue-light.less",
          "css/skins/skin-black-light.min.css": "build/less/skins/skin-black-light.less",
          "css/skins/skin-yellow-light.min.css": "build/less/skins/skin-yellow-light.less",
          "css/skins/skin-green-light.min.css": "build/less/skins/skin-green-light.less",
          "css/skins/skin-red-light.min.css": "build/less/skins/skin-red-light.less",
          "css/skins/skin-purple-light.min.css": "build/less/skins/skin-purple-light.less",
          "css/skins/_all-skins.min.css": "build/less/skins/_all-skins.less"
        }
      }
    },
    // Uglify task info. Compress the js files.
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      my_target: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },
    // Build the documentation files
    includes: {
      build: {
        src: ['*.html'], // Source files
        dest: 'documentation/', // Destination directory
        flatten: true,
        cwd: 'documentation/build',
        options: {
          silent: true,
          includePath: 'documentation/build/include'
        }
      }
    },

    // Optimize images
    image: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build/img/',
          src: ['**/*.{png,jpg,gif,svg,jpeg}'],
          dest: 'img/'
        }]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      core: {
        src: 'js/app.js'
      },
      demo: {
        src: 'js/demo.js'
      },
      pages: {
        src: 'js/pages/*.js'
      }
    },

    csslint: {
      options: {
        csslintrc: 'build/less/.csslintrc'
      },
      dist: [
        'css/AdminLTE.css',
      ]
    },

    // Delete images in build directory
    // After compressing the images in the build/img dir, there is no need
    // for them
    clean: {
      build: ["build/img/*"]
    }
  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes');
  // Optimize images
  grunt.loadNpmTasks('grunt-image');
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // The default task (running "grunt" in console) is "watch"
  grunt.registerTask('default', ['watch']);
};
