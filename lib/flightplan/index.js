"use strict";

var fs       = require("fs"),
    path     = require("path"),
    basename = path.basename(module.filename),
    plan     = require('flightplan'),
    config   = require(__dirname + '/../../config/config.json');

// Get the list of servers from the config
for (var i = 0; i < config.servers.length; i++) {
  var server = config.servers[i];

  // Setup the server agent to the unix SSH socket
  if (server.agent == "ssh") {
    server.agent = process.env.SSH_AUTH_SOCK;
  } else {
    console.log(server.name + ": Server agent must be 'ssh'");
    return;
  }

  plan.target(server.name, server, server.options);
}

var setup = (function(fs, plan) {
  var flights  = {};

  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function(file) {
      var flight = require(__dirname + '/' + file);
      flights[flight.name] = flight;
    });

  return {
    new: function(planName, functionList) {

      // If the list is a single item, force it into an array
      if (!Array.isArray(functionList)) {
        var temp = functionList;
        functionList = new Array();
        functionList.push(temp);
      }

      // For each function in the list
      for(var i = 0; i < functionList.length; i++) {
        var func = flights[functionList[i]];

        // Add it to the appropriate list
        switch (func.type) {
          case 'local':
            plan.local(planName, func.plan);
            console.log('Added',func.name,'as local to',planName);
            break;

          case 'remote':
            plan.local(planName, func.plan);
            console.log('Added',func.name,'as remote to',planName);
            break;
        }


      }
    }
  }
})(fs, plan);

module.exports = {
  Flightplan: plan,
  new: setup.new
};