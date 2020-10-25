import React from 'react';
import { TextField, Grid, MenuItem, Select, makeStyles, FormControl, Typography, Box } from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 75,
    },
    selectEmpty: {
      margin: theme.spacing(1),
      minWidth: 75,
    },
  }));
  

export default function Distance(props) {
    const classes = useStyles();
    //const [dist, setDist] = useState("");
    //const [unit, setUnit] = useState("miles");
    const { dist, unit, commonDist, onDistChange, onUnitChange, onCommonDistChange } = props;


    return (
        <React.Fragment>
            <Grid className="main" container direction="row" alignItems="center">
                <Grid container item xs={3}>
                    <Grid item>
                    <TextField className="distText" id="dist" label="dist" type="number" min="0" variant="outlined"
                        onChange={(event) => {
                            var value = event.target.value;
                            onDistChange(value);                                
                            }} 
                        value={dist}
                        error={dist < 0} /> 
                    </Grid>
                </Grid>
                <Grid container item direction="row" alignItems="center" wrap="wrap" xs={9}>
                <Grid item className="dist-unit-container">
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="unit"
                            id="unit"
                            displayEmpty
                            value={unit}
                            onChange={(event) => {
                                onUnitChange(event.target.value);
                                onCommonDistChange("");
                            }}
                        >
                            <MenuItem value={"miles"}>miles</MenuItem>
                            <MenuItem value={"km"}>km</MenuItem>
                            <MenuItem value={"meters"}>meters</MenuItem>
                            <MenuItem value={"yards"}>yards</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography>OR</Typography>
                </Grid>
                <Grid item className="common-dist-container">
                {/* <InputLabel>Common Distance</InputLabel> */}
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="common-dist"
                            id="common-dist"
                            displayEmpty
                            value={commonDist}
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={(event) => {
                                onCommonDistChange(event.target.value);
                            }}
                        >
                            <MenuItem value={""}><em>Pick Event</em></MenuItem>
                            <MenuItem value={"Marathon"}>Marathon</MenuItem>
                            <MenuItem value={"Half-Marathon"}>Half</MenuItem>
                            <MenuItem value={"5K"}>5K</MenuItem>
                            <MenuItem value={"10K"}>10K</MenuItem>
                            <MenuItem value={"8K"}>8K</MenuItem>
                            <MenuItem value={"5M"}>5 mile</MenuItem>                                
                        </Select>
                        {/* <FormHelperText>Choose Common Distance</FormHelperText> */}
                        </FormControl>
                </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}