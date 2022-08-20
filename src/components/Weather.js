import React from "react";
import WeatherConditionEmoji from "./WeatherConditionEmoji";
import Alert from "./Alert";
import { Grid } from "@mui/material";
import moment from "moment";
import WeatherStationInfoCard from "./WeatherStationInfoCard";
import ActivityRecommendation from "./ActivityRecommendation";
import ActivityDuration from "./ActivityDuration";
import ActivitySelector from "./ActivitySelector";

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
            station: "",
            activityType: "",
            activityIntensity: "",
            activityStart: "",
            activityDuration: "",
            currentTemperature: "",
            currentHeatIndex: "",
            sunrise: "",
            sunset: ""
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

        const weatherOffice = zones.features[0].properties.cwa[0];

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

        const sunriseSunset = await fetch("http://api.sunrise-sunset.org/json?" + new URLSearchParams({
            lat: latitude,
            lng:longitude
        }),  
            { method: "GET", })
            .then(response => response.json());

        /*
        ADDITIONAL DATA:

        sunrise and sunset
        times are given in UTC with no ajustment. may need to call additional api for user time
        http://api.sunrise-sunset.org/json?lat=40.7337633&lng=-74.0417513

        air quality api documentation
        https://aqs.epa.gov/aqsweb/documents/data_api.html

        */

        //curl -X GET "KTEB" -H "accept: application/geo+json" 
        this.setState({
            alerts: alerts.features,
            latitude: latitude,
            longitude: longitude,
            forecast: forecast,
            zone: forecastZone.properties.id,
            station: station,
            latestCondition: latest.properties.textDescription,
            currentTemperature: latest.properties.temperature.value,
            currentHeatIndex: latest.properties.heatIndex.value,
            cwa: weatherOffice,
            sunrise: sunriseSunset.results.sunrise,
            sunset: sunriseSunset.results.sunset
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
    activeAlerts = (alerts) => {
        const currentTime = moment.utc();

        return alerts
            .filter(a => {

                const onset = moment(a.properties.onset).utc();
                const ends = a.properties.ends === null ? null : moment(a.properties.ends).utc();

                if (!onset.isValid()) return false;

                if (this.noEndTimeSpecified(ends)) {
                    return currentTime.isSameOrAfter(onset)
                        && currentTime.date === onset.date();
                } else {
                    return currentTime.isSameOrAfter(onset)
                        && currentTime.isBefore(ends);
                }
            });
    }

    alertCards = (alerts, gridSize) => {

        return alerts
            .map(a => {

                const alertComponent = React.createElement(Alert, a.properties)

                return (
                    <Grid item xs={gridSize}>
                        {alertComponent}
                    </Grid>
                )
            })

    }

    noEndTimeSpecified = (ends) => ends === null;

    updateActivity = (key, value) => {
        this.setState({ [[key]]: value });
    }

    render() {

        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <WeatherConditionEmoji 
                        textDescription={this.state.latestCondition} 
                        currentTemperature={this.state.currentTemperature}
                        currentHeatIndex={this.state.currentHeatIndex}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <WeatherStationInfoCard
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        station={this.state.station}
                        zone={this.state.zone}
                        cwa={this.state.cwa}
                    />
                </Grid>
                <Grid item xs={12}>
                    <p>There are {this.activeAlerts(this.state.alerts).length} active alerts for your area.</p>
                </Grid>

                {this.alertCards(this.activeAlerts(this.state.alerts), 4)}

                <Grid item xs={12} style={{ backgroundColor: 'white', color: "black" }}>
                    <p>Activity {this.state.activityType}</p>
                    <ActivitySelector updateActivity={(key, value) => this.updateActivity(key, value)} />
                    <p>Intensity {this.state.activityIntensity}</p>
                    <ActivityDuration updateActivity={(key, value) => this.updateActivity(key, value)} />
                </Grid>

                <Grid item xs={12}>
                    <ActivityRecommendation
                        activityType={this.state.activityType}
                        activityIntensity={this.state.activityIntensity}
                        currentHeatIndex={this.state.currentHeatIndex}
                        activityDuration={this.state.activityDuration}
                        activityStart={this.state.activityStart}
                        sunrise={this.state.sunrise}
                        sunset={this.state.sunset}

                    />
                </Grid>

            </Grid>
        );
    }
}

export default Weather;