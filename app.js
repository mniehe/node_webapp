var path   = require('path'),
    Hapi   = require('hapi'),
    routes = require(path.join(process.cwd(), '/backend/routes.js'));

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
});

// Setup Good config for Hapi
var goodConfig = {
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: [{ log: '*', response: '*' , request: '*'}]
    }]
  }
};

// Register the default route that will dump the index file
server.route({
  method: 'GET',
  path:'/',
  handler: function (request, reply) {
    reply.file(path.join(process.cwd(), '/backend/views/index.html'));
  }
});

// Serve static files
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join(process.cwd(), '/dist'),
    }
  }
});

// Load the rest of the routes
server.route(routes);

// Register the Good config that we setup
server.register(goodConfig, function(err) {
  if (err) {
    console.error(err);
  }
});

// Start the server
server.start(function (err)  {
  console.log("Server started at", server.info.uri);
});