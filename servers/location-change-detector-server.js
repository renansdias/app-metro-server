var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var locationChangeDetector = function createLocationChangeDetectorServer(options) {
	var port = options.port || 3812;

	server.listen(this.port, function() {
		console.log('Location change detector server is running on port ' + port);
	});
}

module.exports = locationChangeDetector;