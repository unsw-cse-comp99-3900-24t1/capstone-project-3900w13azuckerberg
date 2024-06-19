import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import './home.css';

const HeatMap: React.FC = () => {
    useEffect(() => {
        // Initialize the map and set its view
        const map = L.map('map', {
            center: [-25.7980, 135.8807],
            zoom: 4, 
            zoomControl: false
        }); // Australia

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

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}>
            <div className="controls">
                <img src="./logo.png" alt="Logo" className="logo" />
                <button className="control-button">Button 1</button>
                <button className="control-button">Button 2</button>
            </div>
        </div>
    );
};

export default HeatMap;