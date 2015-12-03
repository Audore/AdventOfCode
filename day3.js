// Day 3 challenge
// Calculate how many houses Santa and RoboSanta visit based on the input

var rl = require('readline');
var fs = require('fs');
var _ = require('underscore');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.question("What is the name of the input file? ", function (answer) {
  read.close(); // close the instance of reading interface
  readFile(answer, countHousesWithPresents);
});
function readFile(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) throw err;
	  callback(data);
	});
}
function roboSantaHelps(input) {
	var houseMap =  [];
	var xSanta = 0;
	var ySanta = 0;
	var xRoboSanta = 0;
	var yRoboSanta = 0;
	var tmpKey = String(xRoboSanta)+String(yRoboSanta);
	var sameKey =0;
	for (var i = 0; i < input.length; i++) {
		if( i%2 === 0) {
			//RoboSanta
			if(input[i] === '>') {
				++xRoboSanta;
			} else if (input[i] === '<') {
				--xRoboSanta;
			} else if (input[i] === '^') {
				++yRoboSanta;
			} else if (input[i] === 'v') {
				--yRoboSanta;
			}
			tmpKey = String(xRoboSanta)+'*'+String(yRoboSanta);
		} else {
			//Santa
			if(input[i] === '>') {
				++xSanta;
			} else if (input[i] === '<') {
				--xSanta;
			} else if (input[i] === '^') {
				++ySanta;
			} else if (input[i] === 'v') {
				--ySanta;
			}
			tmpKey = String(xSanta)+'*'+String(ySanta);
		}

		if(houseMap.indexOf(tmpKey) < 0) {
			houseMap.push(tmpKey);
		}
	}
	console.log("RoboSanta delivered presents to "+_.uniq(houseMap).length+" houses.");
}
function countHousesWithPresents(input) {
	var houseMap =  [];
	var x = 0;
	var y = 0;
	var tmpKey = String(x)+'*'+String(y);
	houseMap.push(tmpKey);
	var sameKey =0;
	for (var i = 0; i < input.length; i++) {

		if(input[i] === '>') {
			++x;
		} else if (input[i] === '<') {
			--x;
		} else if (input[i] === '^') {
			++y;
		} else if (input[i] === 'v') {
			--y;
		}
        // Without the * symbol between coordinates x:2, y:22 and x:22, y:2 are
        // considered the same even though those are not
		tmpKey = String(x)+'*'+String(y);

		if(houseMap.indexOf(tmpKey) < 0) {
			houseMap.push(tmpKey);
		}
	}
	console.log("Santa delivered presents to "+_.uniq(houseMap).length+" houses.");
    roboSantaHelps(input);
}
