var path    = require('path'),
    express = require('express.io'),
    exphbs  = require('express-handlebars'),
    common  = require(path.join(__dirname, '/backend/common.js')),
    config  = common.config();

// Create the express app
var app = express();
app.use(express.static(path.join(__dirname, '/.tmp/')));

// Load the router
var router = express.Router();
app.use('/', require('./backend/routes.js')(router));

var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main',

  // Uses multiple partials dirs
  partialsDir: [path.join(__dirname, '/backend/views/partials/')],
  layoutsDir: path.join(__dirname, '/backend/views/layouts/')
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/backend/views/'));

app.listen(config.port, function () {
  console.log("Server listening on 127.0.0.1:" + config.port);
});