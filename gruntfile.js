module.exports = function(grunt) {
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    bumpup: 'package.json',

    mochaTest: {
      test: {
        src: ['server/tests/**/*.js']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'client/'
        }
      }
    },
    qunit: {
      tests: {
        options: {
          urls: ['http://localhost:8000/tests/tests.html']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'client/dist/<%= pkg.name %>.min.js': ['client/dist/<%= pkg.name %>.min.js'],
          'server/www/js/<%= pkg.name %>.min.js': ['client/dist/<%= pkg.name %>.min.js'],
        }
      }
    },
    wrap: {
      files: {
        src: ['client/src/<%= pkg.name %>.js'],
        dest: 'client/dist/<%= pkg.name %>.min.js',
        options: {
          wrapper: ['try {', '} catch(e) { console.log(e); }']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask('test', ['connect', 'qunit', 'mochaTest']);
  grunt.registerTask('build', ['bumpup:patch', 'wrap', 'uglify']);
  grunt.registerTask('default', ['test', 'build']);

};