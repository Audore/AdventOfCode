// Day 2 input challenge
// Calculate how much wrapping paper is required based on dimensions of the gifts

// Read the input file
// Read one line of the input
// Extract the height, width and length
// Calculate the needed wrapping paper
// Add extra for the smallest amount
var rl = require('readline');
var fs = require('fs');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.question("What is the name of the input file? ", function (answer) {
  read.close(); // close the instance of reading interface
  readFile(answer, splitToDimensions);
});
function readFile(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) throw err;
	  callback(data);
	});
}
function splitToDimensions(input) {
	var dimensions = input.split('\n');
	var totalWrapper = 0;
	var totalRibbon = 0;
	for (var i = 0; i < dimensions.length; i++) {
		if(dimensions[i].length > 1) {
			totalWrapper += extractDimensions(dimensions[i],calculateWrapper);
			totalRibbon += extractDimensions(dimensions[i],calculateRibbon);
		}

	}
	console.log("Wrapper is needed> "+totalWrapper);
	console.log("Ribbon is needed> "+totalRibbon);
}

function extractDimensions(input, callback) {
	var tmpDim = input.split('x');
	var length = parseInt(tmpDim[0]);
	var height = parseInt(tmpDim[1]);
	var width = parseInt(tmpDim[2]);
	return callback(length, height, width);
}

function calculateWrapper(l,h,w) {
	var side1 = l*w;
	var side2 = w*h;
	var side3 = h*l;
	var wrapper = (2*side1) + (2*side2) + (2*side3) + Math.min(side1,side2,side3);
	return wrapper;
}

function calculateRibbon(l,h,w) {
	var maxSide = Math.max(l,h,w);
	var ribbon = 0;
	if( l == maxSide) {
		ribbon = h+h+w+w;
	} else if (h == maxSide) {
		ribbon = l+l+w+w;
	} else if (w == maxSide) {
		ribbon = h+h+l+l;
	}
	ribbon += l*h*w;
	return ribbon;
}
