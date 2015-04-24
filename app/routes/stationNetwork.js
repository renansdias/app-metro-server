module.exports = function(app) {
	var stationNetworkController = app.controllers.stationNetwork;

	app.get('/network/shortest-path', stationNetworkController.shortestPath);
}