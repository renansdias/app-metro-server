var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TrainSystem = require('./train-system');

module.exports = function TrainLocationUpdater(delay) {
	mongoose.connect('mongodb://localhost:27017/appmetro');

	this.delay = delay || 2000;
	this.trainSystem = new TrainSystem();

	this.connection = mongoose.connection;
	this.Train = mongoose.model('Train');

	this.start = function() {
		var self = this;

		this.connection.once('open', function() {
			function updateTrainsLocation() {
				self.Train
					.find({})
					.exec(function(err, docs) {
						var bulk = self.Train.collection.initializeUnorderedBulkOp();

						for (var i = 0; i < docs.length; i++) {
							var train = docs[i].toObject();

							/*
							 * result will be like:
							 *
							 * {
							 *  	location: {
							 *			latitude: <NEW_LATITUDE>,
							 *			longitude: <NEW_LONGITUDE>
							 *		},
							 *		direction: <NEW_DIRECTION>
							 * }
							 */
							var result = self.trainSystem.getNextLocationForTrain(train);

							console.log("Train ID: " + train._id);
							console.log("New Location: (" + result.location.latitude + ", " + result.location.longitude + ")");
							console.log("New Direction: " + result.direction);
							console.log();
							console.log();

							var findQuery = {_id: train._id};
							var updateQuery = {
								$set: {
									"location.latitude": result.location.latitude, 
									"location.longitude": result.location.longitude,
									"direction": result.direction
								}
							};
							
							bulk.find(findQuery).update(updateQuery);
						}

						bulk.execute(function() {

						});
					});

			}

			setInterval(function() {
				updateTrainsLocation();
			}, self.delay);
		});
	}
}