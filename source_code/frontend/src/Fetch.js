import { useState, useEffect } from "react";

export default function useFetch(url){
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then((data)=> {
            setData(data);
            setIsPending(false);
            setError(null);
        }).catch((e) => {
            setError(e.message);
            setIsPending(false);
        });
    }, [url]);

    return {data, isPending, error};
}