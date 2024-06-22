import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import './home.css';
import './home.css';


const HeatMap: React.FC = () => {
    const [showFilters, setShowFilters] = useState(false);

    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const australiaBounds = L.latLngBounds(
            L.latLng(-45.2, 80),
            L.latLng(-8.0, 200)
        );

        // Initialize the map and set its view
        const map = L.map('map', {
            center: [-28.0, 135],
            zoom: 5, 
            zoomControl: false,
            maxBounds: australiaBounds,
            minZoom: 4

        });

        // Add a tile layer to the map (OpenStreetMap)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }).addTo(map);

        L.control.zoom({
            position: 'bottomleft' // Position the zoom control at the bottom right
        }).addTo(map);

        // Example heat map data points (latitude, longitude, intensity)
        const heatMapData: [number, number, number][] = [
            [37.7749, -122.4194, 0.5], // Example data point
            [37.7740, -122.4174, 0.8], // Example data point
            [37.7760, -122.4214, 0.6]  // Example data point
        ];

        // Add heat map layer to the map
        L.heatLayer(heatMapData, {
            radius: 2500,  // Radius of each "point" of the heatmap
            blur: 15,    // Amount of blur
            maxZoom: 17, // Maximum zoom level
        }).addTo(map);

        // Clean up the map instance onx component unmount
        return () => {
            map.remove();
        };
    }, []);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}>
            <div className="container">
                <img src="logo.png" alt="logo.png" className="logo" />
                <div className="filter-container">
                    <i className="material-icons" onClick={toggleFilters}>menu</i>
                    <div className={`filter-buttons ${showFilters ? 'show' : 'hide'}`}>
                        <button className="filter-button">Alpha</button>
                        <button className="filter-button">Beta</button>
                        <button className="filter-button">Delta</button>
                        <button className="filter-button">Omnicron</button>
                        <button className="filter-button">Gamma</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <img src="logo.png" alt="logo.png" className="logo" />
                <div className="filter-container">
                    <i className="material-icons" onClick={toggleFilters}>menu</i>
                    <div className={`filter-buttons ${showFilters ? 'show' : 'hide'}`}>
                        <button className="filter-button">Alpha</button>
                        <button className="filter-button">Beta</button>
                        <button className="filter-button">Delta</button>
                        <button className="filter-button">Omnicron</button>
                        <button className="filter-button">Gamma</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeatMap;