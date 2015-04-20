var Graph = require('../lib/graph');
var Vertex = require('../lib/vertex');
var graph = new Graph();

setTimeout(function() {
	var vertex1 = new Vertex('corinthiansItaquera', {
		name: 'Corinthians Itaquera',
		location: {
			latitude: 23.456,
			longitude: 46.1234
		}
	});

	var vertex2 = new Vertex('arthurAlvim', {
		name: 'Arthur Alvim',
		location: {
			latitude: 24.456,
			longitude: 45.12345
		}
	});

	var vertex3 = new Vertex('patriarca', {
		name: 'Patriarca',
		location: {
			latitude: 26.456,
			longitude: 49.1234
		}
	});

	var vertex4 = new Vertex('vilaMatilde', {
		name: 'Vila Matilde',
		location: {
			latitude: 21.456,
			longitude: 41.1234
		}
	});

	var vertex5 = new Vertex('penha', {
		name: 'Penha',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex6 = new Vertex('se', {
		name: 'Sé',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex7 = new Vertex('belem', {
		name: 'belem',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex8 = new Vertex('bras', {
		name: 'bras',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex9 = new Vertex('luz', {
		name: 'luz',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex10 = new Vertex('marechal', {
		name: 'marechal',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex11 = new Vertex('anaRosa', {
		name: 'Ana Rosa',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex12 = new Vertex('ipiranga', {
		name: 'ipiranga',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex13 = new Vertex('paraiso', {
		name: 'paraiso',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex14 = new Vertex('sacoma', {
		name: 'sacoma',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex15 = new Vertex('liberdade', {
		name: 'liberdade',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	var vertex16 = new Vertex('pedroII', {
		name: 'Pedro II',
		location: {
			latitude: 22.456,
			longitude: 42.1234
		}
	});

	graph.addEdge(vertex1, vertex2);
	graph.addEdge(vertex1, vertex3);
	graph.addEdge(vertex1, vertex6);
	graph.addEdge(vertex2, vertex3);
	graph.addEdge(vertex2, vertex4);
	graph.addEdge(vertex3, vertex4);
	graph.addEdge(vertex3, vertex5);
	graph.addEdge(vertex4, vertex5);
	graph.addEdge(vertex4, vertex7);
	graph.addEdge(vertex5, vertex8);
	graph.addEdge(vertex6, vertex1);
	graph.addEdge(vertex7, vertex9);
	graph.addEdge(vertex7, vertex10);
	graph.addEdge(vertex8, vertex9);
	graph.addEdge(vertex8, vertex11);
	graph.addEdge(vertex8, vertex12);
	graph.addEdge(vertex9, vertex10);
	graph.addEdge(vertex10, vertex11);
	graph.addEdge(vertex10, vertex13);
	graph.addEdge(vertex11, vertex12);
	graph.addEdge(vertex11, vertex15);
	graph.addEdge(vertex11, vertex16);
	graph.addEdge(vertex13, vertex14);
	graph.addEdge(vertex15, vertex16);

	graph.print();

	var DepthFirstSearch = require('../lib/dfs');
	var dfs = new DepthFirstSearch(graph, vertex1.vertexId);
	var present = false;

	console.log("Is " + vertex1.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex1.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex2.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex2.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex3.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex3.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex4.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex4.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex5.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex5.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + "santos" + " in Graph?");
	present = dfs.isVertexIdInGraph('santos');
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + "paulista" + " in Graph?");
	present = dfs.isVertexIdInGraph('paulista');
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + "consolacao" + " in Graph?");
	present = dfs.isVertexIdInGraph('consolacao');
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex6.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex6.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex7.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex7.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex8.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex8.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex9.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex9.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex10.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex10.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex11.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex11.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex12.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex12.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex13.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex13.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
	console.log("Is " + vertex14.vertexId + " in Graph?");
	present = dfs.isVertexIdInGraph(vertex14.vertexId);
	console.log("Is in Graph: " + present);
	console.log("=========================");
	console.log();
}, 10000)