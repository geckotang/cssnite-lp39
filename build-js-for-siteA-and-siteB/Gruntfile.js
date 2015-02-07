module.exports = function(grunt){
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      siteA_js: [
        'www_siteA/js/lib.js',
        'www_siteA/js/script.js',
        'www_siteA/js/script.min.js'
      ],
      siteB_js: [
        'www_siteB/js/lib.js',
        'www_siteB/js/script.js',
        'www_siteB/js/script.min.js'
      ]
    },
    concat: {
      siteA_lib: {
        src: [
          'src-js/lib/jquery-1.11.2.min.js',
          'src-js/lib/underscore-min.js'
        ],
        dest: 'www_siteA/js/lib.js'
      },
      siteA_js: {
        src: [
          'src-js/script-1.js',
          'src-js/script-2.js',
          'src-js/script-3.js'
        ],
        dest: 'www_siteA/js/script.js'
      },
      siteB_lib: {
        src: [
          'src-js/lib/jquery-1.11.2.min.js'
        ],
        dest: 'www_siteB/js/lib.js'
      },
      siteB_js: {
        src: [
          'src-js/script-3.js'
        ],
        dest: 'www_siteB/js/script.js'
      }
    },
    uglify: {
      siteA_js: {
        options: {
          preserveComments: 'some',
          banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: 'www_siteA/js/script.js',
        dest: 'www_siteA/js/script.min.js'
      },
      siteB_js: {
        options: {
          preserveComments: 'some',
          banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        src: 'www_siteB/js/script.js',
        dest: 'www_siteB/js/script.min.js'
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
      },
      siteB: {
        options: {
          livereload: true
        },
        files: [
          'src-js/**/*.js'
        ],
        tasks: [
          'concat:siteB_lib',
          'concat:siteB_js',
          'uglify:siteB_js'
        ]
      }
    }
  });

  grunt.registerTask('default', ['watch:siteA', 'watch:siteB']);

  grunt.registerTask('build_siteA_js', [
    'clean:siteA_js',
    'concat:siteA_lib',
    'concat:siteA_js',
    'uglify:siteA_js'
  ]);

  grunt.registerTask('build_siteB_js', [
    'clean:siteB_js',
    'concat:siteB_lib',
    'concat:siteB_js',
    'uglify:siteB_js'
  ]);

  grunt.registerTask('build_js', [
    'build_siteA_js',
    'build_siteB_js'
  ]);

};
