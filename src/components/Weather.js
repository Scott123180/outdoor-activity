import React from "react";

//https://www.weather.gov/documentation/services-web-api#/

//40.7337633
//-74.0417513
//(40.7337633,-74.0417513)

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

    fetchData = (latitude, longitude) => {
        this.fetchAlerts(latitude,longitude); 
    }

    fetchAlerts = (latitude, longitude) => {
        const url = this.govUrl + "/alerts?";

        fetch(url + new URLSearchParams({
            message_type : "alert",
            point : latitude + "," + longitude
        }), {
            method: "GET",
        })
        .then(response => response.json())
        .then(json => this.setState({alerts : json.features}));
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

        console.log(this.state.alerts);

        return (
            <div>
                <p>Your coordinates are ({this.state.latitude}, {this.state.longitude})</p>
                <p>There are {this.state.alerts.length} alerts for your area.</p>
                <p>{this.state.alerts.map(a => React.createElement('p', {}, a.properties.event))}</p>
            </div>
        );
    }
}

export default Weather;