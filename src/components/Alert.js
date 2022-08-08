import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Grid } from "@mui/material";

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaTemperatureHigh } from 'react-icons/fa';
import { GiGasMask } from 'react-icons/gi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


class Alert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            advisoryIconMap: this.createAdvisoryIconMap()
        }
    }

    //https://www.weather.gov/hun/zfp_terminology
    createAdvisoryIconMap = () => {

        const iconMap = new Map();

        iconMap.set('Special Weather Statement', <AiOutlineExclamationCircle size={50} />);
        iconMap.set('Heat Advisory', <FaTemperatureHigh size={50} />);
        iconMap.set('Air Quality Alert', <GiGasMask size={50} />);

        return iconMap;

    }

    render() {

        const weatherEvent = this.props.event;


        const weatherIcon = this.props.event === null ? "picture" : this.state.advisoryIconMap.get(weatherEvent);

        return (
            <Grid xs = {2}>
                <Card sx={{ minWidth: 275 }}>
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
                                <Typography>{this.props.headline}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {this.props.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {this.props.event}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}

export default Alert;