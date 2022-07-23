import React from "react";

//https://www.weather.gov/documentation/services-web-api#/

//40.7337633
//-74.0417513
//(40.7337633,-74.0417513)

class Weather extends React.Component {

    constructor() {
        super();

        this.state = {
            latitude: 0,
            longitude: 0
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {

            const p = await position();

            const latitude = p.coors.latitude;
            const longitude = p.coords.longitude;

            this.setState(
                {
                    "latitude": latitude,
                    "longitude": longitude
                });
        });
    }

    render() {
        
        return (
            <p>Your coordinates are ({this.state.latitude}, {this.state.latitude})</p>
        );
    }
}

export default Weather;