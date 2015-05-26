var gulp = require('gulp');
var paths = require('../paths');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel_options');
var assign = Object.assign || require('object.assign');

gulp.task('build:js', function() {
  return gulp.src(paths.frontend.source)
    .pipe(changed(paths.output.source))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.output.source));
});