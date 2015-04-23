var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TrainSystem = require('./train-system');

module.exports = function TrainLocationUpdater(delay) {
	this.delay = delay || 5000;
	this.trainSystem = new TrainSystem();

	this.start = function() {
		var trainSchema = new Schema({
			_id: Number,
			location: Schema.Types.Mixed
		});

		var Train = mongoose.model('Train', trainSchema);
		var self = this;

		mongoose.connect('mongodb://localhost:27017/appmetro');

		mongoose.connection.once('open', function() {
			function updateTrainsLocation() {
				Train
					.find({})
					.exec(function(err, docs) {
						var bulk = Train.collection.initializeUnorderedBulkOp();

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