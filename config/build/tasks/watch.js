var gulp = require('gulp');
var paths = require('../paths');

gulp.task('watch', [
    'build:js:dev', 
    'build:sass', 
    'build:images', 
    'copy'
  ], 
  function() {
  gulp.watch(paths.frontend.source, ['build:js:dev']);
  gulp.watch(paths.frontend.styles, ['build:sass']);
  gulp.watch(paths.frontend.images, ['build:images']);
  gulp.watch(paths.frontend.jspmConfig, ['copy:jspm_config']);
  gulp.watch(paths.frontend.html, ['copy:html']);
});