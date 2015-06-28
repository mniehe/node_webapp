var supertest = require('co-supertest'),
    App       = require('../app'),
	Database  = require('../config/database');
	
var request = supertest.agent(App.listen());

afterEach(function *() {
	Database.connection.db.dropDatabase();
});

module.exports = {
	request: request,
	Database: Database
}