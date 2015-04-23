setTimeout(function() {
	var StationNetwork = require('../lib/station-network');
	var TrainSystem = require('../lib/train-system');

	var stationNetwork = new StationNetwork();
	var trainSystem = new TrainSystem(stationNetwork);	

	stationNetwork.on('graphBuilt', function() {
		console.log('Graph was BUILT!!!!');

		// var train = {
		// 	line: 'red',
		// 	location: {
		// 		latitude: -23.525756,
		// 		longitude: -46.665792
		// 	},
		// 	direction: 'forward'
		// };

		// var ret = trainSystem.getNextLocationForTrain(train);

		// console.log('Next Latitude: ' + ret.location.latitude);
		// console.log('Next Longitude: ' + ret.location.longitude);
		// console.log('Next Direction: ' + ret.direction);

		setTimeout(function() {
			trainSystem.getClosestTrainTo("500", "1700", function(train) {
				console.log(JSON.stringify(train));
				process.exit(0);
			});
		}, 5000);
	});
}, 10000);