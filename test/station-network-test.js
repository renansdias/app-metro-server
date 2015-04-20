var StationNetwork = require('../lib/station-network');
var sn = new StationNetwork();

setTimeout(function() {
	var path = sn.shortestPathBetween("0", "70");
	console.log(path);
	process.exit(0);
}, 5000);