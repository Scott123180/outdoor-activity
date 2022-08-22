
import React from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaTemperatureHigh } from 'react-icons/fa';
import { GiGasMask } from 'react-icons/gi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//https://www.weather.gov/hun/zfp_terminology
const createAdvisoryIconMap = () => {

    const iconMap = new Map();

    iconMap.set('Special Weather Statement', <AiOutlineExclamationCircle size={50} />);
    iconMap.set('Heat Advisory', <FaTemperatureHigh size={50} />);
    iconMap.set('Air Quality Alert', <GiGasMask size={50} />);

    return iconMap;

}

function Alert(props) {
    const [advisoryIconMap, setAdvisoryIconMap] = useState(createAdvisoryIconMap());

    const weatherIcon = props.event === null ? "picture" : advisoryIconMap.get(props.event);

    return (
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Alert
                </Typography>
                <Typography variant="h5" component="div">
                    {weatherIcon}
                </Typography>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{props.headline}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {props.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.event}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Alert;