var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainSchema = new Schema({
	_id: Number,
	location: Schema.Types.Mixed
});

var Train = mongoose.model('Train', trainSchema);

mongoose.connect('mongodb://localhost:27017/appmetro');

mongoose.connection.once('open', function() {
	function updateTrainsLocation() {
		Train
			.find({})
			.exec(function(err, docs) {
				var bulk = Train.collection.initializeUnorderedBulkOp();

				for (var i = 0; i < docs.length; i++) {
					var train = docs[i];

					var latitude = train.location.latitude + 1;
					var longitude = train.location.longitude + 1;
					var findQuery = {_id: train._id};
					var updateQuery = {$set: {"location.latitude": latitude, "location.longitude": longitude}};
					
					bulk.find(findQuery).update(updateQuery);
				}

				bulk.execute(function() {
					console.log('Finished!');
				});
			});

	}

	setInterval(function() {
		updateTrainsLocation();
	}, 5000);
});