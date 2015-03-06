// flightplan.js
var flights = require(process.cwd() + '/lib/flightplan'),
    plan    = flights.Flightplan;

flights.new('default', ['setup_remote_folders', 'test2']);