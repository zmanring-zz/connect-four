module.exports = function (grunt) {

  // Load all tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssc: {
      build: {
        options: {
          consolidateViaDeclarations: true
        },
        files: {
          'build/css/main.css': 'build/css/main.css'
        }
      }
    },
    cssmin: {
      build: {
        src: 'build/css/main.css',
        dest: 'build/css/main.css'
      }
    },
    copy: {
      indexHtml: {
        src: 'index.html',
        dest: 'build/index.html',
      },
    },
    htmlhint: {
      build: {
        options: {
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'attr-value-not-empty': true,
          'doctype-first': true,
          'head-script-disabled': true,
          'id-class-value': true,
          'id-unique': true,
          'img-alt-require': true,
          'spec-char-escape': true,
          'src-not-empty': true,
          'style-disabled': true,
          'tag-pair': true,
          'tag-self-close': true,
          'tagname-lowercase': true
        },
        src: ['index.html']
      }
    },
    jasmine: {
      pivotal: {
        src: 'assets/js/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },
    uglify: {
      build: {
        files: {
          'build/js/main.min.js': ['assets/js/jquery-2.0.3.min.js', 'assets/js/main.js']
        }
      }
    },
    sass: {
      build: {
        files: {
          'build/css/main.css': 'assets/scss/main.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['buildcss']
      },
      html: {
        files: ['index.html'],
        tasks: ['buildhtml']
      },
      js: {
        files: ['assets/js/main.js'],
        tasks: ['buildjs']
      },
      specs: {
        files: ['spec/*Spec.js'],
        tasks: ['jasmine']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('buildhtml', ['htmlhint', 'copy:indexHtml']);
  grunt.registerTask('buildjs', ['uglify', 'jasmine']);

};