module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // For combining JS files into one
    concat: {
      options: {
        separator: ';',
      },

      prod: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'frontend/js/vendor/*.js',
          'frontend/js/*.js',

          '.tmp/js/app/view.js'
        ],
        dest: '.tmp/js/main.concat.js',
      },

      dev: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'frontend/js/vendor/*.js',
          'frontend/js/*.js',

          '.tmp/js/app/view.js'
        ],
        dest: '.tmp/js/main.js',
      },
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery', 'angular']
        }
      },

      prod: {
        files: {
          '.tmp/js/main.js': '.tmp/js/main.concat.js'
        }
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      assets: {
        src: [
          '.tmp/css/style.css',
          '.tmp/js/main.js'
        ]
      }
    },

    compass: {                  // Task
      dev: {                   // Target
        options: {              // Target options
          sassDir: 'frontend/scss',
          cssDir: '.tmp/css',
          config: 'config/dev_config.rb'
        }
      },

      prod: {                   // Target
        options: {              // Target options
          sassDir: 'frontend/scss',
          cssDir: '.tmp/css',
          config: 'config/prod_config.rb'
        }
      }
    },

    // For compressing images
    imagemin: {
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'frontend/img/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,ico}'],   // Actual patterns to match
          dest: '.tmp/img/'       // Destination path prefix
        }]
      }
    },

    ngtemplates: {
      prod: {
        cwd: 'frontend/js/app',
        src: 'views/**.html',
        dest: '.tmp/js/app/view.js',

        options: {
          module: 'ANGULAR_APP_NAME',
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dev: {
        src: '.tmp/css/style.css',
        dest: '.tmp/css/style.css',
      },
      prod: {
        src: '.tmp/css/style.css',
        dest: '.tmp/css/style.css',
        options: {
          map: true
        }
      },
    },
    
    copy: {
      frontend_assets: {
        files: [
          {expand: true, cwd: 'frontend/', src: ['**', '!{js,scss,img}/*'], dest: '.tmp/'},
        ],
      },
    },    

    watch: {
      options: {
        livereload: true,
      },

      scripts: {
        files: ['frontend/js/**/*.js'],
        tasks: ['ngtemplates','concat:dev'],
        options: {
          spawn: true,
        },
      },

      compass: {
        files: ['frontend/scss/**/*.scss'],
        tasks: ['compass:dev', 'autoprefixer:dev'],
        options: {
          spawn: true,
        },
      },

      js_views: {
        files: ['frontend/js/app/views/**/*.html'],
        tasks: ['ngtemplates','concat:dev'],
        options: {
          spawn: true,
        },
      },
      
      frontend_assets: {
        files: ['frontend/**/*', '!frontend/{js,scss,img}/**/*'],
        tasks: ['copy:frontend_assets'],
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
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'clear',
    'compass:dev',
    'autoprefixer:dev',
    'ngtemplates',
    'concat:dev',
    'copy:frontend_assets',
    'watch'
  ]);

  grunt.registerTask('prepare_assets', [
    'compass:prod',
    'autoprefixer:prod',
    'ngtemplates',
    'concat:prod',
    'uglify:prod',
    'imagemin',
    'copy:frontend_assets',
  ]);

  grunt.registerTask('clear', 'Deletes all old copies of the assets.', function() {
    // Get a list of all handlebar files
    var view = grunt.file.expand('backend/views/**/*.hbs');

    // Remove the the temp directory
    if (grunt.file.exists('.tmp')) {
      grunt.file.delete('.tmp');
    }

    // For each handlebar template
    view.forEach(function (file) {
      var contents = grunt.file.read(file, {encoding: 'utf8'});
      var hashRegex = new RegExp('(src|href)=\"\/(.*)(\.[0-9a-f]{8})(\.js|\.css)\"');
      var found;

      // Test if a hash is found on the end of a css or js file
      while (found = hashRegex.exec(contents)) {
        console.log("Removing " + found[2] + found[3] + found[4] + " from " + file);
        // Remove the hash
        contents = contents.replace(found[3] + found[4], found[4]);
      }

      grunt.file.write(file, contents);
    });
  });

  grunt.registerTask('asset_revision', 'Version the assets.', function() {
    grunt.task.requires('filerev');

    // Get a list of all handlebar files
    var view = grunt.file.expand('backend/views/**/*.hbs');
    var fileRev = {};

    // Remove the '.tmp' folder name from the front of all file locations
    for (var fileName in grunt.filerev.summary) {
      var newFilename = fileName.replace('\.tmp','');
      fileRev[newFilename] = grunt.filerev.summary[fileName].replace('\.tmp','');
    }

    // For each handlebar template
    view.forEach(function (file) {
      var contents = grunt.file.read(file, {encoding: 'utf8'});
      var hashRegex = new RegExp('(src|href)=\"\/(.*)(\.[0-9a-f]{8})(\.js|\.css)\"');
      var found;

      // For each file whos content was hashed
      for (var fileName in fileRev) {
        var fileRegex = new RegExp('(src|href)=\"' + fileName + '"');

        // Search for the file name in the template
        while (found = fileRegex.exec(contents)) {
          console.log("Replacing " + fileName + " in " + file);
          contents = contents.replace(fileName, fileRev[fileName])
        }

        // Write the new contents back into the file
        grunt.file.write(file, contents.replace(fileName, fileRev[fileName]));
      }
    });
  });

  grunt.registerTask('build', 'Build the project incuding the assets.', function() {
    grunt.task.run('clear');
    grunt.task.run('prepare_assets');
    grunt.task.run('filerev');
    grunt.task.run('asset_revision');
  });
};