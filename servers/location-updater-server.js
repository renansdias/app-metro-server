var TrainLocationUpdater = require('../lib/train-location-updater');

/**
 * options will be like:
 *
 * {
 *		port: 3000	 
 * }
 */
module.exports = function startLocationUpdaterScript(options) {
	var trainLocationUpdater = new TrainLocationUpdater(options.delay);

	trainLocationUpdater.start();

	console.log('Train Location Updater script is now running...');
}