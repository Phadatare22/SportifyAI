import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useFetchLocation from './apis/FetchLocation';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};


export default function MapComponent({ markers, userLocation }) {
  const [latitude, setLatitude] = useState(userLocation.latitude);
  const [longitude, setLongitude] = useState(userLocation.longitude);


  return (
      <GoogleMap
        key={`${latitude}-${longitude}`}
        mapContainerStyle={containerStyle}
        center={{lat: latitude, lng: longitude}}
        zoom={9}
      >

        {markers.map(marker => {
          return (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.icon}
          />)
        }
        )}
      </GoogleMap>
  );
}