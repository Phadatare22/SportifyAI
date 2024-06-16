import { useState } from "react";
import useFetch from "./Fetch";
import BlogList from "./BlogList";
import {useNavigate} from 'react-router-dom';

export default function Search({user}){
    const [searchInput, setSearchInput] = useState(""); 
    const [searchResults, setSearchResults] = useState(new Array());
    const navigate = useNavigate();
    const [searchPending, setSearchPending] = useState(true);
    const [searchError, setSearchError] = useState();
    const sports = ["football", "basketball", "tennis", "swimming", "cycling", "volleyball", "baseball", "gymnastics", "e-sports", "soccer", "golf"];

    // const {data: response, isPending, error} = useFetch("http://localhost:9200/blogs/_search?q="+searchInput); //setSearchInput async takes time to set
    
    function handleSearch(e){
        setSearchInput(e.target.value);

        if (sports.includes(e.target.value) && !user.search_keys.includes(e.target.value)) {
            user.search_keys.push(e.target.value);
            fetch('http://localhost:8001/users/'+user.id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(() => {
            console.log(`Search key "${e.target.value}" added to the user: ${user.id}`);
        });
        }


        fetch("http://localhost:9200/blogs/_search?q="+e.target.value)
        .then(res => res.json())
        .then(data => data.hits.hits)
        .then(listItems => {
            let blogs = listItems.map(item => ({
                id: item._source.id, 
                title: item._source.title,
                body: item._source.body,
                author: item._source.author,
                category: item._source.category,
                comments: item._source.comments
            }));
            setSearchResults(blogs);
            navigate('/search/'+e.target.value, {state: blogs});
        })
        .catch(err => console.log(err));



    }
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Search"
                value = {searchInput}
                onChange = {handleSearch}
            />
        </div>

    );
}