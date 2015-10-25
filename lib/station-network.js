var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GraphBuilder = require('./graphbuilder');
var ShortestPath = require('./shortest-path');
var DepthFirstSearch = require('./dfs');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var StationNetwork = function() {

	/**
	 * The depth first search algorithm requires
	 * a source at which to start looking for a vertex.
	 * Since Sé station is pretty much in the center of
	 * the station network, we'll use it as source.
	 *
	 * NOTE: If Sé's ID ever change in the database,
	 * plase, change it here as well.
	 */
	this.sourceId = "1200";

	this.FORWARD = 'forward';
	this.BACKWARDS = 'backwards';

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
		var self = this;

		/*
		 * Database connection for this object.
		 */
		this.connection = mongoose.createConnection('mongodb://localhost:27017/appmetro');

		this.connection.once('open', function() {
			var nextStationSchema = new Schema({
				station: {type: Number, ref: 'Station'},
				weight: Number
			});

			var stationSchema = new Schema({
				_id: Number, 
				name: String, 
				location: Schema.Types.Mixed,
				nextStations: [nextStationSchema]
			});

			self.Station = self.connection.model('Station', stationSchema);
			self.Station
				.find({})
				.populate('nextStations.station')
				.exec(function(err, docs) {
					for (var i = 0; i < docs.length; i++) {
						docs[i] = docs[i]._doc;

						for (var j = 0; j < docs[i].nextStations.length; j++) {
							docs[i].nextStations[j] = docs[i].nextStations[j]._doc
						}
					}

					var graphBuilder = new GraphBuilder(docs, {nextStations: 'Array'});

					self.graph = graphBuilder.build();
					// self.graph.print();

					// Let the others know that the Graph
					// has already been built.
					self.emit('stationGraphWasBuilt');
				});
		});
	}

	this.shortestPathBetween = function(origin, destination) {
		var shortestPath = new ShortestPath(this.graph);
		var path = shortestPath.findShortestPathBetween(origin, destination);
		path.push(origin);
		path.reverse();

		return path;
	}

	this.getDirectionForClosestTrain = function(origin, destination) {
		if (origin === destination) throw new Error("Origin and destination cannot be the same station!");

		/*
		 * If the origin is the first or the last station on a line
		 * the train direction is not so obvious.
		 * So firstly, we'll determine whether or not the origin is
		 * the first or the last station on a a line.
		 *
		 * In order to do that, we'll need the origin's neighbours.
		 */
		var adj = this.graph.getAdjacencyList(origin);

		/*
		 * The neighbours array is not just the origin's neighbour ID (like, 60, 70 etc).
		 * It looks like the following:
		 * [{vertex: "60", weight: 1}, {vertex: "70", weight: 1}]
		 * So we first need to process this array and assemble a new array
		 * with only vertex IDs.
		 */
		var neighbours = [];
		for (var i = 0; i < adj.length; i++) {
			neighbours[i] = parseInt(adj[i].vertex);
		}

		/*
		 * Now, in order to know whether the origin is the first or last station
		 * this is how the following algorithm will work:
		 * 
		 * 1 - It'll add the origin to the neighbours array
		 * 2 - It'll sort the neighbours array
		 * 3 - It'll find out the index of the origin in the sorted neighbours array.
		 * 4 - If the origin's index is 0, it means it's the first station. Else,
		 *     if the origin's index has the same value of the array's length - 1,
		 *	   it means the origin is the last station. Else, it's in the middle.
		 */
		neighbours.push(parseInt(origin));
		neighbours.sort(function(x, y) {return x - y});
		var indexOfOrigin = neighbours.indexOf(parseInt(origin));

		/*
		 * Origin will be the first station if indexOfOrigin is 0.
		 * Else, if indexOfOrigin is equal to neighbours.length - 1,
		 * it'll be the last station. Else, it's in the middle.
		 *
		 * Now, if origin is the first station, then the train's direction
		 * should be backwards (because there won't be any train that
		 * will be located off of the line).
		 * Else, if the origin is the last station, then the train's direction
		 * should be forward. 
		 */
		if (indexOfOrigin === 0) {
			return this.BACKWARDS;
		} else if (indexOfOrigin === (neighbours.length - 1)) {
			return this.FORWARD;
		}


		/*
		 * The first thing we need to do is to get the
		 * shortest path between origin and destination.
		 */
		var path = this.shortestPathBetween(origin, destination);

		/*
		 * The direction is determined by the subtraction between
		 * the second position of the path and the first position
		 * of the path.
		 * If the second position has a greater value than the first
		 * position, it means the train is going forward. Otherwise,
		 * the train is going backwards.
		 *
		 * NOTE: the "numbers" in the path array are actually strings,
		 * so we need to convert them to numbers before performing
		 * the subtraction.
		 */
		var direction = parseInt(path[1]) - parseInt(path[0]);

		return (direction > 0) ? (this.FORWARD) : (this.BACKWARDS);
	}

	/**
	 * Gets the location and line of the given station (which is
	 * passed as a string.
	 */
	this.getStationWithStationId = function(station) {
		var dfs = new DepthFirstSearch(this.graph, this.sourceId);
		var vertex = dfs.getVertexWithVertexId(station);

		return vertex.content;
	}

	/**
	 * Gets the line on which the closest train should be.
	 */
	this.getStartLineForPath = function(origin, destination) {
		/*
		 * To get the line on which the closest train should be, 
		 * the algorithm will perform the following steps:
		 *
		 * 1 - It'll get the shortest path between origin and destination.
		 * 2 - If origin has more than one line, the chosen line will be
		 * 	   the one of the first element in the shortest path that belongs
		 * 	   to just one line. For instance, if we are at Sé and wish to go to
		 *	   República, there are two possible paths:
		 *		
		 *			a) Sé, Liberdade, ..., Paraíso, ..., Consolação, República
		 *			b) Sé, Anhangabaú and República.
		 *
		 *	   Evidently, the b) path is the shortest. Sé belongs to the red and blue line
		 *	   so we ignore it. Next station we'll look at is Anhangabaú. Anhangabaú belongs
		 *	   to only the red line. So we'll return the red line. If Anhangabaú belonged
		 *     to 2 lines, we'll keep looking until we ind a station that belongs to just one
		 *     line.
		 */
		var path = this.shortestPathBetween(origin, destination);
		var line = undefined;
		var found = false;

		for (var i = 0; (i < path.length) && (!found); i++) {
			var station = this.getStationWithStationId(path[i]);

			console.log(station);

			if (station._doc.lines.length === 1) {
				line = station._doc.lines[0];
				found = !found;
			}
		} 

		if (typeof line === 'undefined') throw new Error('Something went wrong, none of the stations in the path array belonged to any line!');

		return line;
	}

	this.getStations = function(callback) {
		var self = this;

		function getStationsInDatabase() {
			self.Station
				.aggregate([
					{"$unwind": "$lines"},
					{
						"$group": {
							_id: "$lines",
							stations: {
								"$addToSet": {
									_id: "$_id",
									name: "$name",
									location: "$location",
									nextStations: "$nextStations"
								}
							}
						}
					}
				])
				.exec(function(err, docs) {
					// Each doc has an _id that holds the entire object
					// of interest. So we'll remove this _id and return
					// just the doc wrapped by it.
					for (var i = 0; i < docs.length; i++) {
						docs[i] = docs[i]._id;
					}

					callback(err, docs);
				});
		}

		// First we need to make sure we still have a connection
		if (this.connection.readyState === 1) {
			getStationsInDatabase();
		}
	}

	this.getStationModel = function() {
		var stationSchema = new Schema({
			_id: Number, 
			name: String, 
			location: Schema.Types.Mixed,
			nextStations: [{type: Number, ref: 'Station'}]
		});

		return mongoose.model('Station', stationSchema);
	}

	this.print = function() {
		this.graph.print();
	}

	this.initialize();
}

util.inherits(StationNetwork, EventEmitter);

module.exports = StationNetwork;