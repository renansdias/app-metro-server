var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function TrainSystem(stationNetwork) {
	this.stationNetwork = stationNetwork || {};

	this.locations = {
		red: [
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
			[-23.525756, -46.665792]  // Palmeiras Barra Funda
		],
		yellow: [
			[-23.538135, -46.634334], // Luz
			[-23.539827, -46.636480],
			[-23.541165, -46.638154], 
			[-23.543093, -46.640729],
			[-23.544347, -46.642854], // República
			[-23.547106, -46.646823],
			[-23.549820, -46.653131],
			[-23.552574, -46.658496],
			[-23.555016, -46.662197], // Paulista 
			[-23.557927, -46.668248],
			[-23.561978, -46.674771],
			[-23.564575, -46.680050],
			[-23.566070, -46.684427], // Fradique Coutinho
			[-23.566502, -46.685929], 
			[-23.566896, -46.687431],
			[-23.567525, -46.689663],
			[-23.567564, -46.692753], // Faria Lima
			[-23.567289, -46.695457],
			[-23.567171, -46.697817], 
			[-23.566896, -46.700134],
			[-23.566512, -46.703090], // Pinheiros
			[-23.567495, -46.704506],
			[-23.568676, -46.705965],
			[-23.570092, -46.707253],
			[-23.571508, -46.709012]  // Butantã
		]
	}

	/**
	 * Gets the coordinate of the next location the train is
	 * to move to.
	 */
	this.getNextLocationForTrain = function(train) {
		var indexOfLocation = this.locationIndexForTrain(train);

		/*
		 * Now we need to take care regarding the following:
		 *
		 * 1) If the train is at neither the first location
		 * nor the last, we can just learn its direction and
		 * return indexOfLocation + 1 or indexOfLocation - 1.
		 *
		 * 2) If the train is at the first position and:
		 *		a) is heading forward, we'll retrieve the
		 * 		   location at the second position. 
		 *
		 *		b) is moving backwards, we'll also retrieve
		 * 		   the location at the second position, BUT we'll
		 * 		   change the direction to "forward".
		 *
		 * 3) If the train is at the last location and:
		 *		a) is moving backwards, we'll just retrieve the 
		 *		   location before the last one.
		 *		
		 *		b) is moving forward, we'll retrieve the location
		 *		   before the last one and we'll change the train's 
		 *		   direction to "backwards".
		 */

		// 1)
		if (indexOfLocation > 0 &&
			indexOfLocation < this.locations[train.line].length - 1) {
			
			var nextLatitude = 0;
			var nextLongitude = 0;

			if (train.direction === 'forward') {
				nextLatitude = this.locations[train.line][indexOfLocation + 1][0];
				nextLongitude = this.locations[train.line][indexOfLocation + 1][1];
			} else {
				nextLatitude = this.locations[train.line][indexOfLocation - 1][0];
				nextLongitude = this.locations[train.line][indexOfLocation - 1][1];
			}

			return {
				location: {
					latitude: nextLatitude,
					longitude: nextLongitude
				},
				direction: train.direction
			};
		} else if (indexOfLocation === 0) { // 2)
			var nextLatitude = this.locations[train.line][indexOfLocation + 1][0];
			var nextLongitude = this.locations[train.line][indexOfLocation + 1][1];
			var nextDirection = 'forward';

			return {
				location: {
					latitude: nextLatitude,
					longitude: nextLongitude
				},
				direction: nextDirection
			};
		} else if (indexOfLocation === this.locations[train.line].length - 1) { // 3)
			var nextLatitude = this.locations[train.line][indexOfLocation - 1][0];
			var nextLongitude = this.locations[train.line][indexOfLocation - 1][1];
			var nextDirection = 'backwards';

			return {
				location: {
					latitude: nextLatitude,
					longitude: nextLongitude
				},
				direction: nextDirection
			};
		}

		throw new Error('The train is at an invalid location');
	}

	/**
	 * Gets the closest train to the given "path" (origin and destination)
	 */
	this.getClosestTrainTo = function(origin, destination, callback) {
		// Saving a reference to this instance so we can access it
		// from within callbacks
		self = this;

		var db = mongoose.createConnection('mongodb://localhost:27017/appmetro');

		db.on('open', function() {
			var trainSchema = new Schema({
				_id: Number,
				location: Schema.Types.Mixed
			});

			/*
			 * First, we need to know the direction of the train.
			 * For instance: if origin is Carrão and Destination is Sé,
			 * the train should be moving forward. Otherwise, if
			 * origin is Sé and destination is CarrãoM, the train should
			 * be moving backwards.
			 * In order to know the direction, we'll use the Station Network
			 * class.
			 */
			trainDirection = self.stationNetwork.getDirectionForClosestTrain(origin, destination);

			/*
			 * Then, we need to determine which line the closest train should be
			 * on.
			 */
			lineForClosestTrain = self.stationNetwork.getStartLineForPath(origin, destination);

			var Train = mongoose.model('Train', trainSchema);

			Train
				.find({direction: trainDirection, line: lineForClosestTrain})
				.exec(function(err, docs) {

					/*
					 * In a while, we'll need to know the origin's location
					 * and line in order to determine the closest train.
					 * The station variable below will look like the following:
					 * {
					 *		location: {
					 *			latitude: -23.345231,
					 *			longitude: -46.123345
					 *      },
					 *		line: 'red'
					 * }
					 */
					var station = self.stationNetwork.getStationWithStationId(origin);
					var locationIndexForStation = self.locationIndexForStation(station);

					/*
					 * The algorithm below will perform the following steps:
					 *
					 * 1 - It iterate through the docs array, and for each
					 *     train, it will: Get the index (in this.locations[line]) of the train's location
					 *	   and will store in another array (that relates the index value
					 *     with the train).
					 *
					 * 2 - Then, it'll sort the resulting array of step one.
					 *
					 * 3 - After having the array sorted, it'll get the train
					 *     that has an index value which is greater than
					 *	   the origin station index value and, aat the same time
					 *	   is the lowest index value of the array.
					 */

					var trains = [];
					for (var i = 0; i < docs.length; i++) {
						// Apparently, docs[i] is NOT a javascript
						// object. In order to turn it into an object
						// we need to call the toObject() method.
						var train = docs[i].toObject();

						var indexOfLocation = self.locationIndexForTrain(train);

						trains.push({index: indexOfLocation, train: train});
					}		   

					// Now we sort the trains array by the index key
					// of each object in it.
					trains.sort(function(elem1, elem2) {
						return elem1.index - elem2.index;
					});

					/* In order to find out the closest train, here's
					 * how the algorithm will work:
					 *
					 * 1 - If the origin station is the first one, the closest
					 *     train will be the one that has the lowest index in the
					 *     trains array
					 *
					 * 2 - If the origin station is the last one, the closest
					 * 	   train will be the one that has the highest index in
					 *	   the trains array.
					 *
					 * 3 - If the origin station is neither the first station
					 *	   nor the last one and:
					 *		
					 *		a) the requested train should be going forward,
					 *		   the chosen train will be the one with index greater
					 *		   than the others but less than the origin's index.
					 *	    
					 *      b) the requested train should be going backwards,
					 *	       the chosen train will be the one with lowest index
					 *		   but greater than the origin's index.
					 */

					var chosenTrain = {};

					if (locationIndexForStation === 0) {
						chosenTrain = trains[0].train;
					} else if (locationIndexForStation === (self.locations[lineForClosestTrain].length - 1)) {
						chosenTrain = trains[trains.length - 1].train;
					}

					if (trainDirection === 'forward') {
						var i = 0;

						// The following loop gets the train with highest index but
						// an index lower than the origin's index
						for (; i < trains.length && (trains[i].index <= locationIndexForStation); i++);

						/*
						 * If i is equal to 0, it means there is no train to is
						 * moving towards the origin station.
						 */
						if (i === 0)
							chosenTrain = {};
						else
							chosenTrain = trains[i-1].train;
					} else if (trainDirection === 'backwards') {
						var i = trains.length - 1;

						// The following loop gets the train with lowest index but
						// an index greater than the origin's index
						for (; i > -1 && (trains[i].index >= locationIndexForStation); i--);

						/*
						 * If i is equal to trains.length - 1, it means there is no train to is
						 * moving towards the origin station.
						 */
						if (i === (trains.length - 1)) 
							chosenTrain = {};
						else
							chosenTrain = trains[i+1].train;
					}

					db.close();
					callback(chosenTrain);
				});
		});
	}

	/**
	 * Gets the index of the locations array that matches
	 * its latitude and logitude with the given train's
	 * latitude and longitude.
	 */
	this.locationIndexForTrain = function(train) {
		var obj = {
			location: {
				latitude: train.location.latitude,
				longitude: train.location.longitude
			},
			line: train.line
		};

		return this.getLocationIndex(obj);
	}

	this.locationIndexForStation = function(station) {
		var obj = {
			location: {
				latitude: station.location.latitude,
				longitude: station.location.longitude
			},
			line: station.lines[0]
		};

		return this.getLocationIndex(obj);
	}

	this.getLocationIndex = function(obj) {
		var indexOfLocation = -1;

		this.locations[obj.line].some(function(element, index, array) {
			if ((element[0] == obj.location.latitude) && (element[1] == obj.location.longitude)) 
				indexOfLocation = index;

			return ((element[0] == obj.latitude) && 
					(element[1] == obj.longitude));
		});

		return indexOfLocation;
	}
}	