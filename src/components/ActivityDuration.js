import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


class ActivityDuration extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            startTime: new Date(),
            duration: 0
        }

    }


    render() {
        function valuetext(value) {
            return `${value} hours`;
        }

        return (
            <div style={{color: 'black'}}>
                <p>time: {this.state.startTime.toString()}</p>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Activity Start Time"
                        value={this.state.startTime}
                        onChange={(value) => this.setState({ startTime: value })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <p style={{ color: 'black' }}>Activity Duration</p>
                <Box sx={{ width: 300 }}>
                    <Typography id="non-linear-slider" gutterBottom style={{ color: 'black' }}>
                        Duration: {this.state.duration} hours
                    </Typography>

                    <Slider
                        aria-label="Activity Duration"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        step={0.5}
                        marks
                        min={0}
                        max={12}
                        valueLabelDisplay="auto"
                        onChange={(event, value) => this.setState({ duration: value })}
                    />
                </Box>

            </div>
        );
    }


}

export default ActivityDuration;