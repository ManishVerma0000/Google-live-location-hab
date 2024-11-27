"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// JSON file containing location data
import locations from "./locations.json"; // Assume locations.json is in the same directory

const API_KEY = `${process.env.NEXT_PUBLIC_API_KEY}`; // Replace with your Google Maps API Key

const App = () => {
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center

  // Google Maps container style
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  // Options for the map
  const mapOptions = {
    zoom: 11, // Adjust zoom level
    disableDefaultUI: false, // Enables zoom controls and other UI
  };

  useEffect(() => {
    if (locations.length > 0) {
      // Set the map center to the first location
      setMapCenter({ lat: locations[0].latitude, lng: locations[0].longitude });
    }
  }, []);

  return (
    <div style={{ height: "100%", borderRadius: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>Driver And Pilot Live Location</h1>
      </div>

      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          options={mapOptions}
        >
          {locations.map((location, index) => (
            <Marker
              key={index + 1}
              position={{ lat: location.latitude, lng: location.longitude }}
              title={`BusName: ${location?.vehicleName}, DriverName:${location.operationStaffId}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <button
          style={{
            height: "40px",
            width: "150px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
          }}
        >
          Refresh Here1
        </button>
      </div>
    </div>
  );
};

export default App;
