import { useState, useEffect } from "react";

export default function useFetchAI(prompt){
    const [dataAI, setDataAI] = useState(null);
    const [isPendingAI, setIsPendingAI] = useState(true);
    const [errorAI, setErrorAI] = useState(null);
    const OPEN_AI_KEY = "YOUR_KEY";

    useEffect(() => {
        if(prompt.length > 0){
                fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+OPEN_AI_KEY
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo-0125",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are a helpful assistant."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }],
                    "temperature": 0.1,
                    "max_tokens": 500,
                    "top_p": 1.0,
                    "frequency_penalty": 0.0,
                    "presence_penalty": 0.0
                })
            })
            .then(res => res.json())
            .then((data)=> {
                setDataAI(data);
                setIsPendingAI(false);
                setErrorAI(null);
            }).catch((e) => {
                setErrorAI(e.message);
                console.log(e.message);
                setIsPendingAI(false);
            });
        }
        
    }, [prompt]);

    return {dataAI, isPendingAI, errorAI};
}