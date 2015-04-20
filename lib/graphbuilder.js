var Vertex = require('./vertex');
var Graph = require('./graph');

/**
 * This class builds a Graph which is a representation of
 * the collection passed.
 */
module.exports = function GraphBuilder(docs, edgeIds) {
	this.docs = docs;
	this.edgeIds = edgeIds;

	this.build = function() {
		var graph = new Graph();

		for (var i = 0; i < docs.length; i++) {
			/**
			 * If the _id field of the document is a number,
			 * we should transform it into a String.
			 */
			var vertexId = (!isNaN(this.docs[i]._id)) 
								? (this.docs[i]._id.toString()) 
								: (this.docs[i]._id);

			var sourceVertex = new Vertex(vertexId, this.docs[i]);

			/**
			 * The connections between vertices in the resulting
			 * Graph will be defined by the keys in the this.edgeIds
			 * array. The array looks like the following:
			 * {
			 *		key1: 'Array',
			 *		key2: 'Object',
			 *		...
			 * }
			 *
			 * This means that in the this.docs there is a field
			 * called "key1" which should be used to connect vertices
			 * and that this field is an array. Besides, there's a "key2"
			 * field in the docs which represents an object (one-to-one relationship)
			 */
			for (edgeId in this.edgeIds) {
				if (this.edgeIds[edgeId] === 'Array' || this.edgeIds[edgeId] === 'array') {
					for (var j = 0; j < this.docs[i][edgeId].length; j++) {
						var vertexId = (!isNaN(this.docs[i][edgeId][j]._id)) 
								? (this.docs[i][edgeId][j]._id.toString()) 
								: (this.docs[i][edgeId][j]._id);

						var adjacentVertex = new Vertex(vertexId, this.docs[i][edgeId][j]);

						graph.addEdge(sourceVertex, adjacentVertex);
					}
				} else if (this.edgeIds[edgeId] === 'Object' || this.edgeIds[edgeId] === 'object') {
					var vertexId = (!isNaN(this.docs[i][edgeId]._id))
										? (this.docs[i][edgeId]._id.toString())
										: (this.docs[i][edgeId]._id);
					var adjacentVertex = new Vertex(vertexId, this.docs[i][edgeId]);

					graph.addEdge(sourceVertex, adjacentVertex);
				} else {
					throw new Error("The Edge ID " + edgeId + " (" + (typeof edgeId) + ") should be either an Array or an Object");
				}
			}
		}

		return graph;
	}
}