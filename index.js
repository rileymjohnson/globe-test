//canvas dimensions
//these numbers will not affect the actual size of the globe
//that is done with css
//they only affect the resolution
var width = window.innerWidth / 2; //the /2 is because it is 50% width. if it was 25% it would be divided by 4
var height = window.innerWidth / 2;

/*
setting up sphere properties
*/
var projection = d3.geo.orthographic() //d3 3d shape
projection.translate([width / 2, height / 2]) //positions sphere in the center
projection.scale(width / 2 - 20) //scaled globe to correct size. -20 is for padding
projection.clipAngle(90) //fits shapes inside circle properly
projection.precision(.5); //specifies how exact the sphere is. The higher number the harder to render.

/*
create canvas and set up default values
*/
var globeCanvas = d3.select("#globeContainer").append("canvas") //canvas dom element to hold globe
globeCanvas.attr("width", width)
globeCanvas.attr("height", height)
globeCanvas.style("width", "50%")
//any additional attributes here

var c = globeCanvas.node().getContext("2d"); //2d rendering context to draw continents on

var path = d3.geo.path() //path object for drawing on canvas
	.projection(projection)
	.context(c);

/*
asynchronously load country data files
when loaded called loaded ready function
*/
queue()
	.defer(d3.json, "d3.json")
	.await(ready);

function ready(error, world) { //called when data files are loaded
	if (error) { //will change this
		alert("the data was not loaded properly")
	}

	var globe = {
		type: "Sphere"
	};
	var land = topojson.feature(world, world.objects.land);
	//var countries = topojson.feature(world, world.objects.countries).features;
	var borders = topojson.mesh(world, world.objects.countries, function(a, b) {
		return a !== b; //causes borders not to unnecessarily overlap
	});

	countries = [ //sample country data
		{
			name: "new york",
			coordinates: {
				lat: 40.7128,
				lng: 74.0059
			}
		}, {
			name: "san fransisco",
			coordinates: {
				lat: 37.7749,
				lng: 122.4194
			}
		}, {
			name: "london",
			coordinates: {
				lat: 51.5074,
				lng: 0.1278
			}
		}, {
			name: "sao paulo",
			coordinates: {
				lat: -23.5505,
				lng: 46.6333
			}
		}
	];

	var i = -1; //variable for looping through country objects
	var n = countries.length;

	(function transition() {
		d3.transition()
			.duration(1250) //ms it takes for globe to change locations
			.each("start", function() {
				i = (i + 1) % n; //adds one. mod n restarts the number when it gets to the end of the list

				//this is the spot where you would update all of the other charts and graphs and stuff. Right now I'm just logging the name
				console.log(countries[i].name)
			})
			.tween("rotate", function() {
				//needs to be in form: north, west
				lat = countries[i].coordinates.lat;
				lng = countries[i].coordinates.lng;
				var r = d3.interpolate(projection.rotate(), [lng, -lat]);
				return function(t) {
					projection.rotate(r(t)); //rotates the map
					c.clearRect(0, 0, width, height); //resets the position
					c.fillStyle = "#ccc", c.beginPath(), path(land), c.fill(); //land color
					var center = projection([-lng, lat]);
					c.strokeStyle = "#000", c.fillStyle = "#f00", c.beginPath(), c.arc(center[0], center[1], 5, 0, 2 * Math.PI, false), c.lineWidth = 2, c.fill(), c.stroke(); //draws on point
					c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke(); //border colors
					c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke(); //globe border color
				};
			})
			.transition()
			.delay(2000) //ms globe waits at each location
			.each("end", transition);
	})();
}