module.exports = function(app) {
	var trainSystemController = app.controllers.trainSystem;

	app.get('/trains/closest', trainSystemController.closestTrain);
}