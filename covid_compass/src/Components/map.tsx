import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import './map.css';

const HeatMap: React.FC = () => {
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
            [-40, 140, 0.5], // Example data point
            [-37, 150, 0.8], // Example data point
            [-20, 122, 0.6]  // Example data point
        ];

        // Add heat map layer to the map
        L.heatLayer(heatMapData, {
            radius: 25,  // Radius of each "point" of the heatmap
            blur: 17,    // Amount of blur
            maxZoom: 1, // Maximum zoom level
            gradient: {0.4: 'blue', 0.65: 'lime', 1: 'red'},
        }).addTo(map);

        // Clean up the map instance onx component unmount
        return () => {
            map.remove();
        };
    }, []);

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}>
        </div>
    );
};

export default HeatMap;