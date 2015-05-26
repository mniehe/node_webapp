var gulp = require('gulp');
var paths = require('../paths');
var eslint = require('gulp-eslint');

// ESLint task definitions for the backend
gulp.task('lint:backend', function() {
  return gulp.src(paths.backend.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint:backend:nofail', function() {
  return gulp.src(paths.backend.source)
    .pipe(eslint())
    .pipe(eslint.format());
});


// ESLint task definitions for the frontend
gulp.task('lint:frontend', function() {
  return gulp.src(paths.frontend.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint:frontend:nofail', function() {
  return gulp.src(paths.frontend.source)
    .pipe(eslint())
    .pipe(eslint.format());
});