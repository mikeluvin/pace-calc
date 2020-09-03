import React, {useState} from 'react';
import Time from './Time';
import Distance from './Distance';
import Pace from './Pace';
import { calcPace, calcDist, calcTime, calcSplits, validTime, validDist,  } from "./calculations";
import { Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';


/*const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
*/
function App() {
  //const classes = useStyles();
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
  const [paceErrDialogOpen, setPaceErrDialogOpen] = useState(false);
  const [distErrDialogOpen, setDistErrDialogOpen] = useState(false);
  const [timeErrDialogOpen, setTimeErrDialogOpen] = useState(false);
  const [splitsDialogOpen, setSplitsDialogOpen] = useState(false);
  const [splitsErrDialogOpen, setSplitsErrDialogOpen] = useState(false);
  const [splitsVec, setSplitsVec] = useState([]);

  //this is going to get very cumbersome...but maybe still better than just putting the
  //entire app in one page? idk man, idk.
  const timeHrHandler = (hrs) => {
    setTimeHr(hrs);
  }

  const timeMinHandler = (mins) => {
    setTimeMin(mins);
  }

  const timeSecHandler = (secs) => {
    setTimeSec(secs);
  }

  const distHandler = (dist) => {
    setDist(dist);
  }

  const distUnitHandler = (unit) => {
    setDistUnit(unit);
  }

  const paceHrHandler = (hrs) => {
    setPaceHr(hrs);
  }

  const paceMinHandler = (mins) => {
    setPaceMin(mins);
  }

  const paceSecHandler = (secs) => {
    setPaceSec(secs);
  }

  const paceUnitHandler = (unit) => {
    setPaceUnit(unit);
  }

  const calcAndSetPace = () => {
    var hr = timeHr;
    var min = timeMin;
    var sec = timeSec;

    if (hr === ""){
      hr = 0;
    }
    if (min === "") {
      min = 0;
    }
    if (sec === "") {
      sec = 0;
    }
    var paceInfo = calcPace(hr, min, sec, dist, distUnit, paceUnit);
    setPaceHr(paceInfo.hr);
    setPaceMin(paceInfo.min);
    setPaceSec(paceInfo.sec);
    return paceInfo;
  }
  const handlePaceClick = () => {
    //console.log(timeHr + ":" + timeMin + ":" + timeSec);
    //console.log(dist + " " + distUnit + ' pace unit:' + paceUnit);
    //should prob do a check to make sure there's actually numbers entered in the time and dist fields
    if (!validTime(timeHr, timeMin, timeSec) || !validDist(dist)) {
      setPaceErrDialogOpen(true);
    } else {
      calcAndSetPace();
    }
  }

  const handleDistClick = () => {
    if (!validTime(timeHr, timeMin, timeSec) || !validTime(paceHr, paceMin, paceSec)) {
      setDistErrDialogOpen(true);
    } else {
      var hr = timeHr;
      var min = timeMin;
      var sec = timeSec;
      var pHr = paceHr;
      var pMin = paceMin;
      var pSec = paceSec;

      if (hr === "") hr = 0;
      if (min === "") min = 0;
      if (sec === "") sec = 0;
      if (pHr === "") pHr = 0;
      if (pMin === "") pMin = 0;
      if (pSec === "") pSec = 0;
      var result = calcDist(hr, min, sec, distUnit, pHr, pMin, pSec, paceUnit);
      setDist(result);
    }
  }

  //need to fix, this is just copied from the handlePace
  const handleTimeClick = () => {
    //should prob do a check to make sure there's actually numbers entered in the time and dist fields
    if (!validTime(paceHr, paceMin, paceSec) || !validDist(dist)) {
      setTimeErrDialogOpen(true);
    } else {
      var hr = paceHr;
      var min = paceMin;
      var sec = paceSec;

      if (hr === "") hr = 0;
      if (min === "") min = 0;
      if (sec === "") sec = 0;
      
      var result = calcTime(dist, distUnit, hr, min, sec, paceUnit);
      setTimeHr(result.hr);
      setTimeMin(result.min);
      setTimeSec(result.sec);
    }
  }

  const handleSplitsClick = () => {
    //need to check if there's enough info entered to actually calculate the splits
    if ((!validTime(timeHr, timeMin, timeSec) || !validDist(dist)) && (!validTime(timeHr, timeMin, timeSec) || !validTime(paceHr, paceMin, paceSec))) { 
      setSplitsErrDialogOpen(true);
    } else {
      var paceInfo = calcAndSetPace();
      setSplitsVec(calcSplits(paceInfo.inSec, paceUnit, dist, distUnit));
      setSplitsDialogOpen(true);
    }
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
          <Button variant="outlined" onClick={handleTimeClick}>Calculate Time</Button>
        </Grid>
      </Grid>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Distance dist={dist} unit={distUnit} onDistChange={distHandler} onUnitChange={distUnitHandler}/>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleDistClick}>Calculate Distance</Button>
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
          <Button variant="outlined" onClick={handleSplitsClick}>Calculate Splits</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleReset}>Reset</Button>
      </Grid>
      </Grid>
      </Grid>
      </Grid>

      <Dialog open={paceErrDialogOpen} onClose={() => {setPaceErrDialogOpen(false)}} >
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To calculate pace, you must input a valid time and distance.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setPaceErrDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={distErrDialogOpen} onClose={() => {setDistErrDialogOpen(false)}} >
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To calculate distance, you must input a valid time and pace.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setDistErrDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={timeErrDialogOpen} onClose={() => {timeErrDialogOpen(false)}} >
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To calculate time, you must input a valid distance and pace.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setTimeErrDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={splitsErrDialogOpen} onClose={() => {setSplitsErrDialogOpen(false)}} >
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To calculate splits, you must input a valid time and distance, or a valid time and pace.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setSplitsErrDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={splitsDialogOpen} onClose={() => {setSplitsDialogOpen(false)}} >
            <DialogTitle>Splits</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Split #</TableCell>
                      <TableCell align="right">Distance</TableCell>
                      <TableCell align="right">Times</TableCell>
                    </TableRow>
                  </TableHead>
                <TableBody>
                  {splitsVec.map((row, i) => (
                    <TableRow key={i + 1}>
                      <TableCell component="th" scope="row">
                        {row.splitNum}
                      </TableCell>
                      <TableCell align="right">{row.dist}</TableCell>
                      <TableCell align="right">{row.splitTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setSplitsDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>
   </Container>
  );
}

export default App;
