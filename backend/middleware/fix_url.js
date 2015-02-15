// This middleware will strip the trailing .html and / from
// any URLs submitted.

module.exports = function(req, res, next) {
  var url = req.path;
  var params = req.originalUrl.replace(url, '');
  var redirect = false;

  // If .html is found
  if (url.indexOf('.html') >= 0) {
    url = url.replace('.html','')
    url = url.replace('index','');
    redirect = true;
  }

  // Test for a trailing slash
  var results = /(.{1,})\/$/.exec(url);

  if (results) {
    url = results[1];
    redirect = true;
  }

  // If either problems were found, return a permanent redirect
  if (redirect) {
    res.redirect(301, url + params);
    res.end();
  } else {
    next();
  }
};