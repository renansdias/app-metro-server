var StationNetwork = require('../lib/station-network');
var TrainSystem = require('../lib/train-system');

var stationNetwork = new StationNetwork();
var trainSystem = new TrainSystem(stationNetwork);

stationNetwork.on('graphBuilt', function() {
	console.log('Graph was BUILT!!!!');

	var train = {
		location: {
			latitude: -23.549373,
			longitude: -46.623757
		},
		direction: 'forward'
	};

	var ret = trainSystem.getNextLocationForTrain(train);

	console.log('Returned location index: ' + ret);

	trainSystem.getClosestTrainTo("0", "10");
});