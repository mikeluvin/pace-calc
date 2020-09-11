const KM_PER_MI = 1.609344;
const YARDS_PER_MI = 1760;

//returns a multiplier to convert the distance unit to the pace unit 
function convDistToPaceUnit(distUnit, paceUnit) {
    var multiplier;
    
    if (distUnit === "miles") {
        if (paceUnit === "km") {
            //convert the dist to km
            multiplier = KM_PER_MI;
        } else if (paceUnit === "200m") {
            multiplier = KM_PER_MI * 5;
        } else if (paceUnit === "400m") {
            multiplier = KM_PER_MI * 2.5;
        } else if (paceUnit === "800m") {
            multiplier = KM_PER_MI * 1.25;
        } else {
            //do nothing
            multiplier = 1;
        }
    }
    // km 
    else if (distUnit === "km") {
        if (paceUnit === "mile") {
            multiplier = 1 / KM_PER_MI;
        } else if (paceUnit === "200m") {
            multiplier = 5;
        } else if (paceUnit === "400m") {
            multiplier = 2.5;
        } else if (paceUnit === "800m") {
            multiplier = 1.25;
        } else {
            multiplier = 1;
        }
    }
    //meters 
    else if (distUnit === "meters") {
        if (paceUnit === "km") {
            //convert the dist to km
            multiplier = 1 / 1000;
        } else if (paceUnit === "200m") {
            multiplier = 1 / 1000 * 5;
        } else if (paceUnit === "400m") {
            multiplier = 1 / 1000 * 2.5;
        } else if (paceUnit === "800m") {
            multiplier = 1 / 1000 * 1.25;
        } else if (paceUnit === "mile") {
            multiplier = 1 / 1000 / KM_PER_MI;
        }
    } 
    //yards 
    else if (distUnit === "yards") {
        if (paceUnit === "mile") {
            multiplier = 1 / YARDS_PER_MI;
        } else if (paceUnit === "200m") {
            multiplier = 1 / YARDS_PER_MI * KM_PER_MI * 5;
        } else if (paceUnit === "400m") {
            multiplier = 1 / YARDS_PER_MI * KM_PER_MI * 2.5;
        } else if (paceUnit === "800m") {
            multiplier = 1 / YARDS_PER_MI * KM_PER_MI * 1.25;
        } else if (paceUnit === "km") {
            multiplier = 1 / YARDS_PER_MI * KM_PER_MI ;
        }
    }

    return multiplier;
}

//calculates the pace and returns it in seconds per paceUnit
function calcPace(timeHr, timeMin, timeSec, dist, distUnit, paceUnit) {
    //first, convert the time to seconds
    var timeInSec = parseInt(timeHr) * 3600 + (timeMin) * 60 + parseFloat(timeSec);
    //cases depending on the dist unit and the pace unit

    var distInPaceUnit = dist * convDistToPaceUnit(distUnit, paceUnit);

    //ultimately, this is the final calculation
    var paceInSec = timeInSec/distInPaceUnit;
    var calcPaceHr = Math.floor(paceInSec / 3600);
    var calcPaceMin = Math.floor(paceInSec / 60 % 60);
    var calcPaceSec = paceInSec - calcPaceHr * 3600 - calcPaceMin * 60;
    return {
        inSec: paceInSec,
        hr: calcPaceHr,
        min: calcPaceMin,
        sec: calcPaceSec
    }
}

function calcDist(timeHr, timeMin, timeSec, distUnit, paceHr, paceMin, paceSec, paceUnit) {
    var multiplier = convDistToPaceUnit(distUnit, paceUnit);
    var timeInSec = parseInt(timeHr) * 3600 + parseInt(timeMin) * 60 + parseFloat(timeSec);
    var paceInSec = parseInt(paceHr) * 3600 + parseInt(paceMin) * 60 + parseFloat(paceSec);
    var dist = timeInSec / paceInSec / multiplier;
    return dist;
}

//returns the time in an object containing the time in seconds, and each
//of the hour, min, sec separately
function calcTime(dist, distUnit, paceHr, paceMin, paceSec, paceUnit) {
    var paceInSec = parseInt(paceHr) * 3600 + parseInt(paceMin) * 60 + parseFloat(paceSec);
    var distInPaceUnit = dist * convDistToPaceUnit(distUnit, paceUnit);
    var timeInSec = paceInSec * distInPaceUnit;
    var calcTimeHr = Math.floor(timeInSec / 3600);
    var calcTimeMin = Math.floor(timeInSec / 60 % 60);
    var calcTimeSec = timeInSec - calcTimeHr * 3600 - calcTimeMin * 60;
    return {
        inSec: timeInSec,
        hr: calcTimeHr,
        min: calcTimeMin,
        sec: calcTimeSec
    }
}

 //return an array with each split so we can iterate over it
function calcSplits(paceInSec, paceUnit, dist, distUnit) {
    var paceUnitNum;
    var distInPaceUnit = dist * convDistToPaceUnit(distUnit, paceUnit);
    if (paceUnit === "mile" || paceUnit === "km") {
        paceUnitNum = 1;
    } else if (paceUnit.endsWith("0m")) {
        paceUnitNum = parseInt(paceUnit.slice(0, 3));
    }

    var unit;
    //if i add yards as a pace option, will need to add another case
    if (paceUnit.endsWith('0m')) {
        unit = 'm';
    } else {
        unit = paceUnit; //will change when i add more options
    }

    var accum_dist; //the cumulative distance in the for loop
    var num_splits = Math.ceil(distInPaceUnit);
    var splitNum; //the current split # in the for loop
    console.log("splits: " + num_splits);
    var split_info = new Array(num_splits);

    for (let i = 0 ; i < num_splits; i++) {
        //****need to convert the pace to a string hh:mm:ss.xx

        if (i === 0) {
            accum_dist = paceUnitNum; //first split is just the pace/unit
            splitNum = i + 1;
        } else if (i + 1 === num_splits) {
            splitNum = distInPaceUnit;
            accum_dist = distInPaceUnit * paceUnitNum;
            //if setting to 4 decimals results in a diff #, then we need to truncate
            if (Math.abs(splitNum.toFixed(4) - splitNum) > Number.EPSILON) {
                splitNum = splitNum.toFixed(4);
            }
            if (Math.abs(accum_dist.toFixed(4) - accum_dist) > Number.EPSILON) {
                accum_dist = accum_dist.toFixed(4);
            }
        } else {
            splitNum = i + 1;
            accum_dist += paceUnitNum;
        }
        var splitInSec;
        splitInSec = paceInSec * accum_dist / paceUnitNum;
        var calcPaceHr = Math.floor(splitInSec / 3600);
        var calcPaceMin = Math.floor(splitInSec / 60 % 60);
        var calcPaceSec = splitInSec - calcPaceHr * 3600 - calcPaceMin * 60;
        var hrStr;

        if (calcPaceHr === 0) {
            hrStr = "";
        } else {
            hrStr = String(calcPaceHr).padStart(2, '0') + ":";
        }
        split_info[i] = {
            splitNum: splitNum,
            dist: accum_dist + " " + unit,
            splitTime: hrStr + String(calcPaceMin).padStart(2, '0') + ":" + calcPaceSec.toFixed(2).padStart(5, '0')
        }

    }
    return split_info;
}

function validTime(hr, min, sec) {
    //issue: type conversion for Number.isInteger. So i will do it the jank way lol
    var hrBool = hr === "" || (hr >= 0 && parseInt(hr) == hr);
    var minBool = min === "" || (min >= 0 && min < 60 && parseInt(min) == min);
    var secBool = sec === "" || (sec >= 0 && sec < 60); 

    var totalInputBool = hr !== "" || min !== "" || sec !== "";
    //one must be > 0
    var totalInputBool2 = hr > 0  || min > 0 || sec > 0;
    return hrBool && minBool && secBool && totalInputBool && totalInputBool2;
}

function validDist(dist) {
    return dist !== "" && dist > 0;
}

export {
    calcPace,
    calcDist,
    calcTime,
    calcSplits,
    validTime,
    validDist
}