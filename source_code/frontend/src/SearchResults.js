import {useEffect, useState} from 'react';
import BlogList from './BlogList';
import { useParams, useLocation } from 'react-router-dom';

export default function Category(){
    const searchInput = useParams()['input'];
    const location = useLocation();
    const blogs = location.state;
    return(
       <div className="home">
        {blogs && <BlogList blogs={blogs} title={"search-results ("+blogs.length+")"}/>}
       </div>
    )
}
