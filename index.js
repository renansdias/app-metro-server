var path = require('path');
var express = require('express');
var load = require('express-load');
var app = express();
var server = require('http').createServer(app);

// *************************
//     S E R V E R S
// *************************
var createLocationChangeDetectorServer = require('./servers/location-change-detector-server');
var createIonicAppServer = require('./servers/ionic-app-server');


var StationNetwork = require('./lib/station-network');
global.stationNetwork = new StationNetwork();

/*
 * Before we move on to set up our server, we need to make sure that
 * our station graph was built. The stationNetwork object will have to be
 * accessible throughout the app (so the graph is built just once).
 */
stationNetwork.on('stationGraphWasBuilt', function() {
	console.log('Station Graph was built!');

	load('models', {cwd: 'app'})
		.then('controllers', {cwd: 'app'})
		.then('routes', {cwd: 'app'})
		.into(app);

	// Create the location change detector server
	createLocationChangeDetectorServer({
		port: 3812
	});

	server.listen(3700, function() {
		console.log('Main server is running on port ' + 3700);
	});
});

/**
 * Calling this function will start the ionic app server, which
 * means we'll be able to access the ionic app without running
 * ionic serve.
 */
createIonicAppServer({
	port: 4800
});