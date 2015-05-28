var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');
var lintOptions = require('../eslint_options');

// ESLint task definitions for the backend
gulp.task('lint:backend', function() {
  return gulp.src(paths.backend.source)
    .pipe(eslint(lintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:backend:nofail', function() {
  return gulp.src(paths.backend.source)
    .pipe(eslint(lintOptions))
    .pipe(eslint.format());
});


// ESLint task definitions for the frontend
gulp.task('lint:frontend', function() {
  return gulp.src(paths.frontend.source)
    .pipe(eslint(lintOptions))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:frontend:nofail', function() {
  return gulp.src(paths.frontend.source)
    .pipe(eslint(lintOptions))
    .pipe(eslint.format());
});

// ESLint everything
gulp.task('lint', ['lint:frontend', 'lint:backend']);
gulp.task('lint:nofail', ['lint:frontend:nofail', 'lint:backend:nofail']);