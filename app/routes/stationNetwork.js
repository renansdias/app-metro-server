module.exports = function(app) {
	var stationNetworkController = app.controllers.stationNetwork;

	app.get('/stations', stationNetworkController.getStations);
	app.get('/stations/shortest-path', stationNetworkController.shortestPath);
}