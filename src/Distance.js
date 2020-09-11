import React from 'react';
import { TextField, Grid, MenuItem, Select, makeStyles, FormControl } from '@material-ui/core';
import './App.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 75,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  

export default function Distance(props) {
    const classes = useStyles();
    //const [dist, setDist] = useState("");
    //const [unit, setUnit] = useState("miles");
    const { dist, unit, onDistChange, onUnitChange } = props;


    return (
        <React.Fragment>
                <Grid className="main" container direction="row">
                    <Grid item>
                        <TextField className="distText" id="dist" label="dist" type="number" min="0" variant="outlined"
                            onChange={(event) => {
                                var value = event.target.value;
                                onDistChange(value);                                
                                }} 
                            value={dist}
                            error={dist < 0} /> 
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="unit"
                                id="unit"
                                displayEmpty
                                value={unit}
                                onChange={(event) => {
                                    onUnitChange(event.target.value);
                                }}
                            >
                                <MenuItem value={"miles"}>miles</MenuItem>
                                <MenuItem value={"km"}>km</MenuItem>
                                <MenuItem value={"meters"}>meters</MenuItem>
                                <MenuItem value={"yards"}>yards</MenuItem>
                            </Select>
                            </FormControl>
                    </Grid>
                </Grid>
        </React.Fragment>
    );
}