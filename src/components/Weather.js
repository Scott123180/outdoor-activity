import React from "react";
import WeatherConditionEmoji from "./WeatherConditionEmoji";

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
            forecast: {},
            station: ""
        };
    }

    /*
        Chain of data fetching - eventually I want to make my own data type, save a response and query off of that data type.
    */
    fetchData = async (latitude, longitude) => {
        //ALERTS
        const alertsUrl = this.govUrl + "/alerts?";

        const alerts = await fetch(alertsUrl + new URLSearchParams({
            message_type: "alert",
            point: latitude + "," + longitude
        }), {
            method: "GET",
        }).then(response => response.json());

        //GET FORECAST ZONE
        const zonesUrl = this.govUrl + "/zones?";
        const zones = await fetch(zonesUrl + new URLSearchParams({
            point: latitude + "," + longitude
        }), {
            method: "GET",
        }).then(response => response.json())

        const forecastZone =
            zones.features.filter((feature) => feature.id.includes("forecast"))[0];


        //GET FORECAST
        const forecast = await fetch("https://api.weather.gov/zones/public/" + forecastZone.properties.id + "/forecast",
            { method: "GET", })
            .then(response => response.json());

        //GET STATIONS FOR ZONE
        const stations = await fetch("https://api.weather.gov/zones/forecast/" + forecastZone.properties.id + "/stations",
            { method: "GET", })
            .then(response => response.json());

        //calculate closest station
        const station = this.calculateClosestStation(stations, latitude, longitude);

        //get latest observation
        const latest = await fetch("https://api.weather.gov/stations/" + station + "/observations/latest",
            { method: "GET", })
            .then(response => response.json());

        //curl -X GET "KTEB" -H "accept: application/geo+json" 
        this.setState({
            alerts: alerts.features,
            latitude: latitude,
            longitude: longitude,
            forecast: forecast,
            zone: forecastZone.properties.id,
            station: station,
            latestCondition: latest.properties.textDescription
        });

    }

    //TODO: get closest station
    calculateClosestStation(stations, latitude, longitude) {

        return stations.features[0].properties.stationIdentifier;

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
                <p style={{ color: "purple" }}>This is your current station {this.state.station}</p>
                <WeatherConditionEmoji textDescription={this.state.latestCondition} />
                <p>There are {this.state.alerts.length} alerts for your area.</p>
                {this.state.alerts.map(a => React.createElement('p', { style: { color: "red" } }, a.properties.event))}
                {React.createElement('p', { style: { color: "green" } }, this.state.zone)}
                {React.createElement('p', { style: { color: "blue" } }, JSON.stringify(this.state.forecast.properties))}
            </div>
        );
    }
}

export default Weather;