import * as React from 'react';
import {useState} from 'react'; 
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value: any) {
    return `${value} hours`;
}

const ActivityDuration = (props: any) => {

    const [startTime, setStartTime] = useState<Date | null>(new Date());
    const [duration, setDuration] = useState<number | number[]>(0);
        return (
            <div style={{color: 'black'}}>
                <p>Start time: { (startTime ?? new Date()).toString()}</p>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        disabled
                        label="Activity Start Time"
                        value={startTime}
                        onChange={(value) => setStartTime(value)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <p style={{ color: 'black' }}>Activity Duration</p>
                <Box sx={{ width: 300 }}>
                    <Typography id="non-linear-slider" gutterBottom style={{ color: 'black' }}>
                        Duration: {duration} hours
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
                        onChange={(event, value) => setDuration(value)}
                    />
                </Box>

            </div>
        );

}

export default ActivityDuration;