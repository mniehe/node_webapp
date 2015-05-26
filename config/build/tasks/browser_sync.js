var gulp        = require('gulp');
var paths       = require('../paths');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "localhost:" + (process.env.PORT || 3000),
        port: 8000,
        
        // Do not up a browser on startup
        open: false,
        
        // Auto inject changes to CSS and JS into the browser
        injectChanges: true,
        
        // Do not minify changes when uploading to browser
        minify: false,
        
        // Watch the CSS and JS files in the output folder
        files: [paths.output.source, paths.output.styles],
        
        ui: {
          port: 8080
        }
    });
});