var express = require('express.io'),
    exphbs  = require('express-handlebars');

var app = express();
var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',

  // Uses multiple partials dirs
  partialsDir: ['views/partials/']
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static('public/'));


app.get('/', function (req, res) {
  var data = {title: 'Your first title'};
  res.render('index', data);
});

app.listen(3000, function () {
  console.log("Server listening on 127.0.0.1:3000");
});