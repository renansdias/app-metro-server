var GraphBuilder = require('../lib/graphbuilder');
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
		.exec(function(err, docs) {
			var graphBuilder = new GraphBuilder(docs, {nextStations: 'Array'});	
			var graph = graphBuilder.build();

			graph.print();
			console.log(docs);
		});
});