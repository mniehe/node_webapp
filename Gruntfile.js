module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // For combining JS files into one
    concat: {
      options: {
        separator: ';',
      },
      
      js_frontend: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'assets/js/*.js',
          'assets/js/vendor/*.js'
        ],
        dest: 'public/js/main.js',
      },      
    },
    
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'Swiper']
        }
      },

      js_frontend: {
        files: {
          'public/js/main.js': 'public/js/main.js'
        }
      }    
    },
    
    compass: {                  // Task
      watch: {                   // Target
        options: {              // Target options
          sassDir: 'assets/scss',
          cssDir: 'public/css',
          config: 'config/dev-config.rb'
        }
      },
        
      prod: {                   // Target
        options: {              // Target options
          sassDir: 'assets/scss',
          cssDir: 'public/css',
          config: 'config/prod-config.rb'
        }
      }        
    },
    
    // For compressing images
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'public/img/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,ico}'],   // Actual patterns to match
          dest: 'public/img/'       // Destination path prefix
        }]
      }
    },
    
    watch: {
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat:js_frontend'],
        options: {
          spawn: true,
        },           
      },
      
      compass: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['compass:watch'],
        options: {
          spawn: true,
        },   
      }
    }  
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['watch']);
  
  grunt.registerTask('build', [
    'concat',
    'uglify',
    'compass:prod',
    'imagemin'
  ]);
};