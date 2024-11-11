// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';

const Dashboard = () => {
    const [trafficData, setTrafficData] = useState(null);

    useEffect(() => {
        // Fetch the traffic data from the backend
        fetch("/api/traffic")
            .then(response => response.json())
            .then(data => setTrafficData(data));
    }, []);

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 37.7749, // Set a default center, this can be dynamic based on location
        lng: -122.4194
    };

    return (
        <div>
            <h1>AI Traffic Management System</h1>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={14}
                >
                    <TrafficLayer />
                </GoogleMap>
            </LoadScript>

            {trafficData && (
                <div>
                    <h2>Real-time Traffic Data</h2>
                    <ul>
                        {trafficData.map((data, index) => (
                            <li key={index}>
                                Location: {data.location}, Traffic Density: {data.density}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Dashboard;