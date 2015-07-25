require('dotenv').load();

var koa         = require('koa'),
    betterBody  = require('koa-better-body'),
    validate    = require('koa-validate'),
    logger      = require('koa-logger'),
    staticFiles = require('koa-static'),
    router      = require('koa-router')(),
    views       = require('koa-render'),
    underscore  = require('underscore'),
    Routes      = require('require-dir')('./backend/controllers'),
    DB          = require('./config/database');
    
var isTest = (process.env.NODE_ENV === 'test') ? true : false;
    
var app = koa();

if (!isTest) {
    app.use(logger());
}

// Load all the default middleware
app.use(views('./backend/views', {
  map: {
    html: 'underscore'
  }
}));

app.use(betterBody());
app.use(require('koa-validate')());
app.use(staticFiles('./dist'));

// Set the default route to load the index file
router.get('/', function *() {
    console.log
    this.body = yield this.render('index.html'); 
});
app.use(router.routes());

// Parse the middleware folder for routers and load if necessary
for (var route in Routes) {
    
    if (Routes[route].router !== undefined) {
        app.use(Routes[route]);   
    }
}

if (!isTest) {
    app.listen(3000);
    console.log("Listening on 3000");
}

module.exports = app;