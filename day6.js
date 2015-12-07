// Day 6 challenge
// Light up the christmas lights according to the plan
// Caclulate how many lights are lit up ( part 1 ) and what is the brightness of the lights (part 2 ) ?

var rl = require('readline');
var fs = require('fs');
var _ = require('underscore');

var read = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
read.question("What is the name of the input file? ", function (answer) {
    read.close(); // close the instance of reading interface
    readFile(answer, makeTheLightGrid);
});
function readFile(file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
        callback(data);
    });
}
function makeTheLightGrid(input) {
    var lightMap = createMap(false);
    var brightnessMap = createMap(true);
    var instructions = input.split('\n');
    for(var i = 0; i < instructions.length; ++i) {
        operateLights(instructions[i], lightMap, brightnessMap);
    }
    lightsLit(lightMap, brightnessMap);
}
function createMap(numbers) {
    var myMap = new Map();
    var key = "";
    for(var i = 0; i < 1000; ++i) {
        for(var j = 0; j < 1000; ++j) {
            key = String(i)+"."+String(j);
            if(numbers) {
                myMap.set(key,0);
            } else {
                myMap.set(key,false);
            }
        }
    }
    return myMap;
}
function operateLights(instruction, lightMap, brightMap) {
    var splittedIns = instruction.split(' ');
    if(instruction.indexOf('toggle') > -1) {
        changeLights(lightMap, brightMap, splittedIns[1], splittedIns[3], 'toggle');
    } else if(instruction.indexOf('turn on') > -1) {
        changeLights(lightMap, brightMap, splittedIns[2], splittedIns[4], true);
    } else if(instruction.indexOf('turn off') > -1) {
        changeLights(lightMap, brightMap, splittedIns[2], splittedIns[4], false);
    }
}
function changeLights(lightMap, brightMap, startCorner, endCorner, whatToDo) {
    var coordinates = getSquare(startCorner.split(','),endCorner.split(','));
    var tmpBrightness = 0;
    var i =0;
    if(whatToDo === 'toggle') {
        for( i = 0; i < coordinates.length; ++i) {
            tmpBrightness = brightMap.get(coordinates[i]);
            tmpBrightness = tmpBrightness +2;
            brightMap.set(coordinates[i], tmpBrightness);
            if(lightMap.get(coordinates[i])) {
                lightMap.set(coordinates[i], false);
            } else {
                lightMap.set(coordinates[i], true);
            }
        }
    } else if(whatToDo) {
        for( i = 0; i < coordinates.length; ++i) {
            tmpBrightness = brightMap.get(coordinates[i]);
            ++tmpBrightness;
            brightMap.set(coordinates[i], tmpBrightness);
            lightMap.set(coordinates[i], true);
        }
    }  else if(!whatToDo) {
        for( i = 0; i < coordinates.length; ++i) {
            tmpBrightness = brightMap.get(coordinates[i]);
            if(tmpBrightness > 0) {
                --tmpBrightness;
            }
            brightMap.set(coordinates[i], tmpBrightness);
            lightMap.set(coordinates[i], false);
        }
    }

}
function getSquare(start, end) {
    var coords = [];
    var startX = parseInt(start[0]);
    var startY = parseInt(start[1]);
    var endX = parseInt(end[0]);
    var endY = parseInt(end[1]);
    for(var i = startX; i <= endX; ++i) {
        for(var j = startY; j <= endY; ++j) {
            coords.push(String(i)+"."+String(j));
        }
    }
    return coords;
}

function lightsLit(lightMap, brightMap) {
    var lightsLitCount = 0;
    var lightBrightness = 0;
    for (var key of lightMap.keys()) {
        if(lightMap.get(key)) {
            ++lightsLitCount;
        }
        lightBrightness = lightBrightness + brightMap.get(key);
    }
    console.log('There are '+lightsLitCount+' lights lit up in the grid.');
    console.log('The brightness of the lights is  '+lightBrightness)
}