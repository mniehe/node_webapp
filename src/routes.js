module.exports = function(router) {

  router.get('/', function index(req, res) {
    var data = {title: 'Your first title'};
    res.render('index', data);
  });
  
  return router;
}