var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GraphBuilder = require('./graphbuilder');
var DepthFirstSearch = require('./dfs');

module.exports = function StationNetwork() {
	/**
	 * The depth first search algorithm requires
	 * a source at which to start looking for a vertex.
	 * Since Sé station is pretty much in the center of
	 * the station network, we'll use it as source.
	 *
	 * NOTE: If Sé's ID ever change in the database,
	 * plase, change it here as well.
	 */
	this.sourceId = "50";

	/**
	 * This function grabs the station collection from
	 * our database and build the graph that this collection
	 * represents.
	 */
	this.initialize = function() {
		// Inside mongoose.connection.once, we lose the reference
		// to the StationNetwork instance. Inside once(), 
		// this refers to the mongoose.connection context.
		// Since we need to attach the variable Station to 
		// a StationNetwork instace, we need to store "this"
		// in a variable.
		var that = this;

		mongoose.connect('mongodb://localhost:27017/appmetro');
		mongoose.connection.once('open', function() {
			var stationSchema = new Schema({
				_id: Number, 
				name: String, 
				location: Schema.Types.Mixed,
				nextStations: [{type: Number, ref: 'Station'}]
			});

			that.Station = mongoose.model('Station', stationSchema);
			that.Station
				.find({})
				.populate('nextStations')
				.exec(function(err, docs) {
					var graphBuilder = new GraphBuilder(docs, {nextStations: 'Array'});

					that.graph = graphBuilder.build();
					that.graph.print();
				});
		});
	}

	this.shortestPathBetween = function(origin, destination) {
		
	}

	this.print = function() {
		that.graph.print();
	}

	this.initialize();
}