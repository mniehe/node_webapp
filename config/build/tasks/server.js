var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', function () {
  
  nodemon({
    script: 'app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    ignore: ['config/*', 'frontend/*', 'node_modules/*', 'test/*']
  });
});