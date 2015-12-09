// Day 8 challenge: Matchsticks

// Read the input file
// Extract words and calculate the spesial cases determined in the challenge

var rl = require('readline');
var fs = require('fs');
var _ = require('underscore');

var read = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
read.question("What is the name of the input file? ", function (answer) {
    read.close();
    readFile(answer, assembleTheWires);
});
function readFile(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
    });
}
function assembleTheWires(input) {
    var words = input.split('\n');
    var literalCharCount = 0;
    var inMemoryCharCount = 0;
    var literalAndInMemoryCount = 0;
    var tempObj = {};

    for(var i = 0; i < words.length; ++i) {
      if( words[i].length > 0 ) {
        literalCharCount += words[i].length;
        tempObj = calculateInMemoryChars(words[i]);
        inMemoryCharCount += tempObj.part1;
        literalAndInMemoryCount += tempObj.part2;
      }
    }
    console.log('Part 1 answer: '+(literalCharCount-inMemoryCharCount));
    console.log('Part 2: answer: '+(literalAndInMemoryCount-literalCharCount));

}

function calculateInMemoryChars(word) {
	var index  = 0;
	index = word.indexOf('\\\\');
	var xindex = 0;
  var doubleSlash = 0;
  var quotes = 0;
  var hexes = 0;
  while(index < word.length && index > 0) {
      ++doubleSlash;
    	index = word.indexOf('\\\\', index+2);
  }

	index = word.indexOf('\\\"');
  while(index < word.length && index > 0 && index+2 !== word.length) {
      ++quotes;
      index = word.indexOf('\\\"', index+2);
  }

	index = word.indexOf("\\x");
  var hexToDec = 0;
  while(index < word.length && index > 0) {
      if(word.substr(index+2,2).match(/[0-9a-f]{2}/)) {
        ++hexes;
      }
      index = word.indexOf("\\x", index+4);
  }
  return {
    part1: word.length - 2-  doubleSlash - quotes - (hexes*3),
    part2: word.length + 4 + (doubleSlash*2) + (quotes*2) + (hexes*1)
  };
}
