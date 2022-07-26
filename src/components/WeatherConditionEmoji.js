/*

for current sky conditions:
https://www.weather.gov/hun/zfp_terminology
WeatherConditionEmoji.js

*/

import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

class WeatherConditionEmoji extends React.Component {
    constructor(props) {
        super(props);
    }

    

    /*
CLEAR or SUNNY	No clouds
MOSTLY SUNNY or MOSTLY CLEAR	1/8 to 2/8 clouds
PARTLY CLOUDY or PARTLY SUNNY	3/8 to 5/8 clouds
MOSTLY CLOUDY (sometimes CONSIDERABLE CLOUDINESS)	6/8 to 7/8 clouds
CLOUDY	8/8 clouds
Also used:
INCREASING CLOUDS
DECREASING CLOUDS
*/

    render() {

        //return <p style={{color: "yellow"}}>Here is the current weather conditions for your area: {this.props.textDescription}</p>

        const emoji = "picture";

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Current weather
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    {emoji}
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {this.props.textDescription}
                    </Typography>
                    <Typography variant="body2">
                        additional description
                    </Typography>
                </CardContent>
            </Card>
        );
    }

}


export default WeatherConditionEmoji;