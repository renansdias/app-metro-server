var PriorityQueue = require('priority-queue');

module.exports = function ShortestPath(graph) {

	/**
	 * Graph in which the shortest path algorithm will be
	 * applied.
	 */
	this.graph = graph;

	this.findShortestPathBetween = function (source, destination) {
		var nodes = new PriorityQueue();
		var distances = {},
		var	previous = {},
		var	path = [],
		var	smallest; 
		var vertexId; 
		var neighbour;
		var alt;

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

			for(neighbour in this.vertices[smallest]) {
				alt = distances[smallest] + this.vertices[smallest][neighbour];

				if (alt < distances[neighbour]) {
					distances[neighbour] = alt;
					previous[neighbour] = smallest;

					nodes.enqueue(alt, neighbour);
				}
			}
		}

		return path;
	}
}