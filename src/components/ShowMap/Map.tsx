import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const api_key = "AIzaSyDe-ZOLNib2nv_i3gTo10Ndf4-WAs71IdI";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = () => {
  const [markersData, setMarkersData] = useState([]);
  const { latitude, longitude } = useSelector((state: any) => state.lcation);
  const [markerLocation, setMarkerLocation] = useState("");
  const [location, setLocation] = useState({ lat: latitude, lng: longitude });

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!markerLocation) return;

      const radius = 1500;
      const apiKey = api_key;
      const type = markerLocation;

      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Fetched successfully:", typeof data, data);
          setMarkersData(data.results);
        } else {
          throw new Error("Invalid response format: not JSON");
        }
      } catch (error: any) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchData();
  }, [markerLocation, location]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />

      {markersData.map((marker: any) => (
        <Marker key={marker.place_id} position={marker.geometry.location} />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
