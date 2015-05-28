var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence('clean', 'server', 'watch', 'browserSync', cb);
});

gulp.task('build', function() {
  runSequence(
    'clean',
    'lint',
    ['build:js', 'build:images', 'build:sass', 'copy:jspm_config']
  );
});