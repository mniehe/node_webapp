var gulp  = require('gulp');
var rimraf = require('rimraf');
var paths = require('../paths');

gulp.task('clean', function(cb) {
  rimraf(paths.output.root, cb);
});