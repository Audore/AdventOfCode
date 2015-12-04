// Day 4 challenge
// Find a number wich will create combined with the input a md5 hash that starts with 5 and 6 leading zeros.

var rl = require('readline');
var _ = require('underscore');
var md5 = require('md5');

var read = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
read.question("Enter the input ", function (answer) {
    read.close(); // close the instance of reading interface
    findTheNumber(answer);
});

function findTheNumber(input) {
    var i = 100000;
    var numberFound = false;
    var hash ="";
    while(!numberFound) {
        hash = md5(input+i);
        if(hash.slice(0, 5) === "00000") {
            console.log('Hash has 5 leading zeros and the number to append is ' + i);
        }
        if(hash.slice(0, 6) === "000000") {
            console.log('Hash has 6 leading zeros and the number to append is ' + i);
            numberFound = true;
            break;
        }
        ++i;
    }
}