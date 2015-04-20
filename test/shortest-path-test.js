var Vertex = require('../lib/vertex');
var Graph = require('../lib/graph');
var ShortestPath = require('../lib/shortest-path');
var graph = new Graph();

var vertex1 = new Vertex('corinthiansItaquera', {
	name: 'Corinthians Itaquera',
	location: {
		latitude: 23.456,
		longitude: 46.1234
	}
});

var vertex2 = new Vertex('se', {
	name: 'Sé',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var vertex3 = new Vertex('belem', {
	name: 'belem',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var vertex4 = new Vertex('bras', {
	name: 'bras',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

graph.addEdge(vertex1, vertex3, 1);
graph.addEdge(vertex1, vertex2, 1);
graph.addEdge(vertex3, vertex2, 1);
graph.addEdge(vertex2, vertex4, 1);

graph.print();

setTimeout(function() {
	var dijkstra = new ShortestPath(graph);
	var path = dijkstra.findShortestPathBetween(vertex1.vertexId, vertex4.vertexId);
	path.push(vertex1.vertexId);
	path.reverse();
	console.log(path);
}, 0);