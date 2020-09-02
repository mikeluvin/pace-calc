const KM_PER_MI = 1.609344;
const YARDS_PER_MI = 1760;

//calculates the pace and returns it in seconds per paceUnit
function calcPace(timeHr, timeMin, timeSec, dist, distUnit, paceUnit) {
    console.log(timeHr + ":" + timeMin + ":" + timeSec);
    console.log(dist + " " + distUnit + ' pace unit:' + paceUnit);

    //first, convert the time to seconds
    var timeInSec = timeHr * 3600 + timeMin * 60 + parseFloat(timeSec);
    //cases depending on the dist unit and the pace unit

    var distInPaceUnit;

    //all cases where the distance is in miles
    if (distUnit === "miles") {
        if (paceUnit === "km") {
            //convert the dist to km
            distInPaceUnit = dist * KM_PER_MI;
        } else if (paceUnit === "400") {
            distInPaceUnit = dist * KM_PER_MI * 2.5;
        } else {
            //do nothing
            distInPaceUnit = dist;
        }
    }
    // km 
    else if (distUnit === "km") {
        if (paceUnit === "mile") {
            distInPaceUnit = dist / KM_PER_MI;
        } else if (paceUnit === "400") {
            distInPaceUnit = dist * 2.5;
        } else {
            distInPaceUnit = dist;
        }
    }
    //meters 
    else if (distUnit === "meters") {
        if (paceUnit === "km") {
            //convert the dist to km
            distInPaceUnit = dist / 1000;
        } else if (paceUnit === "400") {
            distInPaceUnit = dist / 1000 * 2.5;
        } else if (paceUnit === "mile") {
            distInPaceUnit = dist / 1000 / KM_PER_MI;
        }
    } 
    //yards 
    else if (distUnit === "yards") {
        if (paceUnit === "mile") {
            distInPaceUnit = dist / YARDS_PER_MI;
        } else if (paceUnit === "400") {
            distInPaceUnit = dist / YARDS_PER_MI * KM_PER_MI * 2.5;
        } else if (paceUnit === "km") {
            distInPaceUnit = dist / YARDS_PER_MI * KM_PER_MI ;
        }
    }

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

function calcDist(args) {

}

function calcTime(args) {

}

 //return an array with each split so we can iterate over it
function calcSplits(paceInSec, paceUnit, dist, distUnit) {
    //**just realized that I need to consider the relationship bw the distUnit and paceUnit
    //may just make a helper function that does all the conversions so i can use it in other functions

    console.log(paceUnit + "&" + distUnit);
    var paceUnitNum;
    var distInPaceUnit;
    if (paceUnit == "mile") {
        paceUnitNum = 1;
        distInPaceUnit = dist;
    } else if (paceUnit == "400" && distUnit == "miles") {
        console.log("hi");
        paceUnitNum = 400;
        distInPaceUnit = dist * 1609.344 / 2.5;
    }
    var accum_dist = paceUnitNum; //first split is just the pace/unit
    var num_splits = Math.ceil(distInPaceUnit / paceUnitNum);
    console.log("splits: " + num_splits);
    var split_info = new Array(num_splits);
    for (let i = 0 ; i < num_splits; i++) {
        //****need to convert the pace to a string hh:mm:ss.xx
        var splitInSec = paceInSec * accum_dist;
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
            dist: accum_dist,
            unit: paceUnit,
            splitTime: hrStr + String(calcPaceMin).padStart(2, '0') + ":" + calcPaceSec.toFixed(2).padStart(5, '0')
        }
        accum_dist += paceUnitNum;
        if (accum_dist > dist) {
            accum_dist = dist;
        }
    }
    console.log(split_info);
    return split_info;
}

function validTime(hr, min, sec) {
    //console.log(hr==="");
    //console.log(hr >= 0 );
    //console.log(parseInt(hr) == hr);
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
    console.log(dist !== "");
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