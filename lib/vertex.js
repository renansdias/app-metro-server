module.exports = function Vertex(vertexId, vertexContent) {
	// ********************
	//     F I E L D S
	// ********************

	/**
	 * String or Number that uniquely identifies
	 * this vertex in a Graph.
	 */
	this.vertexId = vertexId;

	/**
	 * Content of the vertex (which could be an object, an array, etc).
	 */
	this.content = vertexContent;
}