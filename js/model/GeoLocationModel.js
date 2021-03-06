/*=======================GeoLocationModel=============================*/
// This is essentially a hardcoded list of US locations that StubHub supports.
// The model would use the geoCalculation.js library to map the user's current
// IP address to the nearest location on StubHub.
/*====================================================================*/
window.GeoLocationModel = Backbone.Model.extend({

	initialize: function() {
		this.set({
			locations: [
				{
					city: 'Birmingham',
					state: 'Alabama',
					stateAbbrev: 'AL',
					lat: 33.5202903747559,
					lng: -86.8115005493164,
				},
				{
					city: 'Anchorage',
					state: 'Alaska',
					stateAbbrev: 'AK',
					lat: 61.2175483703613,
					lng: -149.858383178711,
				},
				{
					city: 'Phoenix',
					state: 'Arizona',
					stateAbbrev: 'AZ',
					lat: 33.4482612609863,
					lng: -112.07576751709,
				},
				{
					city: 'Little Rock',
					state: 'Arkansas',
					stateAbbrev: 'AR',
					lat: 34.748649597168,
					lng: -92.2744903564453,
				},
				{
					city: 'Los Angeles Metro',
					state: 'California',
					stateAbbrev: 'CA',
					lat: 34.0534896850586,
					lng: -118.245323181152,
				},
				{
					city: 'SF Bay Area',
					state: 'California',
					stateAbbrev: 'CA',
					lat: 37.7771186828613,
					lng: -122.419639587402,
				},
				{
					city: 'Sacramento',
					state: 'California',
					stateAbbrev: 'CA',
					lat: 38.5790596008301,
					lng: -121.491012573242,
				},
				{
					city: 'San Diego',
					state: 'California',
					stateAbbrev: 'CA',
					lat: 32.715690612793,
					lng: -117.161720275879,
				},
				{
					city: 'San Diego',
					state: 'California',
					stateAbbrev: 'CA',
					lat: 32.715690612793,
					lng: -117.161720275879,
				},
				{
					city: 'Denver',
					state: 'Colorado',
					stateAbbrev: 'CO',
					lat: 39.7400093078613,
					lng: -104.992263793945,
				},
				{
					city: 'Hartford',
					state: 'Connecticut',
					stateAbbrev: 'CT',
					lat: 41.7633209228516,
					lng: -72.674072265625,
				},
				{
					city: 'Wilmington',
					state: 'Delaware',
					stateAbbrev: 'DE',
					lat: 34.2349700927734,
					lng: -77.9459915161133,
				},
				{
					city: 'Washington D.C.',
					state: 'Dist. of Columbia',
					stateAbbrev: 'DC',
					lat: 38.8903694152832,
					lng: -77.0319595336914,
				},
				{
					city: 'Jacksonville',
					state: 'Florida',
					stateAbbrev: 'FL',
					lat: 30.331470489502,
					lng: -81.6562194824219,
				},
				{
					city: 'Miami / S. Florida',
					state: 'Florida',
					stateAbbrev: 'FL',
					lat: 25.7289791107178,
					lng: -80.237419128418,
				},
				{
					city: 'Orlando',
					state: 'Florida',
					stateAbbrev: 'FL',
					lat: 28.5382308959961,
					lng: -81.3773880004883,
				},
				{
					city: 'Tallahassee',
					state: 'Florida',
					stateAbbrev: 'FL',
					lat: 30.439769744873,
					lng: -84.280647277832,
				},
				{
					city: 'Tampa / St. Petersburg',
					state: 'Florida',
					stateAbbrev: 'FL',
					lat: 27.9465293884277,
					lng: -82.4592666625977,
				},
				{
					city: 'Atlanta',
					state: 'Georgia',
					stateAbbrev: 'GA',
					lat: 33.7483100891113,
					lng: -84.39111328125,
				},
				{
					city: 'Honolulu',
					state: 'Hawaii',
					stateAbbrev: 'HI',
					lat: 21.3047695159912,
					lng: -157.857604980469,
				},
				{
					city: 'Boise',
					state: 'Idaho',
					stateAbbrev: 'ID',
					lat: 43.6069793701172,
					lng: -116.193412780762,
				},
				{
					city: 'Chicago',
					state: 'Illinois',
					stateAbbrev: 'IL',
					lat: 41.8841514587402,
					lng: -87.6324081420898,
				},
				{
					city: 'Indianapolis',
					state: 'Indiana',
					stateAbbrev: 'IN',
					lat: 39.7669105529785,
					lng: -86.1499633789063,
				},
				{
					city: 'Des Moines',
					state: 'Iowa',
					stateAbbrev: 'IA',
					lat: 41.5897598266602,
					lng: -93.6156463623047,
				},
				{
					city: 'Topeka',
					state: 'Kansas',
					stateAbbrev: 'KS',
					lat: 39.0492782592773,
					lng: -95.6711807250977,
				},
				{
					city: 'Wichita',
					state: 'Kansas',
					stateAbbrev: 'KS',
					lat: 37.6869812011719,
					lng: -97.335578918457,
				},
				{
					city: 'Louisville',
					state: 'Kentucky',
					stateAbbrev: 'KY',
					lat: 38.2548599243164,
					lng: -85.7664031982422,
				},
				{
					city: 'New Orleans',
					state: 'Louisiana',
					stateAbbrev: 'LA',
					lat: 29.9536991119385,
					lng: -90.077751159668,
				},
				{
					city: 'Baltimore',
					state: 'Maryland',
					stateAbbrev: 'MD',
					lat: 39.2905807495117,
					lng: -76.609260559082,
				},
				{
					city: 'Boston',
					state: 'Massachusetts',
					stateAbbrev: 'MA',
					lat: 42.3586311340332,
					lng: -71.0567016601563,
				},
				{
					city: 'Detroit',
					state: 'Michigan',
					stateAbbrev: 'MI',
					lat: 42.3316802978516,
					lng: -83.0479202270508,
				},
				{
					city: 'Grand Rapids',
					state: 'Michigan',
					stateAbbrev: 'MI',
					lat: 42.9664115905762,
					lng: -85.6711807250977,
				},
				{
					city: 'Minneapolis',
					state: 'Minnesota',
					stateAbbrev: 'MN',
					lat: 44.9790306091309,
					lng: -93.2649307250977,
				},
				{
					city: 'Jackson',
					state: 'Mississippi',
					stateAbbrev: 'MS',
					lat: 32.2986907958984,
					lng: -90.1804885864258,
				},
				{
					city: 'Kansas City',
					state: 'Missouri',
					stateAbbrev: 'MO',
					lat: 39.1029510498047,
					lng: -94.5830612182617,
				},
				{
					city: 'St. Louis',
					state: 'Missouri',
					stateAbbrev: 'MO',
					lat: 38.6277389526367,
					lng: -90.1995086669922,
				},
				{
					city: 'Missoula',
					state: 'Montana',
					stateAbbrev: 'MT',
					lat: 46.8727798461914,
					lng: -113.996231079102,
				},
				{
					city: 'Lincoln',
					state: 'Nebraska',
					stateAbbrev: 'NE',
					lat: 40.8136215209961,
					lng: -96.7077407836914,
				},
				{
					city: 'Las Vegas',
					state: 'Nevada',
					stateAbbrev: 'NV',
					lat: 36.1719093322754,
					lng: -115.13996887207,
				},
				{
					city: 'Reno',
					state: 'Nevada',
					stateAbbrev: 'NV',
					lat: 39.5273818969727,
					lng: -119.813438415527,
				},
				{
					city: 'Manchester',
					state: 'New Hampshire',
					stateAbbrev: 'NH',
					lat: 42.9911689758301,
					lng: -71.4630889892578,
				},
				{
					city: 'Atlantic City',
					state: 'New Jersey',
					stateAbbrev: 'NJ',
					lat: 39.3628082275391,
					lng: -74.4265213012695,
				},
				{
					city: 'Albuquerque',
					state: 'New Mexico',
					stateAbbrev: 'NM',
					lat: 35.0841789245605,
					lng: -106.648643493652,
				},
				{
					city: 'Albany',
					state: 'New York',
					stateAbbrev: 'NY',
					lat: 42.651439666748,
					lng: -73.7552490234375,
				},
				{
					city: 'Syracuse',
					state: 'New York',
					stateAbbrev: 'NY',
					lat: 43.049991607666,
					lng: -76.1473922729492,
				},
				{
					city: 'Buffalo',
					state: 'New York',
					stateAbbrev: 'NY',
					lat: 42.885440826416,
					lng: -78.8784637451172,
				},
				{
					city: 'New York Metro',
					state: 'New York',
					stateAbbrev: 'NY',
					lat: 40.7145500183105,
					lng: -74.0071182250977,
				},
				{
					city: 'Charlotte',
					state: 'North Carolina',
					stateAbbrev: 'NC',
					lat: 35.2226905822754,
					lng: -80.837760925293,
				},
				{
					city: 'Raleigh-Durham',
					state: 'North Carolina',
					stateAbbrev: 'NC',
					lat: 35.8724403381348,
					lng: -78.7929611206055,
				},
				{
					city: 'Fargo',
					state: 'North Dakota',
					stateAbbrev: 'ND',
					lat: 46.8759117126465,
					lng: -96.7817611694336,
				},
				{
					city: 'Cincinnati',
					state: 'Ohio',
					stateAbbrev: 'OH',
					lat: 39.1071281433105,
					lng: -84.5041275024414,
				},
				{
					city: 'Cleveland',
					state: 'Ohio',
					stateAbbrev: 'OH',
					lat: 41.5047492980957,
					lng: -81.6907196044922,
				},
				{
					city: 'Columbus',
					state: 'Ohio',
					stateAbbrev: 'OH',
					lat: 39.9619598388672,
					lng: -83.0029830932617,
				},
				{
					city: 'Oklahoma City',
					state: 'Oklahoma',
					stateAbbrev: 'OK',
					lat: 35.4720115661621,
					lng: -97.5203475952148,
				},
				{
					city: 'Portland',
					state: 'Oregon',
					stateAbbrev: 'OR',
					lat: 45.511791229248,
					lng: -122.675628662109,
				},
				{
					city: 'Philadelphia',
					state: 'Pennsylvania',
					stateAbbrev: 'PA',
					lat: 39.952278137207,
					lng: -75.1624526977539,
				},
				{
					city: 'Pittsburgh',
					state: 'Pennsylvania',
					stateAbbrev: 'PA',
					lat: 40.4383316040039,
					lng: -79.9974594116211,
				},
				{
					city: 'Providence',
					state: 'Rhode Island',
					stateAbbrev: 'RI',
					lat: 41.8238716125488,
					lng: -71.4119873046875,
				},
				{
					city: 'Providence',
					state: 'Rhode Island',
					stateAbbrev: 'RI',
					lat: 41.8238716125488,
					lng: -71.4119873046875,
				},
				{
					city: 'Charleston',
					state: 'South Carolina',
					stateAbbrev: 'SC',
					lat: 38.3501396179199,
					lng: -81.6389312744141,
				},
				{
					city: 'Columbia',
					state: 'South Carolina',
					stateAbbrev: 'SC',
					lat: 33.9985504150391,
					lng: -81.0452499389648,
				},
				{
					city: 'Sioux Falls',
					state: 'South Dakota',
					stateAbbrev: 'SD',
					lat: 43.5453491210938,
					lng: -96.7312774658203,
				},
				{
					city: 'Knoxville',
					state: 'Tennessee',
					stateAbbrev: 'TN',
					lat: 35.9604911804199,
					lng: -83.9209136962891,
				},
				{
					city: 'Memphis',
					state: 'Tennessee',
					stateAbbrev: 'TN',
					lat: 35.1497611999512,
					lng: -90.0492477416992,
				},
				{
					city: 'Nashville',
					state: 'Tennessee',
					stateAbbrev: 'TN',
					lat: 36.167839050293,
					lng: -86.7781600952148,
				},
				{
					city: 'Austin / San Antonio',
					state: 'Texas',
					stateAbbrev: 'TX',
					lat: 30.267599105835,
					lng: -97.7429809570313,
				},
				{
					city: 'Dallas',
					state: 'Texas',
					stateAbbrev: 'TX',
					lat: 32.778148651123,
					lng: -96.7954025268555,
				},
				{
					city: 'El Paso',
					state: 'Texas',
					stateAbbrev: 'TX',
					lat: 31.7591590881348,
					lng: -106.487487792969,
				},
				{
					city: 'Houston',
					state: 'Texas',
					stateAbbrev: 'TX',
					lat: 29.7604503631592,
					lng: -95.3697814941406,
				},
				{
					city: 'Lubbock',
					state: 'Texas',
					stateAbbrev: 'TX',
					lat: 33.5845108032227,
					lng: -101.845008850098,
				},
				{
					city: 'Salt Lake City',
					state: 'Utah',
					stateAbbrev: 'UT',
					lat: 40.7594985961914,
					lng: -111.888229370117,
				},
				{
					city: 'Richmond',
					state: 'Virginia',
					stateAbbrev: 'VA',
					lat: 37.540699005127,
					lng: -77.4336471557617,
				},
				{
					city: 'Seattle',
					state: 'Washington',
					stateAbbrev: 'WA',
					lat: 47.6035614013672,
					lng: -122.329437255859,
				},
				{
					city: 'Charleston',
					state: 'West Virginia',
					stateAbbrev: 'WV',
					lat: 38.3501396179199,
					lng: -81.6389312744141,
				},
				{
					city: 'Green Bay',
					state: 'Wisconsin',
					stateAbbrev: 'WI',
					lat: 44.5127906799316,
					lng: -88.0101623535156,
				},
				{
					city: 'Milwaukee',
					state: 'Wisconsin',
					stateAbbrev: 'WI',
					lat: 43.0418090820313,
					lng: -87.9068374633789,
				},
				{
					city: 'Casper',
					state: 'Wyoming',
					stateAbbrev: 'WY',
					lat: 42.8500900268555,
					lng: -106.327728271484,
				},
			],
		});

		var currentLoc = new LatLon(geoip_latitude(), geoip_longitude());
		var locs = this.get('locations');
		var locObjs = [];
		var distances = [];
		var minDist;
		var minDistIdx;

		for (var i = 0; i < locs.length; i++) {
			locObjs.push(new LatLon(locs[i].lat, locs[i].lng));
			distances[i] = currentLoc.distanceTo(locObjs[i]); 
			if (typeof minDist != 'undefined' && typeof minDistIdx != 'undefined') {
				if (minDist > Math.round(distances[i])) {
					minDist = distances[i];
					minDistIdx = i;
				}
			} else {
				minDist = distances[i];
				minDistIdx = i;
			}
		}

		// console.log('Current Location is closest to: ' + locs[minDistIdx].city);
		// console.log('Distance(km): ' + minDist);
		// console.log('Current Lat/Lon: ' + geoip_latitude() + ',' + geoip_longitude());
		// console.log('Matched Loc Lat/Long: ' + locs[minDistIdx].lat + ',' + locs[minDistIdx].lng);
		// console.log('setting loc property');
		this.set('loc', locs[minDistIdx].city);
		$('#change-loc-link span').html(locs[minDistIdx].city + ', ' + locs[minDistIdx].stateAbbrev);
	},

	replaceLocation: function(location) {
		this.set('loc', location);
		var locs = this.get('locations');
		var idx;
		for (var i = 0; i < locs.length; i++) {
			var loc = locs[i];
			if (loc.city === location) {
				idx = i;
				break;
			}
		}
		$('#change-loc-link span').html(location + ', ' + locs[idx].stateAbbrev);
	}
});