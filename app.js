var koa         = require('koa'),
    betterBody  = require('koa-better-body'),
    router      = require('koa-router'),
    validate    = require('koa-validate'),
    logger      = require('koa-logger'),
    staticFiles = require('koa-static'),
    Mongoose    = require('./config/database');
    
var isTest = (process.env.NODE_ENV === 'test') ? true : false;
    
var app = koa();

if (!isTest) {
    app.use(logger());
}

app.use(betterBody());
app.use(staticFiles('./dist'));

if (!isTest) {
    app.listen(3000);
    console.log("Listening on 3000");
}

module.exports = app;