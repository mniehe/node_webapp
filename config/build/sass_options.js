var includes = [
  './node_modules/materialize-sass/sass'
];

var devOptions = {
  includePaths: includes,
  sourceMap: true,
  sourceComments: true,
  outputStyle: 'nested'
};

var prodOptions = {
  includePaths: includes,
  outputStyle: 'compressed',
  sourceMap: false
};

module.exports = {
  dev: devOptions,
  prod: prodOptions
};