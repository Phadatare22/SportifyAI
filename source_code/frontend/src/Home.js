import {useEffect, useState} from 'react';
import BlogList from './BlogList';
import useFetch from './Fetch';


export default function Home({user}){

    let {data: blogs, isPending, error} = useFetch("http://localhost:8000/blogs");
    const {data: users, isPending: isPendingUsers, error: errorUsers} = useFetch('http://localhost:8001/users');
    
    return(
       <div className="home">
        {error && <div> Error fetching data </div>}
        {isPending && <div> Loading... </div>}
        {blogs && <BlogList blogs={blogs} title="all-blogs" />}
       </div>
    )
}


