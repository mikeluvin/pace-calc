import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, InputLabel, MenuItem, Select, makeStyles, FormHelperText, FormControl } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  
export default function Pace(props) {
    const classes = useStyles();
    const { hr, min, sec, unit, onHrChange, onMinChange, onSecChange, onUnitChange } = props;


    return (
        <Container>
            <Grid>
                <Grid className="main" container direction="row">
                    <Grid item>
                        <TextField id="hours" label="hrs" type="number" min="0" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                console.log(value);
                                value.match("^[0-9]*$") ? onHrChange(value) : onHrChange("");
                                
                                }} 
                            value={hr}
                            error={hr < 0}   /> 
                    </Grid>
                    <Grid item>
                        <TextField id="mins" label="mins" type="number" min="0" max="60" step="1" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                console.log(value);
                                //regex to validate input! no decimals or negatives allowed.
                                value.match("^[0-9]*$") ? onMinChange(value) : onMinChange("");
                                
                            }}
                            value={min}  
                            error={min < 0 || min > 60}  /> 
                    </Grid>
                    <Grid item>
                        {/*need to have a diff styling for when the input is invalid*/}
                        <TextField id="secs" label="secs" type="number" min="0" max="60" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                console.log(value);
                                //now, we only don't want negatives..idk, might have to do something else now. Cause
                                // I want the numbers input to pop up on mobile, so I should have "number" as the type..but the issue
                                // is that onChange isn't trigged when you type a "-" or a "." and idk why. This isn't an issue if i don't
                                // make the type "number"
                                onSecChange(event.target.value) 
                                //value.match("^\\d*$") ? setSecs(event.target.value) : setSecs(""); 
                               
                            }}
                            value={sec}
                            error={sec < 0 || sec > 60} /> 
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="per">Per</InputLabel>
                            <Select
                                labelId="per"
                                id="per"
                                displayEmpty
                                value={unit}
                                onChange={(event) => {
                                    onUnitChange(event.target.value);
                                    
                                }}
                            >
                                <MenuItem value={"mile"}>mile</MenuItem>
                                <MenuItem value={"km"}>km</MenuItem>
                                <MenuItem value={"400"}>400m</MenuItem>
                            </Select>
                            </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    );
}