var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/appmetro');
var conn = mongoose.connection;

conn.once('open', function() {
	mongoose.model('Station', {
		_id: Number, 
		name: String, 
		location: Schema.Types.Mixed,
		nextStations: [{type: Number, ref: 'Station'}]
	});

	mongoose.model('Station')
		.find({})
		.populate('nextStations')
		.exec(function(err, cols) {
			console.log(cols);		
		});
});