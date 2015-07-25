require('dotenv').load();

var koa         = require('koa'),
    betterBody  = require('koa-better-body'),
    validate    = require('koa-validate'),
    logger      = require('koa-logger'),
    staticFiles = require('koa-static'),
    Routes      = require('require-dir')('./backend/controllers'),
    DB          = require('./config/database');
    
var isTest = (process.env.NODE_ENV === 'test') ? true : false;
    
var app = koa();

if (!isTest) {
    app.use(logger());
}

// Load all the default middleware
app.use(betterBody());
app.use(require('koa-validate')());
app.use(staticFiles('./dist'));

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