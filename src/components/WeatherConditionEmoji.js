/*

for current sky conditions:
WeatherConditionEmoji.js

*/

import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy} from 'react-icons/wi';
import { TiWeatherCloudy } from 'react-icons/ti';

class WeatherConditionEmoji extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherIconMap: this.createWeatherIconMap()
        }
    }

    //https://www.weather.gov/hun/zfp_terminology
    createWeatherIconMap = () => {

        const iconMap = new Map();

        iconMap.set('CLEAR', <WiDaySunny size={50} />);
        iconMap.set('SUNNY', <WiDaySunny size={50}/>);
        iconMap.set('MOSTLY SUNNY', <WiDaySunny size={50}/>);
        iconMap.set('MOSTLY CLEAR', <WiDaySunny size={50}/>);
        iconMap.set('PARTLY CLOUDY', <WiDaySunnyOvercast size={50}/>);
        iconMap.set('PARTLY SUNNY', <WiDaySunnyOvercast size={50}/>);
        iconMap.set('MOSTLY CLOUDY', <WiDayCloudy size={50}/>);
        iconMap.set('CONSIDERABLE CLOUDINESS', <WiDayCloudy size={50}/>);
        iconMap.set('CLOUDY', <TiWeatherCloudy size={50}/>);
        iconMap.set('INCREASING CLOUDS', <TiWeatherCloudy size={50}/>);
        iconMap.set('DECREASING CLOUDS', <TiWeatherCloudy size={50}/>);

        return iconMap;

    }




    render() {

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Current weather
                    </Typography>
                    <Typography variant="h5" component="div">
                        {this.state.weatherIconMap.get((this.props.textDescription).toUpperCase())}
                    </Typography>
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

WeatherConditionEmoji.defaultProps = {
    textDescription : ""
};


export default WeatherConditionEmoji;