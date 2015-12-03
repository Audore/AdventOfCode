// Day 1 input challenge
// Calculate which floor santa should go based on parenthesis

// Read the input file
// Calculate both opening and closing parenthesis
var rl = require('readline');
var fs = require('fs');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

read.question("What is the name of the input file? ", function (answer) {
  read.close(); // close the instance of reading interface
  readFile(answer, countParenthesis);
});
function readFile(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) throw err;
	  callback(data);
	});
}
function countParenthesis(input) {
	var open = 0;
	var close = 0;
	var floor = 0;
	var firstBasement = false;
	for (var i = 0; i < input.length; i++) {
		if(input[i] == '(') {
			++open;
			++floor;
		} else if(input[i] == ')') {
			++close
			--floor;
		}
		if(floor < 0 && !firstBasement) {
			console.log("Santa should go to basement at position "+ i);
			firstBasement = true;
		}
	}
	var theFloor = open - close;
	console.log('The right floor is '+floor);
	console.log('Santa should be in '+theFloor);
}
