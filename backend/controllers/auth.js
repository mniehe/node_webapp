var AuthRoutes = require('koa-router')({
  prefix: '/api/v1/auth'
});

AuthRoutes.post('/', login);

function *login() {
	this.status = 200;
	this.body = 'example login route';
}

module.exports = AuthRoutes.routes();
