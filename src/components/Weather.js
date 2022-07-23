import React from "react";

//https://www.weather.gov/documentation/services-web-api#/

//40.7337633
//-74.0417513
//(40.7337633,-74.0417513)

/*

- build out weather data processing layer
- gather more info from weather gov
    - forecast
- add support for zip codes
- add weather forecasting (based on weather data)
- add outdoor activity recommendation layer
- add emoji for current weather

*/

class Weather extends React.Component {

    govUrl = "https://api.weather.gov";

    constructor() {
        super();

        this.state = {
            latitude: 0,
            longitude: 0,
            alerts: []
        };
    }

    //maybe use promise chaining
    //TODO: figure out how to properly make a group of rest calls
    fetchData = (latitude, longitude) => {
        this.fetchAlerts(latitude, longitude);
        this.fetchZones(latitude, longitude);
    }

    fetchAlerts = (latitude, longitude) => {
        const url = this.govUrl + "/alerts?";

        fetch(url + new URLSearchParams({
            message_type: "alert",
            point: latitude + "," + longitude
        }), {
            method: "GET",
        })
            .then(response => response.json())
            .then(json => this.setState({ alerts: json.features }));
    }

    fetchZones = (latitude, longitude) => {
        const url = this.govUrl + "/zones?"

        fetch(url + new URLSearchParams({
            point: latitude + "," + longitude
        }, {
            method: "GET",
        })
            .then(response => response.json())
            .then(json => console.log(JSON.stringify(json))));
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.fetchData(latitude, longitude);

            this.setState(
                {
                    "latitude": latitude,
                    "longitude": longitude
                });
        });
    }

    render() {

        return (
            <div>
                <p>Your coordinates are ({this.state.latitude}, {this.state.longitude})</p>
                <p>There are {this.state.alerts.length} alerts for your area.</p>
                {this.state.alerts.map(a => React.createElement('p', { style: { color: "red" } }, a.properties.event))}
            </div>
        );
    }
}

export default Weather;