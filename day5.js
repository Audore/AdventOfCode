// Day 5 challenge
// Find out if a string is naughty or nice

var rl = require('readline');
var fs = require('fs');
var _ = require('underscore');

var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});
read.question("What is the name of the input file? ", function (answer) {
  read.close();
  readFile(answer, countNiceStrings);
});
function readFile(file, callback) {
	fs.readFile(file, 'utf8', function (err, data) {
	  if (err) throw err;
	  callback(data);
	});
}
function countNiceStrings(input) {
  var niceCount = 0;
  var secondNiceCount =0;
  var words = input.split('\n');
	for (var i = 0; i < words.length; i++) {
    if(words.length > 0 && isNice(words[i])) {
      ++niceCount;
    }
    if(words.length > 0 && isNiceSecond(words[i])) {
      ++secondNiceCount;
    }
	}
  console.log('Part 1 : There is '+niceCount+' nice words');
  console.log('Part 2 : There is '+secondNiceCount+' nice words');
}
function isNice(word) {
  if(word.match(/ab|cd|pq|xy/)) {
    return false;
  }
  if(word.match(/([a-z])\1/) && word.match(/([aeiou].*[aeiou].*[aeiou])/)) {
    return true;
  }
  return false;
}
function isNiceSecond(word) {
  if(word.match(/([a-z][a-z])[a-z]*\1/) && word.match(/([a-z])[a-z]\1/)) {
    return true;
  }
  return false;
}
