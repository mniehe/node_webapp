var UserRoutes = require('koa-router')({
  prefix: '/api/v1/user'
});

UserRoutes.post('/', createUser);

function *createUser() {
  this.status = 200;
  this.body = 'create a user example route';
}

module.exports = UserRoutes.routes();