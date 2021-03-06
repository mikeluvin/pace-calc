import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import './App.css';

export default function Time(props) {
    //const [hours, setHours] = useState("");
    //const [mins, setMins] = useState("");
    //const [secs, setSecs] = useState("");
    const { hr, min, sec, onHrChange, onMinChange, onSecChange } = props;

    //this is the equivalent of the the callback function when using a class component's setState
    //it runs after a change in state.
    /*
    useEffect(() => {
        props.onHrChange(hours);
    }, [hours]);

    useEffect(() => {
        props.onMinChange(mins);
    }, [mins]);

    useEffect(() => {
        props.onSecChange(mins);
    }, [secs]);
    */

    return (
        <React.Fragment>
                <Grid className="main" container direction="row" alignItems="center">
                    <Grid item>
                        <TextField id="hr" label="hr" type="number" min="0" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                value.match("^[0-9]*$") ? onHrChange(value) : onHrChange("");
                                }} 
                            value={hr}
                            error={hr < 0} /> 
                    </Grid>
                    <h2>:</h2>
                    <Grid item>
                        <TextField id="min" label="min" type="number" min="0" max="60" step="1" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                //regex to validate input! no decimals or negatives allowed.
                                value.match("^[0-9]*$") ? onMinChange(value) : onMinChange("");
                            }}
                            value={min}  
                            error={min < 0 || min >= 60}  /> 
                    </Grid>
                    <h2>:</h2>
                    <Grid item>
                        {/*need to have a diff styling for when the input is invalid*/}
                        <TextField id="sec" label="sec" type="number" min="0" max="60" variant="outlined"
                            onChange={(event) => {
                                //now, we only don't want negatives..idk, might have to do something else now. Cause
                                // I want the numbers input to pop up on mobile, so I should have "number" as the type..but the issue
                                // is that onChange isn't trigged when you type a "-" or a "." and idk why. This isn't an issue if i don't
                                // make the type "number"
                                onSecChange(event.target.value) 
                                //value.match("^\\d*$") ? setSecs(event.target.value) : setSecs("");
                            }}
                            value={sec}
                            error={sec < 0 || sec >= 60} /> 
                    </Grid>
                </Grid>
        </React.Fragment>

    );
}