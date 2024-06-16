import { useEffect, useState } from "react";
import useFetchAI from "./apis/FetchAI";
import useFetchWeather from "./apis/FetchWeather";
import useFetchGoogle from "./apis/FetchGoogleResults";
import useFetch from "./Fetch";

export default function Recommendations({onUpdate, user}){
    const {weatherData, isPendingWeather, errorWeather} = useFetchWeather();
    const [sports, setSports] = useState("");
    const {googleData, isPendingGoogle, errorGoogle} = useFetchGoogle(sports);
    const [prompt, setPrompt] = useState("");
    const {dataAI, isPendingAI, errorAI} = useFetchAI(prompt);
    const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

    function extractSubscriptions(){
        return user.subscriptions;
    }

    function extractInterests(){
        let interests = new Set();
        if(!isPending){
            for(let blog of blogs.filter((blog) => blog.author === user.id)){
                interests.add(blog.category);
            }
        }

        extractSubscriptions().forEach(element => {
            interests.add(element);
        });

        user.search_keys.forEach(element => {
            interests.add(element);
        })
        // interests.push(...extractSubscriptions());
        // interests.push(...user.search_keys);
        setSports(Array.from(interests).join('+|+'));
        console.log("Merged: ", sports);

    }

    useEffect(extractInterests, [isPending, isPendingGoogle]);

    useEffect(() => {
        if(!isPendingWeather && !isPendingGoogle){
setPrompt(`User's interested sports: ${sports}. Provide up to four events including name, hours, location, sport type, and clickable <a href> links (if available) from SERP API google event results: ${JSON.stringify(googleData)} based on user's interests. Also, consider relevant weather data: ${weatherData} when recommending events. Format the response in HTML with a heading: "Events based on ${user.id}'s interest:". Use <br/> for line breaks. Note: List events only from the user's specified sports; omit if none are available. Provide only the HTML code. Ensure no characters enclose the code.`);
            console.log("prompt", prompt);
            if(dataAI){
                onUpdate(dataAI.choices[0].message.content);
            }
        } 

    }, [isPendingWeather, isPendingGoogle, dataAI]);


    return(
        <div>
            {sports.length === 0 && "not enough data"}
            {(isPendingAI || isPendingGoogle || isPendingWeather) && sports.length > 0 && "loading.."}
            {!isPendingAI && !isPendingGoogle && !isPendingWeather && sports.length > 0 && <div dangerouslySetInnerHTML={{ __html: dataAI.choices[0].message.content }}></div>}
        </div>
    )
}