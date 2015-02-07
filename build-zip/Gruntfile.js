module.exports = function(grunt){
  var matchdep = require('matchdep');

  // load all grunt-plugin tasks
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // init config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      htdocs: {
        options: {
          archive: 'dist/<%= pkg.name %>-htdocs-<%= grunt.template.today("yyyy-mm-dd-HHMM") %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'htdocs/',
            src: [
              '**',
              '!**/Thumb.db',
              '!_test/**'
            ],
            dest: 'hogehoge/'
          }
        ]
      }
    }
  });

  grunt.registerTask('zip_htdocs', [
    'compress:htdocs',
  ]);

};
