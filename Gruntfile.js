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
          'assets/js/vendor/*.js',
          'assets/js/*.js',
        ],
        dest: '.tmp/js/main.concat.js',
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
        src: '.tmp/**/*.{css,js}'
      }
    },

    compass: {                  // Task
      watch: {                   // Target
        options: {              // Target options
          sassDir: 'assets/scss',
          cssDir: '.tmp/css',
          config: 'config/dev_config.rb'
        }
      },

      prod: {                   // Target
        options: {              // Target options
          sassDir: 'assets/scss',
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
          cwd: 'assets/img/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,ico}'],   // Actual patterns to match
          dest: '.tmp/img/'       // Destination path prefix
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
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
  grunt.loadNpmTasks('grunt-filerev');

  grunt.registerTask('default', [
    'clear',
    'compass:watch',
    'concat',
    'watch'
  ]);

  grunt.registerTask('prepare_assets', [
    'compass:prod',
    'concat',
    'uglify',
    'imagemin'
  ]);

  grunt.registerTask('clear', 'Deletes all old copies of the assets.', function() {
    var oldFiles = grunt.file.expand('.tmp/**/*.{js,css}');

    oldFiles.forEach(function (file) {
      grunt.file.delete(file);
    });
  });

  grunt.registerTask('clear', 'Deletes all old copies of the assets.', function() {
    // Get a list of all css and js files that have been compiled
    var oldFiles = grunt.file.expand('.tmp/**/*.{js,css}');

    // Get a list of all handlebar files
    var view = grunt.file.expand('src/views/**/*.hbs');

    // For each file found, delete it
    oldFiles.forEach(function (file) {
      grunt.file.delete(file);
    });

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
    var view = grunt.file.expand('src/views/**/*.hbs');
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