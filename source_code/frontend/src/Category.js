import Switch from '@mui/material/Switch';
import BlogList from './BlogList';
import useFetch from './Fetch';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Category({user}){
    const category = useParams()['category'];
    let subscriptions = new Array(...user.subscriptions);
    let {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    const [subscriptionStatus, setSubscriptionStatus] = useState(new Map([
        ["football", user.subscriptions.includes("football")],
        ["basketball", user.subscriptions.includes("basketball")],
        ["tennis", user.subscriptions.includes("tennis")],
        ["swimming", user.subscriptions.includes("swimming")],
        ["cycling", user.subscriptions.includes("cycling")],
        ["volleyball", user.subscriptions.includes("volleyball")],
        ["baseball", user.subscriptions.includes("baseball")],
        ["gymnastics", user.subscriptions.includes("gymnastics")],
        ["e-sports", user.subscriptions.includes("e-sports")],
        ["soccer", user.subscriptions.includes("soccer")],
        ["golf", user.subscriptions.includes("golf")]
    ]));
    


    function handleSubscribe(e){
        let newMap = new Map(subscriptionStatus);
        newMap.set(category, e.target.checked);
        setSubscriptionStatus(newMap);
        if(e.target.checked && !user.subscriptions.includes(category)){
            subscriptions.push(category);
        }
        else{
            subscriptions = new Array(...user.subscriptions.filter((c) => c !== category));
        }

        user.subscriptions = new Array(...subscriptions);
        fetch('http://localhost:8001/users/'+user.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        }); 
    }
    
    return(
       <div className="home">
        {error && <div> Error fetching data </div>}
        {isPending && <div> Loading... </div>}
        {<> Subscribe
            <Switch
                checked={subscriptionStatus.get(category)}
                value={category}
                onChange={handleSubscribe}
            />
        </> }
        {blogs && <BlogList blogs={blogs.filter((blog) => blog.category === category)} title={category}/>}
       </div>
    )
}


