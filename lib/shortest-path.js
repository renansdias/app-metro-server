var PriorityQueue = require('./priority-queue');

module.exports = function ShortestPath(graph) {

	/**
	 * Graph in which the shortest path algorithm will be
	 * applied.
	 */
	this.graph = graph;

	this.findShortestPathBetween = function (source, destination) {
		var nodes = new PriorityQueue();
		var distances = {};
		var	previous = {};
		var	path = [];
		var	smallest; 
		var vertexId; 
		var neighbour;
		var alt;
		var INFINITY = 1/0;

		for (vertexId in this.graph.vertices) {
			if (vertexId === source) {
				distances[vertexId] = 0;
				nodes.enqueue(0, vertexId);
			} else {
				distances[vertexId] = INFINITY;
				nodes.enqueue(INFINITY, vertexId);
			}

			previous[vertexId] = null;
		}

		while(!nodes.isEmpty()) {
			smallest = nodes.dequeue();

			if(smallest === destination) {
				path;

				while(previous[smallest]) {
					path.push(smallest);
					smallest = previous[smallest];
				}

				break;
			}

			if (!smallest || distances[smallest] === INFINITY) {
				continue;
			}

			var adj = this.graph.getAdjacencyList(smallest);
			for (var i = 0; i < adj.length; i++) {
				/**
				 * Neighbour example:
				 * {vertex: "0", weight: 1}
				 */
				var neighbour = adj[i];

				alt = distances[smallest] + neighbour.weight;

				if (alt < distances[neighbour.vertex]) {
					distances[neighbour.vertex] = alt;
					previous[neighbour.vertex] = smallest;

					nodes.enqueue(alt, neighbour.vertex);
				}
			}
		}

		return path;
	}
}