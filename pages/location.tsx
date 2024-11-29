"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import api from "@/api/api";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
interface Location {
  latitude: number;
  longitude: number;
  vehicleType: string;
  vehicleId: number;
  vehicleName: string;
  operationStaffId: number;
}

interface ApiResponse {
  success: number;
  statusCode: number;
  message: string;
  data: Location[];
}
const App: React.FC = () => {
  const [mapCenter, setMapCenter] = useState({ lat: -16.917601457089138, lng: 145.77835451688978 });
  const [locations, setLocations] = useState<Location[]>([]); // State for locations
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };
  const mapOptions = {
    zoom: 11,
    disableDefaultUI: false,
  };

  const router = useRouter();
  const { date, ownerId, routeType } = router.query;

  useEffect(() => {
    if (date && ownerId && routeType) {
      fetchCoordinates(); // Fetch data only when all parameters are available
    }
  }, [date, ownerId, routeType]);

  const fetchCoordinates = async () => {
    try {
      const response = await api.get<ApiResponse>(
        `/track/locations/list/?date=${date}&ownerId=${ownerId}&routeType=${routeType}`
      );

      if (response.data.success) {
        const fetchedLocations = response.data.data;
        setLocations(fetchedLocations);

        // Set map center to the first location if available
        if (fetchedLocations.length > 0) {
          setMapCenter({
            lat: fetchedLocations[0].latitude,
            lng: fetchedLocations[0].longitude,
          });
        }
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div style={{ height: "100%", borderRadius: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
        }}
      >
        <h1 style={{ fontSize: "24px" }}>Driver And Pilot Live Location</h1>
      </div>

      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          options={mapOptions}
        >
          {/* Render markers dynamically */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
              title={`Vehicle Name: ${location.vehicleName}, Staff ID: ${location.operationStaffId}`}
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
          onClick={fetchCoordinates}
        >
          Refresh Here
        </button>
      </div>
    </div>
  );
};

export default App;
