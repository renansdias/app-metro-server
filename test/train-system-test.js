var TrainSystem = require('../lib/train-system');
var trainSystem = new TrainSystem();

var train = {
	location: {
		latitude: -23.549373,
		longitude: -46.623757
	},
	direction: 'forward'
};

var ret = trainSystem.getNextLocationForTrain(train);

console.log('Returned location index: ' + ret);

trainSystem.getClosestTrainTo("0", "70");