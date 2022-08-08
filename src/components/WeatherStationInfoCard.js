import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class WeatherStationInfoCard extends React.Component {

    render() {

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Local Information
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        coordinates: ({this.props.latitude}, {this.props.longitude}) 
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        station: {this.props.station}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        zone: {this.props.zone}
                    </Typography>
                </CardContent>
            </Card>
        );

    }

}

WeatherStationInfoCard.defaultProps = {
    latitude: "",
    longitude: "",
    station: "",
    zone: ""
}

export default WeatherStationInfoCard;