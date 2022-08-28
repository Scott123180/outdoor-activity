import * as React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const WeatherStationInfoCard = (props: any) => {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Local Station
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Your coordinates: <br/>
                        ({props.latitude}, {props.longitude}) 
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        station: {props.station}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        zone: {props.zone}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        weather station: {props.cwa}
                    </Typography>
                </CardContent>
            </Card>
        );
}

WeatherStationInfoCard.defaultProps = {
    latitude: "",
    longitude: "",
    station: "",
    zone: ""
}

export default WeatherStationInfoCard;