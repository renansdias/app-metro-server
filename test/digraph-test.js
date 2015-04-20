var Digraph = require('../lib/digraph');
var Vertex = require('../lib/vertex');
var digraph = new Digraph();

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

digraph.addEdge(vertex1, vertex3, 10);
digraph.addEdge(vertex1, vertex2, 13);
digraph.addEdge(vertex3, vertex2, 20);
digraph.addEdge(vertex2, vertex4, 54);

digraph.print();