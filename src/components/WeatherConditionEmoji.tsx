import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy } from 'react-icons/wi';
import { TiWeatherCloudy } from 'react-icons/ti';

const celciusToFarenheit = (degreesCelcius: number) => {
    return Math.round((degreesCelcius * (9 / 5)) + 32);
}

//https://www.weather.gov/hun/zfp_terminology
const weatherIconMap = new Map < string, JSX.Element> ([
    ['CLEAR', <WiDaySunny size={50} />],
    ['SUNNY', <WiDaySunny size={50} />],
    ['MOSTLY SUNNY', <WiDaySunny size={50} />],
    ['MOSTLY CLEAR', <WiDaySunny size={50} />],
    ['PARTLY CLOUDY', <WiDaySunnyOvercast size={50} />],
    ['PARTLY SUNNY', <WiDaySunnyOvercast size={50} />],
    ['MOSTLY CLOUDY', <WiDayCloudy size={50} />],
    ['CONSIDERABLE CLOUDINESS', <WiDayCloudy size={50} />],
    ['CLOUDY', <TiWeatherCloudy size={50} />],
    ['INCREASING CLOUDS', <TiWeatherCloudy size={50} />],
    ['DECREASING CLOUDS', <TiWeatherCloudy size={50} />]
]);

const WeatherConditionEmoji = (props: any) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Current weather
                </Typography>
                <Typography variant="h5" component="div">
                    {weatherIconMap.get((props.textDescription).toUpperCase())}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.textDescription}
                </Typography>
                <Typography variant="body2">
                    Temperature: {celciusToFarenheit(props.currentTemperature)}
                </Typography>
                <Typography variant="body2">
                    Feels like: {celciusToFarenheit(props.currentHeatIndex)}
                </Typography>
            </CardContent>
        </Card>
    );
}

WeatherConditionEmoji.defaultProps = {
    textDescription: ""
};



export default WeatherConditionEmoji;