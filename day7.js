// Day 7 challenge
// Some assembly required
// Assemble the wires and find out which signal the wire A has

// Read the input file through and save the instructions to a Map
// Find the wires which have already a certain signal assigned
// Save the information of those wires and their signals
// Loop through instructions to find new signal values to assing to wires
// based on already found wires with signals

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
    var signalMap = new Map();
    var instructionMap = new Map();
    var whereIns = []; //Tells in the keys of which instructions the key is used
    var instructions = input.split('\n');
    var instrWords = [];

    for(var i = 0; i < instructions.length; ++i) {
        instrWords = instructions[i].split(' ');
        if(instructions[i].indexOf('AND') > -1 || instructions[i].indexOf('OR') > -1 ||
        instructions[i].indexOf('LSHIFT') > -1 || instructions[i].indexOf('RSHIFT') > -1) {
            if(whereIns[instrWords[2]] === undefined) {
                whereIns[instrWords[2]] = [];
            }
            if(whereIns[instrWords[0]] === undefined) {
                whereIns[instrWords[0]] = [];
            }
            whereIns[instrWords[2]].push(instrWords[4]);
            whereIns[instrWords[0]].push(instrWords[4]);
        }
        if(instructions[i].indexOf('AND') > -1){
            instructionMap.set(instrWords[4], {operation:'AND', value:false, right:instrWords[2], left:instrWords[0]});
        } else if(instructions[i].indexOf('OR') > -1){
            instructionMap.set(instrWords[4], {operation:'OR', value:false, right:instrWords[2], left:instrWords[0]});
        } else if(instructions[i].indexOf('LSHIFT') > -1){
            instructionMap.set(instrWords[4], {operation:'LSHIFT', value:false, right:instrWords[2], left:instrWords[0]});
        } else if(instructions[i].indexOf('RSHIFT') > -1){
            instructionMap.set(instrWords[4], {operation:'RSHIFT', value:false, right:instrWords[2], left:instrWords[0]});
        } else if(instructions[i].indexOf('NOT') > -1){
            if(whereIns[instrWords[1]] === undefined){
                whereIns[instrWords[1]] = [];
            }
            whereIns[instrWords[1]].push(instrWords[3]);
            instructionMap.set(instrWords[3], {operation:'NOT', value:false, right:false, left:instrWords[1]});
        } else {
            if(instrWords[0].length > 0) {
                if(isNaN(instrWords[0])) {
                    instructionMap.set(instrWords[2], {operation:'INSERT', value:instrWords[0], right:false, left:false});
                } else {
                    signalMap.set(instrWords[2],parseInt(instrWords[0]));
                    instructionMap.set(instrWords[2], {operation:'VALUE', value:parseInt(instrWords[0]), right:false, left:false});
                }
            }
        }
    }

    calculateShifts(instructionMap,signalMap,whereIns);
    console.log("Signal "+instructionMap.get('a').value+" is provided to wire a.");
}
function calculateShifts(instructionMap,signalMap, whereIns) {
    var temps = new Map();
    var sig = 0;
    signalMap.forEach(function(value, key) {

        for(var x in whereIns[key]) {
            var tobj = instructionMap.get(whereIns[key][x]);

            if(tobj.operation === 'AND') {
                if(tobj.right === key && isNaN(tobj.left)) {
                    tobj.right = parseInt(value);
                    instructionMap.set(whereIns[key][x], tobj);
                } else if(tobj.right === key) {
                    sig = signalMap.get(key) & parseInt(tobj.left);
                    instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                    temps.set(whereIns[key][x],sig);
                } else if (tobj.left === key && isNaN(tobj.right)) {
                    tobj.left = parseInt(value);
                    instructionMap.set(whereIns[key][x], tobj);
                } else if(tobj.left === key) {
                    sig = signalMap.get(key) & parseInt(tobj.right);
                    instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                    temps.set(whereIns[key][x],sig);
                }
            } else if(tobj.operation === 'OR') {
                if(tobj.right === key && isNaN(tobj.left)) {
                    tobj.right = parseInt(value);
                    instructionMap.set(whereIns[key][x], tobj);
                } else if(tobj.right === key) {
                    sig = signalMap.get(key) | parseInt(tobj.left);
                    instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                    temps.set(whereIns[key][x],sig);
                } else if (tobj.left === key && isNaN(tobj.right)) {
                    tobj.left = parseInt(value);
                    instructionMap.set(whereIns[key][x], tobj);
                } else if(tobj.left === key) {
                    sig = signalMap.get(key) | parseInt(tobj.right);
                    instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                    temps.set(whereIns[key][x],sig);
                }
            }  else if(tobj.operation === 'LSHIFT') {
                sig = signalMap.get(tobj.left) << parseInt(tobj.right);
                instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                temps.set(whereIns[key][x],sig);
            }  else if(tobj.operation === 'RSHIFT') {
                sig = signalMap.get(tobj.left) >>> parseInt(tobj.right);
                instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                temps.set(whereIns[key][x],sig);
            }  else if(tobj.operation === 'NOT') {
                sig = ~ signalMap.get(tobj.left);
                instructionMap.set(whereIns[key][x], {operation:'VALUE', value:sig, right:false, left:false});
                temps.set(whereIns[key][x],sig);
            }
        }
    }, instructionMap);
    if(temps.size > 0 ) {
       return calculateShifts(instructionMap,temps,whereIns);
   } else {
       instructionMap.forEach(function(value, key) {
           if(value.operation === 'INSERT') {
               var valueToAssign = instructionMap.get(value.value).value;
               value.value = valueToAssign;
               value.operation = 'VALUE';
               instructionMap.set(key,value);
           }
       });
   }
}
