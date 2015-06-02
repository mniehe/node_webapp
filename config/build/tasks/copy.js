var gulp = require('gulp');
var paths = require('../paths');
var gulpCopy = require('gulp-copy');
var changed = require('gulp-changed');

gulp.task('copy:jspm_config', function () {
  return gulp.src(paths.frontend.jspmConfig)
    .pipe(gulpCopy('dist', { prefix: 1 }));
});

gulp.task('copy:html', function() {
  return gulp.src(paths.frontend.html)
    .pipe(changed(paths.output.source, {extension: '.html'}))
    .pipe(gulp.dest(paths.output.source));
});

gulp.task('copy:font:materialize', function() {
  return gulp.src(paths.library.materialize + 'font/**/*.{ttf,eot,svg,woff}')
    .pipe(gulpCopy(paths.output.fonts, { prefix: 3 }));
});

gulp.task('copy:font', ['copy:font:materialize']);
gulp.task('copy', [
  'copy:font',
  'copy:jspm_config',
  'copy:html'
]);