var path = require('path');
var pack = require('../../package.json');

var root = {
  backend: 'backend/',
  frontend: 'frontend/',
  output: 'dist/'
};

module.exports = {
  frontend: {
    source: root.frontend + 'js/**/*.js',
    html: root.frontend + 'js/**/*.html',
    styles: root.frontend + 'scss/**/*.scss',
    images: root.frontend + 'img/**/*.{png,jpg,jpeg,bmp,svg,gif,ico}',
    jspmConfig: pack.jspm.configFile
  },
  
  backend: {
    source: root.backend + '**/*.js'
  },
  
  output: {
    source: root.output + 'js',
    styles: root.output + 'css',
    images: root.output + 'img'
  }
};
