var TrainLocationUpdater = require('../lib/train-location-updater');


setTimeout(function() {
	var trainLocationUpdater = new TrainLocationUpdater();
	trainLocationUpdater.start();
}, 15000);