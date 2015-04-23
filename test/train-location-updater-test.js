var TrainLocationUpdater = require('../lib/train-location-updater');
var trainLocationUpdater = new TrainLocationUpdater();

setTimeout(function() {
	trainLocationUpdater.start();
}, 5000);