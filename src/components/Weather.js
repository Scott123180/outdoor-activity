import React from "react";
import WeatherConditionEmoji from "./WeatherConditionEmoji.tsx";
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

export const WeatherContext = React.createContext();

class Weather extends React.Component {

    //update to use new hooks
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.fetchData(latitude, longitude);

        });
    }
    activeAlerts = (alerts) => {
        //return alerts;
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

    alertCards = (alerts) => {

        return alerts
            .map(a => {

                const alertComponent = React.createElement(Alert, a.properties)

                return (
                    <Grid item xs={12} md={4} key={a.properties.id}>
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

                {this.alertCards(this.activeAlerts(this.state.alerts))}

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