import React from 'react';

import { ButtonGroup, Button } from '@mui/material';
import {MdDirectionsBike} from 'react-icons/md';
import {FaRunning, FaWalking} from 'react-icons/fa';


class ActivitySelector extends React.Component {

    render() {

        return (
            <div>
                <p>Type of activity</p>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button><FaWalking /></Button>
                    <Button><FaRunning /></Button>
                    <Button><MdDirectionsBike /></Button>
                </ButtonGroup>
                <p>Intensity</p> 
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>Easy</Button>
                    <Button>Moderate</Button>
                    <Button>Hard</Button>
                    <Button>Max Effort</Button>
                </ButtonGroup>


                <br />
                <br />
            </div>



        );
    }

}

export default ActivitySelector;