var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var MongoOplog = require('mongo-oplog');
var oplog = MongoOplog('mongodb://localhost:27017/local', 'appmetro.trains').tail();

global.trainId;

var locationChangeDetector = function createLocationChangeDetectorServer(options) {
	var port = options.port || 3812;

	server.listen(port, function() {
		console.log('Location change detector server is running on port ' + port);
	});

	io.on('connection', function(socket) {
		console.log('There is a new connection!!!');

		socket.on('trackTrain', function(trainId) {
			global.trainId = trainId;
			console.log('Tracking trainId: ' + global.trainId);
			
			oplog.on('update', function(doc) {
				if (doc.o2._id === global.trainId) {
					console.log('EMITTING EVENT TO TRAIN ID: ' + trainId);

					var latitude = doc.o['$set']['location.latitude'];
					var longitude = doc.o['$set']['location.longitude'];
					socket.emit('trainLocationUpdate', latitude, longitude);
				}
			});
		});

		// socket.on('disconnect', function() {
		// 	// oplog.stop();
		// 	console.log('Connection CLOSED!!!');
		// 	socket.removeAllListeners();
		// });
	});
}

module.exports = locationChangeDetector;