var StationNetwork = require('../lib/station-network');
var TrainSystem = require('../lib/train-system');

var stationNetwork = new StationNetwork();
var trainSystem = new TrainSystem(stationNetwork);	

stationNetwork.on('graphBuilt', function() {
	console.log('Graph was BUILT!!!!');

	setTimeout(function() {
		trainSystem.getClosestTrainTo("1722", "2205", function(train) {
			console.log(JSON.stringify(train));
			process.exit(0);
		});
	}, 0);
});