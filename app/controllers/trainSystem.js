var TrainSystem = require('../../lib/train-system');
var trainSystem = new TrainSystem(stationNetwork);

var closestTrain = function(req, res) {
	var origin = req.query.origin;
	var destination = req.query.destination;

	trainSystem.getClosestTrainTo(origin, destination, function(train) {
		res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:4800').json(train);
	});
}

module.exports = function(app) {
	var trainSystemController = {
		closestTrain: closestTrain
	};

	return trainSystemController;
}