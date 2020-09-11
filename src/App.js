import React, {useState} from 'react';
import Time from './Time';
import Distance from './Distance';
import Pace from './Pace';
import Layout from './Layout';
import { calcPace, calcDist, calcTime, calcSplits, validTime, validDist,  } from "./calculations";
import { Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
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

  const makeTimeNums = (hr, min, sec) => {
    var hrNum = hr;
    var minNum = min;
    var secNum = sec;

    if (hrNum === "") hrNum = 0;
    if (minNum === "") minNum = 0;
    if (secNum === "") secNum = 0;

    return {
      hr: hrNum,
      min: minNum,
      sec: secNum
    };
  }

  const calcAndSetPace = () => {
    var timeNums = makeTimeNums(timeHr, timeMin, timeSec);

    var paceInfo = calcPace(timeNums.hr, timeNums.min, timeNums.sec, dist, distUnit, paceUnit);
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
      var timeNums = makeTimeNums(timeHr, timeMin, timeSec);
      var paceNums = makeTimeNums(paceHr, paceMin, paceSec);

      var result = calcDist(timeNums.hr, timeNums.min, timeNums.sec, distUnit, paceNums.hr, paceNums.min, paceNums.sec, paceUnit);
      setDist(result);
    }
  }

  const handleTimeClick = () => {
    //should prob do a check to make sure there's actually numbers entered in the time and dist fields
    if (!validTime(paceHr, paceMin, paceSec) || !validDist(dist)) {
      setTimeErrDialogOpen(true);
    } else {
      var paceNums = makeTimeNums(paceHr, paceMin, paceSec);      
      var result = calcTime(dist, distUnit, paceNums.hr, paceNums.min, paceNums.sec, paceUnit);
      setTimeHr(result.hr);
      setTimeMin(result.min);
      setTimeSec(result.sec);
    }
  }

  const handleSplitsClick = () => {
    //need to check if there's enough info entered to actually calculate the splits
    //given that the time is valid, make sure the distance is also valid.
    var paceInfo;
    if (validTime(timeHr, timeMin, timeSec)) {
      if (validDist(dist)) {
        paceInfo = calcAndSetPace();
        setSplitsVec(calcSplits(paceInfo.inSec, paceUnit, dist, distUnit));
        setSplitsDialogOpen(true);
      } else {
        setSplitsErrDialogOpen(true);
      }
    //given that the pace is valid, check that the distance is valid.
    } else if (validTime(paceHr, paceMin, paceSec)) {
      if (validDist(dist)) {
        var paceNums = makeTimeNums(paceHr, paceMin, paceSec); 
        var timeInfo = calcTime(dist, distUnit, paceNums.hr, paceNums.min, paceNums.sec, paceUnit);
        setTimeHr(timeInfo.hr);
        setTimeMin(timeInfo.min);
        setTimeSec(timeInfo.sec);
        paceInfo = calcPace(timeInfo.hr, timeInfo.min, timeInfo.sec, dist, distUnit, paceUnit);
        setSplitsVec(calcSplits(paceInfo.inSec, paceUnit, dist, distUnit));
        setSplitsDialogOpen(true);
      } else {
        setSplitsErrDialogOpen(true);
      }
    } else {
      setSplitsErrDialogOpen(true);
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
    <Layout className="title">
    <Container className="App">
      <Grid container direction="column" spacing={2} justify-content="space-evenly" alignItems="center">
      <Grid item >
        <TableContainer className="homeTablePaper" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="homeTableHead" align="left">Time</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={handleTimeClick}>Calculate</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="left" colSpan={2}>
                <Time hr={timeHr} min={timeMin} sec={timeSec} onHrChange={timeHrHandler} onMinChange={timeMinHandler} onSecChange={timeSecHandler}/>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
      <TableContainer className="homeTablePaper" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="homeTableHead" align="left">Distance</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={handleDistClick}>Calculate</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="left" colSpan={2}>
                  <Distance dist={dist} unit={distUnit} onDistChange={distHandler} onUnitChange={distUnitHandler}/>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
      <TableContainer className="homeTablePaper" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="homeTableHead" align="left">Pace</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={handlePaceClick}>Calculate</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align="left" colSpan={2}>
                <Pace hr={paceHr} min={paceMin} sec={paceSec} unit={paceUnit} onHrChange={paceHrHandler} onMinChange={paceMinHandler} onSecChange={paceSecHandler} onUnitChange={paceUnitHandler}/>
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
      <Grid container direction="row" alignItems="center">
        {/* <Grid item> */}
          <Button variant="contained" color="primary" onClick={handleSplitsClick}>Show Splits</Button>
        {/* </Grid> */}
        {/* <Grid item> */}
        <Typography>&nbsp;&nbsp;</Typography>
          <Button variant="contained" color="primary" onClick={handleReset}>Reset</Button>
        {/* </Grid> */}
      </Grid>
      </Grid>
      <Grid item>
        <a href="https://sites.northwestern.edu/runners/" target="_blank" rel="noopener noreferrer">
          <img className="nutcLogo" src={require("./nutclogo.jpg")} alt="NUTC logo"/>
        </a>
      </Grid>
      <Grid item>
        <Typography>Developed by an NUTC member, Class of 2022</Typography>
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
              <Button variant="contained" color="secondary" onClick={() => setPaceErrDialogOpen(false)}>Close</Button>
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
              <Button variant="contained" color="secondary" onClick={() => setDistErrDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>

      <Dialog open={timeErrDialogOpen} onClose={() => {setTimeErrDialogOpen(false)}} >
            <DialogTitle>Oops!</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To calculate time, you must input a valid distance and pace.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="secondary" onClick={() => setTimeErrDialogOpen(false)}>Close</Button>
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
              <Button variant="contained" color="secondary" onClick={() => setSplitsErrDialogOpen(false)}>Close</Button>
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
              <Button variant="contained" color="secondary" onClick={() => setSplitsDialogOpen(false)}>Close</Button>
            </DialogActions>
      </Dialog>
   </Container>
   </Layout>
  );
}

export default App;
