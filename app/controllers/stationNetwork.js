var shortestPath = function(req, res) {
	var origin = req.query.origin;
	var destination = req.query.destination;

	var path = stationNetwork.shortestPathBetween(origin, destination);

	res.status(200).json(path);
};

module.exports = function(app) {
	var stationNetworkController = {
		shortestPath: shortestPath
	};

	return stationNetworkController;
}