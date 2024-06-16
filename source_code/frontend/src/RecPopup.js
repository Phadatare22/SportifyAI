import React, { useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Recommendations from './Recommendations';
import MapComponent from './MapComponent';
import useFetchAI from './apis/FetchAI';
import useFetchLocation from './apis/FetchLocation';

export default function RecPopup({user}) {
    /* global google */
    const markerIcons = {
        user: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        sports: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    };

    const [googleData, setGoogleData] = useState();
    const [prompt, setPrompt] = useState("");
    const { dataAI, isPendingAI, errorAI } = useFetchAI(prompt);
    const [addresses, setAddresses] = useState([]);
    const [markers, setMarkers] = useState([]);
    const {location: userLocation, isPendingLocation, errorLocation} = useFetchLocation();
    const [open, setOpen] = useState(false);

    function handleOpen(){
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
        setMarkers(new Array());
        setAddresses(new Array());
    }

    useEffect(() => {
        setPrompt("Format all addresses from the input into a JSON list of objects with keys 'address' and 'type' (type should be sports, music, or restaurant) based on: " + googleData + ". Provide the JSON response directly, ensuring it is not enclosed in any characters or markdown, suitable for JSON.parse usage.");    }, [googleData]);

    useEffect(() => {
        if (!isPendingAI && dataAI) {
            setAddresses(JSON.parse(dataAI.choices[0].message.content));
        }
    }, [isPendingAI, dataAI]);

    useEffect(() => {
        if (addresses.length > 0) {
            const geocoder = new google.maps.Geocoder();
            addresses.forEach((address) => {
                geocoder.geocode({ 'address': address.address }, (results, status) => {
                    if (status === 'OK') {
                        setMarkers(prevMarkers => [
                            ...prevMarkers,
                            {
                                id: prevMarkers.length,
                                position: results[0].geometry.location,
                                icon: { url: markerIcons['sports'] || markerIcons.user }
                            }
                        ]);
                        if(!isPendingLocation && !markers.includes(markers.filter((obj) => obj.id === 0)[0])){
                            markers.push({ id: 0, position: { lat: userLocation.latitude, lng: userLocation.longitude }, icon: { url: markerIcons.user }});        
                        }
                    } else {
                        console.log('Geocode: ' + status);
                    }
                });
            });
        }
    }, [addresses, open, isPendingLocation]);

    return (
        <Popup onOpen= {handleOpen} onClose= {handleClose} trigger={<button className='pop-button'> Recommended for you </button>} contentStyle={{ width: '400px' }} >
            <div>
                <MapComponent markers={markers} userLocation = {userLocation}/>
                <Recommendations onUpdate={setGoogleData} user= {user}/>
            </div>
        </Popup>
    );
}
