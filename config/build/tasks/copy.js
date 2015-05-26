var gulp = require('gulp');
var paths = require('../paths');
var gulpCopy = require('gulp-copy');

gulp.task('copy:jspm_config', function () {
  return gulp.src(paths.frontend.jspmConfig)
    .pipe(gulpCopy('dist', { prefix: 1 }));
});