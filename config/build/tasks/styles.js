var gulp = require('gulp');
var paths = require('../paths');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var sassOptions = require('../sass_options');

// Build a development version of the sass files
gulp.task('build:sass', function() {
  return gulp.src(paths.frontend.styles)
    .pipe(changed(paths.output.styles))
    .pipe(sass(sassOptions.dev).on('error', sass.logError))
    .pipe(gulp.dest(paths.output.styles));
});