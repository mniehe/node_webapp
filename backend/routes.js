var fix_url = require(__dirname + '/middleware/fix_url.js');

module.exports = function(router) {

  router.use(fix_url);

  router.get('/', function index(req, res) {
    var data = {title: 'Your first title'};
    res.render('index', data);
  });

  router.get('*', function(req, res){
    res.status(404);
    res.send('Page not found');
    //res.status(404).render('404_error_template', {title: "Sorry, page not found"});
  });

  return router;
}