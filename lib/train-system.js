var StationNetwork = require('./station-network');

module.exports = function TrainSystem() {
	this.stationNetwork = new StationNetwork();

	this.redLine = [
		[-23.542323, -46.471429], // Corinthians Itaquera
		[-23.542958, -46.475994],
		[-23.542397, -46.479578],
		[-23.541846, -46.482153],
		[-23.540440, -46.484449], // Arthur Alvim
		[-23.536818, -46.486729],
		[-23.535441, -46.492930],
		[-23.533415, -46.497780],
		[-23.530484, -46.502672], // Patriarca
		[-23.528531, -46.505203],
		[-23.527370, -46.509065],
		[-23.527842, -46.512778],
		[-23.529022, -46.516382], // Guilhermina-Esperança
		[-23.530419, -46.519279],
		[-23.531324, -46.522648],
		[-23.531816, -46.526854],
		[-23.531757, -46.531167], // Vila Matilde
		[-23.531639, -46.533034],
		[-23.532209, -46.536596],
		[-23.533036, -46.540308],
		[-23.533606, -46.544084], // Penha
		[-23.534344, -46.547797],
		[-23.535446, -46.553247],
		[-23.536764, -46.559641],
		[-23.537551, -46.563847], // Carrão
		[-23.537924, -46.566057],
		[-23.538692, -46.569748],
		[-23.539360, -46.573031],
		[-23.540029, -46.576614], // Tatuapé
		[-23.540501, -46.578588],
		[-23.541210, -46.582300],
		[-23.542469, -46.587150],
		[-23.543078, -46.589811], // Belém
		[-23.543354, -46.593416],
		[-23.544337, -46.598244],
		[-23.545242, -46.602707],
		[-23.546324, -46.607470], // Bresser-Mooca
		[-23.546580, -46.608522],
		[-23.547052, -46.610775],
		[-23.547603, -46.613028],
		[-23.547701, -46.615410], // Brás
		[-23.548095, -46.617727],
		[-23.548724, -46.620753],
		[-23.549373, -46.623757],
		[-23.549786, -46.625945], // Pedro II
		[-23.549904, -46.627136],
		[-23.550376, -46.628767],
		[-23.550907, -46.631642],
		[-23.550632, -46.633284], // Sé
		[-23.550150, -46.634990],
		[-23.549570, -46.636599],
		[-23.548803, -46.638230],
		[-23.547927, -46.639324], // Anhangabaú
		[-23.547367, -46.640461],
		[-23.546531, -46.641534],
		[-23.545901, -46.642371],
		[-23.544347, -46.642854], // República
		[-23.543373, -46.644431],
		[-23.542252, -46.646223],
		[-23.540856, -46.647897],
		[-23.539646, -46.648927], // Santa Cecília
		[-23.538210, -46.650665],
		[-23.536636, -46.652617],
		[-23.534983, -46.654398],
		[-23.533764, -46.655986], // Marechal Deodoro
		[-23.532052, -46.658518],
		[-23.529691, -46.661200],
		[-23.527704, -46.663518],
		[-23.525756, -46.665792], // Palmeiras Barra Funda
	];

	/**
	 * Gets the coordinate of the next location the train is
	 * to move to.
	 */
	this.getNextLocationForTrain = function(train) {
		var location = {latitude: train.location.latitude, longitude: train.location.longitude};
		var indexOfLocation = -1;

		this.redLine.some(function(element, index, array) {
			if ((element[0] == location.latitude) && (element[1] == location.longitude)) 
				indexOfLocation = index;

			return ((element[0] == location.latitude) && 
					(element[1] == location.longitude));
		});

		if (train.direction === 'forward')
			return indexOfLocation + 1;

		return indexOfLocation - 1;
	}

	/**
	 * Gets the closest train to the given "path" (origin and destination)
	 */
	this.getClosestTrainTo = function(origin, destination) {
		/*
		 * The first thing we need to do is to get the
		 * shortest path between origin and destination.
		 * For that, we'll use the StationNetwork class.
		 */
		var path = this.stationNetwork.shortestPathBetween(origin, destination);

		console.log("Path: " + path);
	}
}	