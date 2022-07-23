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
            alerts: [],
            zone: "",
            forecast: {}
        };
    }

    //maybe use promise chaining
    //TODO: figure out how to properly make a group of rest calls
    fetchData = async (latitude, longitude) => {
        const alertsUrl = this.govUrl + "/alerts?";
        const zonesUrl = this.govUrl + "/zones?";

        const alerts = await fetch(alertsUrl + new URLSearchParams({
            message_type: "alert",
            point: latitude + "," + longitude
        }), {
            method: "GET",
        }).then(response => response.json());

        const zones = await fetch(zonesUrl + new URLSearchParams({
            point: latitude + "," + longitude
        }), {
            method: "GET",
        }).then(response => response.json())

        const forecastZone =
            zones.features.filter((feature) => feature.id.includes("forecast"))[0];

        console.log(forecastZone);

        const forecast = await fetch("https://api.weather.gov/zones/public/" + forecastZone.properties.id + "/forecast",
            { method: "GET", })
            .then(response => response.json());

        console.log(forecast);

        //curl -X GET "https://api.weather.gov/zones/public/NJZ006/forecast" -H "accept: application/geo+json"

        this.setState({
            alerts: alerts.features,
            latitude: latitude,
            longitude: longitude,
            forecast: forecast,
            zone: forecastZone.properties.id
        });

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.fetchData(latitude, longitude);

        });
    }

    render() {

        return (
            <div>
                <p>Your coordinates are ({this.state.latitude}, {this.state.longitude})</p>
                <p>There are {this.state.alerts.length} alerts for your area.</p>
                {this.state.alerts.map(a => React.createElement('p', { style: { color: "red" } }, a.properties.event))}
                {React.createElement('p', { style: { color: "green" } }, this.state.zone)}
                {React.createElement('p', { style: { color: "blue" } }, JSON.stringify(this.state.forecast.properties))}
            </div>
        );
    }
}

export default Weather;