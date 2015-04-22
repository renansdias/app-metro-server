module.exports = function DepthFirstSearch(graph, sourceId) {

	// **************************
	//        F I E L D S
	// **************************

	/**
	 * The Graph in which the DFS will be applied.
	 */
	this.graph = graph;

	/**
	 * The vertex at which the algorithm will start
	 */
	this.sourceId = sourceId;

	/**
	 * Object which will hold a boolean value for each
	 * vertex of the Graph. If the a vertexId is true, 
	 * it means that this vertex has already been
	 * visited by the algorithm. If false, it means
	 * it hasn't been visited yet.
	 */
	this.marked = {};

	// **************************
	//      M E T H O D S 
	// **************************	

	this.isVertexIdInGraph = function(vertexId) {
		/**
		 * Before we start looking for vertices in the Graph,
		 * we need to reset the marked object, otherwise when
		 * you call this method for the second time, the source
		 * will already be marked.
		 */
		this.marked = {};
		this.found = false;
		this.depthFirstSearch(this.sourceId, vertexId);
		return this.found;
	}

	/**
	 * If in the graph, retrieves the desired vertex.
	 * otherwise, if not in the graph, returns an empty
	 * object.
	 */
	this.getVertexWithVertexId = function(vertexId) {
		this.marked = {};
		this.vertexFound = {};
		this.depthFirstSearch(this.sourceId, vertexId);

		return this.vertexFound
	}

	this.depthFirstSearch = function(source, vertexId) {
		this.marked[source] = true;
		if (source === vertexId) {
			this.found = true;
			this.vertexFound = this.graph.vertices[source];
		}

		var adj = this.graph.getAdjacencyList(source);
		for (var i = 0; i < adj.length; i++) {
			var vertex = adj[i].vertex;

			if (typeof this.marked[vertex] === 'undefined') {
				this.depthFirstSearch(vertex, vertexId);
			}
		}
	}
}