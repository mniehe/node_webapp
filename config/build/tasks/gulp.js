var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence('server', 'watch', 'browserSync', cb);
});

gulp.task('build', function() {
  runSequence(
    'clean',
    ['lint:frontend', 'lint:backend'],
    ['build:js', 'build:images', 'build:sass', 'copy:jspm_config', 'copy:html']
  );
});