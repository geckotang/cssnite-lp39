module.exports = function(grunt){
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      siteA_js: [
        'js/lib.js',
        'js/script.js',
        'js/script.min.js'
      ]
    },
    concat: {
      siteA_lib: {
        src: [
          'src-js/lib/jquery-1.11.2.min.js',
          'src-js/lib/underscore-min.js'
        ],
        dest: 'js/lib.js'
      },
      siteA_js: {
        src: [
          'src-js/script-1.js',
          'src-js/script-2.js',
          'src-js/script-3.js'
        ],
        dest: 'js/script.js'
      }
    },
    uglify: {
      siteA_js: {
        options: {
          preserveComments: 'some',
          banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: 'js/script.js',
        dest: 'js/script.min.js'
      }
    },
    watch: {
      siteA: {
        options: {
          livereload: true
        },
        files: [
          'src-js/**/*.js'
        ],
        tasks: [
          'concat:siteA_lib',
          'concat:siteA_js',
          'uglify:siteA_js'
        ]
      }
    }
  });

  grunt.registerTask('default', ['watch:siteA']);

  grunt.registerTask('build_siteA_js', [
    'clean:siteA_js',
    'concat:siteA_lib',
    'concat:siteA_js',
    'uglify:siteA_js'
  ]);

};
