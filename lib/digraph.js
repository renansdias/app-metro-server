module.exports = function Digraph() {
	// ********************
	//     F I E L D S
	// ********************

	/**
	 * Number of edges in the Graph.
	 */
	this.e = 0;

	/**
	 * List of all the vertices the Graph has.
	 */
	this.vertices = {};

	/**
	 * Graph's adjacency list.
	 */
	this.adjacencyList = {};

	// ***************
	//  M E T H O D S
	// ***************

	/**
	 * Adds an edge between Node v and Node w.
	 * If weight is passed, we'll use it as the distance
	 * between v and w.
	 */
	this.addEdge = function(v, w, weight) {

		// First step is to add v to the list of vertices.
		// If v is still not in the array, we'll put it into it.
		// Otherwise, we do nothing.
		if (typeof this.vertices[v.vertexId] === 'undefined') {
			this.vertices[v.vertexId] = v;
		}

		// Same goes to w.
		if (typeof this.vertices[w.vertexId] === 'undefined') {
			this.vertices[w.vertexId] = w;
		}

		// Now we build the adjacency list

		// If v.vertexId is still not present in the adjacency list, 
		// we should add it to it.
		if (typeof this.adjacencyList[v.vertexId] === 'undefined') {
			// Notice that we're assigning an empty array
			// to each position of the adjacency list. That's
			// necessary in order for Javascript to know that
			// each position in the adjacency list holds an
			// array (so we can use the push method).
			this.adjacencyList[v.vertexId] = [];
		}

		// Since this is a directed graph, we'll add the
		// edge v-w and NOT w-v.
		// In order for that to work, we should make sure
		// that v hasn't already got a connection with w.
		if (this.adjacencyList[v.vertexId].indexOf(w.vertexId) === -1) {
			this.adjacencyList[v.vertexId].push({vertex: w.vertexId, weight: weight || Number.POSITIVE_INFINITY});

			// Increment this.e (since this represents the number
			// of edges in the graph).
			this.e++;
		}
	}

	/**
	 * Retrieves an array with the adjancents vertices to
	 * v.
	 */
	this.getAdjacencyList = function(vertexId) {
		return this.adjacencyList[vertexId];
	}

	/**
	 * Counts the number of vertices of the Graph
	 */
	this.countVertices = function() {
		return 0;
	}

	/**
	 * Counts the number of edges of the Graph
	 */
	this.a = function() {
		return this.e;
	}

	/**
	 * String representantion of the Graph
	 */
	this.toString = function() {

	}

	this.print = function() {
		console.log('List of Vertices');
		console.log('================');
		console.log(this.vertices);

		console.log('Adjacency List');
		console.log('================');
		console.log(this.adjacencyList);
	}
}