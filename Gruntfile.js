module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

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
   htmlhint: {
     build: {
       options: {
         'tag-pair': true,
         'tagname-lowercase': true,
         'attr-lowercase': true,
         'attr-value-double-quotes': true,
         'doctype-first': true,
         'spec-char-escape': true,
         'id-unique': true,
         'head-script-disabled': true,
         'style-disabled': true
       },
       src: ['index.html']
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
      tasks: ['htmlhint']
    },
    js: {
      files: ['assets/js/main.js'],
      tasks: ['uglify']
    }
   }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);

};