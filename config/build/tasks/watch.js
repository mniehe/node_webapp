var gulp = require('gulp');
var paths = require('../paths');

gulp.task('watch', ['build:js', 'build:sass', 'build:images', 'copy:jspm_config'], function() {
  gulp.watch(paths.frontend.source, ['build:js']);
  gulp.watch(paths.frontend.styles, ['build:sass']);
  gulp.watch(paths.frontend.images, ['build:images']);
  gulp.watch(paths.frontend.jspmConfig, ['copy:jspm_config']);
});