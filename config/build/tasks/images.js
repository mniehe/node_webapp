var gulp = require('gulp');
var paths = require('../paths');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('build:images', function () {
  return gulp.src(paths.frontend.images)
    .pipe(changed(paths.output.images))
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.output.images));
});