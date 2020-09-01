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
    return paceInSec;
}

function calcDist(args) {

}

function calcTime(args) {

}

function calcSplits(args) {

    //return an array with each split so we can iterate over it
}


export {
    calcPace,
    calcDist,
    calcTime,
    calcSplits
}