var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var MongoOplog = require('mongo-oplog');
var oplog = MongoOplog('mongodb://localhost:27017/local', 'appmetro.trains').tail();

var locationChangeDetector = function createLocationChangeDetectorServer(options) {
	var port = options.port || 3812;

	server.listen(port, function() {
		console.log('Location change detector server is running on port ' + port);
	});

	io.on('connection', function(socket) {
		socket.on('trackTrain', function(trainId) {
			console.log('Tracking trainId: ' + trainId);
			
			oplog.on('update', function(doc) {
				if (doc.o2._id === trainId) {
					var latitude = doc.o['$set']['location.latitude'];
					var longitude = doc.o['$set']['location.longitude'];
					socket.emit('trainLocationUpdate', latitude, longitude);
				}
			});
		});
	});
}

module.exports = locationChangeDetector;