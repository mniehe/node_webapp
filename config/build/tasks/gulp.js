var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence('server', 'watch', 'browserSync', cb);
});