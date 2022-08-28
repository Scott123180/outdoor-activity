import { createContext } from 'react';

interface WeatherContextInterface {
    latitude?: number,
    longitude?: number,
    alerts: string[],
    zone: string,
    forecast: any,
    station: string,
    activityType: string
    activityIntensity: string,
    activityStart: string,
    activityDuration: string,
    currentTemperature: string,
    currentHeatIndex: string,
    sunrise: string,
    sunset: string
}

export const WeatherContext = createContext<WeatherContextInterface>({
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
});