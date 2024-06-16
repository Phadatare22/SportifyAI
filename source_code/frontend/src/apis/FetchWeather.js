import { useState, useEffect } from "react";
import useFetchLocation from "./FetchLocation";

export default function useFetchWeather(){
    const {location, isPendingLocation, errorLocation} = useFetchLocation();
    const [weatherData, setWeatherData] = useState(null);
    const [isPendingWeather, setIsPendingWeather] = useState(true);
    const [errorWeather, setErrorWeather] = useState(null);

    useEffect(() => {
        if(!isPendingLocation){
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,rain&forecast_days=1`)
            .then(res => res.json())
            .then((data)=> {
                setWeatherData(JSON.stringify(data));
                setIsPendingWeather(false);
                setErrorWeather(null);
            }).catch((e) => {
                setErrorWeather(e.message);
                setIsPendingWeather(false);
            });
        }
        
    }, [isPendingLocation]);

    return {weatherData, isPendingWeather, errorWeather};
}