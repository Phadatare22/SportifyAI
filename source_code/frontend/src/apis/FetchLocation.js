import { useState, useEffect } from "react";

export default function useFetchLocation(){
    const [location, setLocation] = useState(null);
    const [isPendingLocation, setIsPendingLocation] = useState(true);
    const [errorLocation, setErrorLocation] = useState(null);

    useEffect(() => {
        fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then((data)=> {
            setLocation(data);
            setIsPendingLocation(false);
            setErrorLocation(null);
        }).catch((e) => {
            setErrorLocation(e.message);
            setIsPendingLocation(false);
        });
    }, []);

    return {location, isPendingLocation, errorLocation};
}