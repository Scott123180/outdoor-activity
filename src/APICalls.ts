
const govUrl = "https://api.weather.gov";

/*
    Chain of data fetching - eventually I want to make my own data type, save a response and query off of that data type.
*/
const fetchData = async (latitude: number, longitude: number) => {
    //ALERTS
    const alertsUrl = govUrl + "/alerts?";

    const alerts = await fetch(alertsUrl + new URLSearchParams({
        message_type: "alert",
        point: latitude + "," + longitude
    }), {
        method: "GET",
    }).then(response => response.json());

    //GET FORECAST ZONE
    const zonesUrl = govUrl + "/zones?";
    const zones = await fetch(zonesUrl + new URLSearchParams({
        point: latitude + "," + longitude
    }), {
        method: "GET",
    }).then(response => response.json())

    const forecastZone =
        zones.features.filter((feature: any) => feature.id.includes("forecast"))[0];

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
    const station = calculateClosestStation(stations, latitude, longitude);

    //get latest observation
    const latest = await fetch("https://api.weather.gov/stations/" + station + "/observations/latest",
        { method: "GET", })
        .then(response => response.json());

    const sunriseSunset = await fetch("http://api.sunrise-sunset.org/json?" + new URLSearchParams({
        lat: latitude,
        lng: longitude
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
    return {
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
    };

}

//TODO: get closest station
function calculateClosestStation(stations: any, latitude: number, longitude: number) {

    return stations.features[0].properties.stationIdentifier;

}