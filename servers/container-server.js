var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, '../../container')));

var createContainerServer = function(options) {
	var port = options.port || 3100;

	app.listen(port, function() {
		console.log('Container website is running on port ' + port);
	});
};

module.exports = createContainerServer;