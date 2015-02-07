module.exports = function(grunt){
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // clean document directory
    clean: {
      siteA_css: [
        './css/style.css'
      ],
      siteA_mincss: [
        './css/style.min.css'
      ]
    },
    // compile scss to css
    compass: {
      siteA: {
        options: {
          bundleExec: true,
          config: 'config_siteA.rb'
        }
      }
    },
    cmq: {
      options: {
        log: true
      },
      siteA: {
        expand: true,
        cwd: 'css/',
        src: ['style.css'],
        dest: 'css/'
      }
    },
    cssmin: {
      siteA: {
        files: {
          './css/style.min.css': ['./css/style.css']
        }
      }
    },
    // watch some files status
    watch: {
      siteA: {
        options: {
          livereload: true
        },
        files: [
          '**/*.scss'
        ],
        tasks: [
          'compass:siteA',
          'cmq:siteA'
        ]
      }
    }
  });

  grunt.registerTask('default', ['watch:siteA']);

  grunt.registerTask('build_siteA_mincss', [
    'clean:siteA_mincss',
    'compass:siteA',
    'cmq:siteA',
    'cssmin:siteA'
  ]);

  grunt.registerTask('build_siteA_css', [
    'clean:siteA_css',
    'compass:siteA',
    'cmq:siteA',
  ]);

};
