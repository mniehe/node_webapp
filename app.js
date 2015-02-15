// Load all the common functions
var common = require(__dirname + '/backend/common.js');

// Load the config settings file
var config = common.config();

var express = require('express.io'),
    exphbs  = require('express-handlebars');

// Create the express app
var app = express();
app.use(express.static(__dirname + '/.tmp/'));

// Load the router
var router = express.Router();
app.use('/', require('./backend/routes.js')(router));

var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',

  // Uses multiple partials dirs
  partialsDir: [__dirname + '/backend/views/partials/'],
  layoutsDir: __dirname + '/backend/views/layouts/'
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/backend/views/');

app.listen(config.port, function () {
  console.log("Server listening on 127.0.0.1:" + config.port);
});