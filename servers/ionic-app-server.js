var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, '../client/')));

var createIonicAppServer = function(options) {
	var port = options.port || 4800;

	app.listen(port, function() {
		console.log('Ionic app server is running on port ' + port);
	});
};

module.exports = createIonicAppServer;