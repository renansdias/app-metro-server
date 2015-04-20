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

	this.depthFirstSearch = function(source, vertexId) {
		this.marked[source] = true;
		if (source === vertexId) {
			console.log('FOUND!!!: ' + vertexId);
			this.found = true;
		}

		var adj = this.graph.getAdjacencyList(source);
		console.log("Source: " + source);
		for (var i = 0; i < adj.length; i++) {
			var vertex = adj[i];

			if (typeof this.marked[vertex] === 'undefined') {
				this.depthFirstSearch(vertex, vertexId);
			}
		}
	}
}