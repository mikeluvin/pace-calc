import React, {useState} from 'react';
import Time from './Time';
import Distance from './Distance';
import Pace from './Pace';
import { calcPace, calcDist, calcTime, calcSplits } from "./calculations";
import { Container, Grid, Button, Dialog, DialogTitle, DialogContentText } from "@material-ui/core";
import logo from './logo.svg';
import './App.css';

function App() {
  //we will only store the state here. It just makes more sense. Then, we can pass down the state
  //as props to populate the given text inputs.
  const [timeHr, setTimeHr] = useState("");
  const [timeMin, setTimeMin] = useState("");
  const [timeSec, setTimeSec] = useState("");
  const [dist, setDist] = useState("");
  //the children don't communicate with App until there's a change bc of how the selector works
  //so i'm initializing as miles
  const [distUnit, setDistUnit] = useState("miles");
  const [paceHr, setPaceHr] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [paceUnit, setPaceUnit] = useState("mile");
  const [dialogOpen, setDialogOpen] = useState(false);

  //this is going to get very cumbersome...but maybe still better than just putting the
  //entire app in one page? idk man, idk.
  const timeHrHandler = (hrs) => {
    setTimeHr(hrs);
    console.log("hr state passed to parent");
  }

  const timeMinHandler = (mins) => {
    setTimeMin(mins);
    console.log("min state passed to parent");
  }

  const timeSecHandler = (secs) => {
    setTimeSec(secs);
    console.log("sec state passed to parent");
  }

  const distHandler = (dist) => {
    setDist(dist);
    console.log("dist state passed to parent")
  }

  const distUnitHandler = (unit) => {
    setDistUnit(unit);
    console.log("dist unit state passed to parent");
  }

  const paceHrHandler = (hrs) => {
    setPaceHr(hrs);
    console.log("hr state passed to parent");
  }

  const paceMinHandler = (mins) => {
    setPaceMin(mins);
    console.log("min state passed to parent");
  }

  const paceSecHandler = (secs) => {
    setPaceSec(secs);
    console.log("sec state passed to parent");
  }

  const paceUnitHandler = (unit) => {
    setPaceUnit(unit);
    console.log("pace unit state passed to parent");
  }

  const handlePaceClick = () => {
    //console.log(timeHr + ":" + timeMin + ":" + timeSec);
    //console.log(dist + " " + distUnit + ' pace unit:' + paceUnit);
    //should prob do a check to make sure there's actually numbers entered in the time and dist fields
    if ((isNaN(timeHr) && isNaN(timeMin) && isNaN(timeSec)) || isNaN(dist)) {
      //could make this a dialog instead, or install the react-alert package
      alert("To calculate pace, input time and distance.");
    }
    var hr = timeHr;
    var min = timeMin;
    var sec = timeSec;

    if (isNaN(hr)) hr = 0;
    if (isNaN(min)) min = 0;
    if (isNaN(sec)) sec = 0;
    var paceInSec = calcPace(hr, min, sec, dist, distUnit, paceUnit);
    console.log(paceInSec);
    //convert back to hh:mm:ss.xx
    var calcPaceHr = Math.floor(paceInSec / 3600);
    var calcPaceMin = Math.floor(paceInSec / 60 % 60);
    var calcPaceSec = paceInSec - calcPaceHr * 3600 - calcPaceMin * 60;
    setPaceHr(calcPaceHr);
    setPaceMin(calcPaceMin);
    setPaceSec(calcPaceSec);
    console.log(calcPaceHr + ":" + calcPaceMin + ":" + calcPaceSec);
  }

  const handleReset = () => {
    setTimeHr("");
    setTimeMin("");
    setTimeSec("");
    setDist("");
    setDistUnit("miles");
    setPaceHr("");
    setPaceMin("");
    setPaceSec("");
    setPaceUnit("mile");
  }

  return (
    <Container className="App">
      <Grid container direction="column" spacing={5} justify-content="space-evenly" alignItems="center">
      <Grid item>
        <h1>Pace Calculator</h1>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Time hr={timeHr} min={timeMin} sec={timeSec} onHrChange={timeHrHandler} onMinChange={timeMinHandler} onSecChange={timeSecHandler}/>
        </Grid>
        <Grid item>
          <Button variant="outlined">Calculate Time</Button>
        </Grid>
      </Grid>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Distance dist={dist} unit={distUnit} onDistChange={distHandler} onUnitChange={distUnitHandler}/>
        </Grid>
        <Grid item>
          <Button variant="outlined">Calculate Distance</Button>
        </Grid>
      </Grid>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Pace hr={paceHr} min={paceMin} sec={paceSec} unit={paceUnit} onHrChange={paceHrHandler} onMinChange={paceMinHandler} onSecChange={paceSecHandler} onUnitChange={paceUnitHandler}/>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handlePaceClick}>Calculate Pace</Button>
        </Grid>
      </Grid>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Button variant="outlined" onClick={() => setDialogOpen(true)}>Calculate Splits</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
      </Grid>
      </Grid>
      </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}} >
            <DialogTitle>Splits</DialogTitle>
            <DialogContentText>
                yo this do be a test doe
            </DialogContentText>
            <Button variant="outlined" onClick={() => setDialogOpen(false)}>Close</Button>
      </Dialog>
   </Container>
  );
}

export default App;
