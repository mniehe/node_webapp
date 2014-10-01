var express = require('express.io'),
    exphbs  = require('express-handlebars');

// Create the express app
var app = express();
app.use(express.static('public/'));

// Load the router
var router = express.Router();
app.use('/', require('./routes.js')(router));

var hbsOptions = {
  extname: '.hbs',
  defaultLayout: 'main',

  // Add multiple partial directories to this array
  partialsDir: ['views/partials/']
}

var hbs = exphbs.create(hbsOptions);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.listen(3000, function () {
  console.log("Server listening on 127.0.0.1:3000");
});

