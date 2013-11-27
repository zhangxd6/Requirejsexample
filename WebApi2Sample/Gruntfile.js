/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
      sass: {
          dist: {
              options: {
                  sourcemap: true,
                  trace: true
              },
              files: { // Dictionary of files
                  'Content/main.css': 'Content/main.scss', // 'destination': 'source'
              }
          }
      },
    watch: {
        options: {
            livereload: true,
        },
        css: {
            files: ['Content/*.scss'],
            tasks: ['sass'],
        },
        script: {
            files: ['main.js','Scripts/**/*.js']


        },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
