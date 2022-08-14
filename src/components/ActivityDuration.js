import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


class ActivityDuration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: new Date()
        }

    }

    // const handleChange = (newValue) => {
    //   setValue(newValue);
    // };


    render() {
        function valuetext(value) {
            return `${value}°C`;
        }

        return (
            <div>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Activity Start Time"
                        value={this.state.value}
                        onChange={console.log("hi")}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <p style={{color: 'black'}}>Activity Duration</p>
                <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Small steps"
                        defaultValue={0.00000005}
                        getAriaValueText={valuetext}
                        step={0.00000001}
                        marks
                        min={-0.00000005}
                        max={0.0000001}
                        valueLabelDisplay="auto"
                    />
                </Box>

            </div>
        );
    }


}

export default ActivityDuration;