import {Link} from 'react-router-dom';
import Search from './Search';
import NotificationBar from './NotificationBar';
import RecPopup from './RecPopup';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

export default function Navbar({loggedIn, setLoggedIn, setUser, user}){

    const GOOGLE_MAPS_API_KEY = 'YOUR_KEY';
    const [loginRefresh, setLoginRefresh] = useState(true);

    function logoutHandle(){
        setLoggedIn(false);
        setLoginRefresh(!loginRefresh);
        setUser(null);
    }
    return (
        <div className="navbar">
            <h1> SportifyAI </h1>
            {loggedIn && <Search user = {user}/>}
            {loggedIn && <NotificationBar user={user}/>}
            <LoadScript
                googleMapsApiKey = {GOOGLE_MAPS_API_KEY}
                loadingElement={<div>Loading...</div>}>
            {loggedIn && <RecPopup user = {user}/>}
            </LoadScript>
            <div className="links">
            {loggedIn && <Link to="/home"> Home </Link>}
            {loggedIn && <Link to="/create"> Create Blog </Link>}
            {loggedIn && <Link to="/" onClick={logoutHandle}> Logout </Link>}
            {!loggedIn && <Link to="/signup"> Signup </Link>}
            {loggedIn && user.id === 'admin' && <Link to="/users"> Users </Link>}
            </div>
        </div>
    )
}
