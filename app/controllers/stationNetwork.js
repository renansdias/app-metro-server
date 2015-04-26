var shortestPath = function(req, res) {
	var origin = req.query.origin;
	var destination = req.query.destination;

	var path = stationNetwork.shortestPathBetween(origin, destination);

	res.status(200).set('Access-Control-Allow-Origin', 'http://localhost:8100').json(path);
};

var getStations = function(req, res) {
	stationNetwork.getStations(function(err, docs) {
		if (err) res.json(err);

		res.json(docs);
	});
}

module.exports = function(app) {
	var stationNetworkController = {
		shortestPath: shortestPath,
		getStations: getStations
	};

	return stationNetworkController;
}