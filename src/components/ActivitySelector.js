import React from 'react';

import { ButtonGroup, Button } from '@mui/material';
import {MdDirectionsBike} from 'react-icons/md';
import {FaRunning, FaWalking} from 'react-icons/fa';


class ActivitySelector extends React.Component {
    
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div style={{color:"black"}}>
                <p>Type of activity</p>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => this.props.updateActivity("activityType", "walking")}><FaWalking size="28"/></Button>
                    <Button onClick={() => this.props.updateActivity("activityType", "running")}><FaRunning size="28"/></Button>
                    <Button onClick={() => this.props.updateActivity("activityType", "cycling")}><MdDirectionsBike size="28" /></Button>
                </ButtonGroup>
                <p>Intensity</p> 
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => this.props.updateActivity("activityIntensity", "easy")}>Easy</Button>
                    <Button onClick={() => this.props.updateActivity("activityIntensity", "moderate")}>Moderate</Button>
                    <Button onClick={() => this.props.updateActivity("activityIntensity", "hard")}>Hard</Button>
                    <Button onClick={() => this.props.updateActivity("activityIntensity", "maxEffort")}>Max Effort</Button>
                </ButtonGroup>


                <br />
                <br />
            </div>



        );
    }

}

export default ActivitySelector;