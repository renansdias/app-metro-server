var Vertex = require('../lib/vertex');
var Graph = require('../lib/graph');
var ShortestPath = require('../lib/shortest-path');
var graph = new Graph();

var corinthiansItaquera = new Vertex('corinthiansItaquera', {
	name: 'Corinthians Itaquera',
	location: {
		latitude: 23.456,
		longitude: 46.1234
	}
});

var se = new Vertex('se', {
	name: 'Sé',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var belem = new Vertex('belem', {
	name: 'belem',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var bras = new Vertex('bras', {
	name: 'bras',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var luz = new Vertex('luz', {
	name: 'luz',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var carrao = new Vertex('carrao', {
	name: 'Carrão',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var tatuape = new Vertex('tatuape', {
	name: 'Tatuapé',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

var paraiso = new Vertex('paraiso', {
	name: 'Paraiso',
	location: {
		latitude: 22.456,
		longitude: 42.1234
	}
});

graph.addEdge(corinthiansItaquera, belem, 3);
graph.addEdge(corinthiansItaquera, se, 4);
graph.addEdge(belem, se, 5);
graph.addEdge(se, bras, 7);
graph.addEdge(bras, luz, 9);
graph.addEdge(bras, carrao, 11);
graph.addEdge(luz, tatuape, 6);
graph.addEdge(carrao, tatuape, 10);
graph.addEdge(tatuape, paraiso, 8);

graph.print();

setTimeout(function() {
	var dijkstra = new ShortestPath(graph);
	var path = dijkstra.findShortestPathBetween(corinthiansItaquera.vertexId, paraiso.vertexId);
	path.push(corinthiansItaquera.vertexId);
	path.reverse();
	console.log(path);
}, 0);