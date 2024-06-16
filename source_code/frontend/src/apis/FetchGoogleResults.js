import { useState, useEffect } from "react";
import useFetchLocation from "./FetchLocation";

export default function useFetchGoogle(sports) {
    const {location, isPendingLocation, errorLocation } = useFetchLocation();
    const [googleData, setGoogleData] = useState(null);
    const [isPendingGoogle, setIsPendingGoogle] = useState(true);
    const [errorGoogle, setErrorGoogle] = useState(null);
    const SERP_API_KEY = 'YOUR_KEY';

    function encodeUULE(location) {
        const lengthChar = String.fromCharCode('a'.charCodeAt(0) + location.length);
        const encodedLocation = btoa(lengthChar + location);
        return `w+CAIQICI${encodedLocation}`;
    }
    


    useEffect(() => {
        if (!isPendingLocation && sports.length > 0) {
            setIsPendingGoogle(true);
            const sportsEventsUrl = `https://serpapi.com/search.json?engine=google_events&q=${sports}&location=${location.city}%2C+${location.region}%2C+${location.country_name.replace(" ", "+")}&gl=us&hl=en&num=20&api_key=`+SERP_API_KEY;            
            console.log("url: ", sportsEventsUrl);
            fetch(sportsEventsUrl)
            .then(res => res.json())
            .then(data => {
                const sportsResults = data.events_results.map(event => ({
                    name: event.title,
                    location: event.address.join(' '),
                    hours: event.date.when ? event.date.when : 'No hours available',
                    link: event.link
                }));
                setGoogleData(sportsResults);
                setIsPendingGoogle(false);
            })
            .catch(error => {
                setErrorGoogle(error.message);
                setIsPendingGoogle(false);
            })
        }
    }, [isPendingLocation]);

    return { googleData, isPendingGoogle, errorGoogle };
}
