module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['env', 'stage-2'],
        plugins: [
          'transform-runtime',
        ],
      },
      debug: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'dist',
            ext: '.js',
          },
        ],
      },
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true, cwd: 'src/', src: '**', dest: 'dist/',
          },
        ],
      },
    },
    browserify: {
      dist: {
        files: {
          './dist/js/bundle.js': ['dist/index.js'],
        },
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015'],
              plugins: [
                'transform-runtime',
                'transform-es2015-spread',
                'transform-object-rest-spread',
              ],
            },
            ],
            'vueify',
          ],
        },
      },
    },
    watch: {
      components: {
        files: ['src/**/*.vue'],
        tasks: ['copy', 'browserify'],
      },
    },
  });
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['babel']);
  grunt.registerTask('webapp', ['copy', 'browserify', 'watch']);
  // grunt.registertask('web',['copy','babel','pug','browserify' ]);
};
