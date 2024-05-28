import React, { useEffect, useState } from "react";

import { getAddressFromCoordinates, getNearbyPlaces } from "@/lib/geocode";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  setLatitude,
  setLongitute,
  setResturents,
} from "@/store/getLocations/LocationSlice";
import axios from "axios";

const GOOGLE_API = "AIzaSyDe-ZOLNib2nv_i3gTo10Ndf4-WAs71IdI";

const LocationComponent = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          dispatch(setLongitute(longitude));
          dispatch(setLatitude(latitude));
          try {
            const address = await getAddressFromCoordinates({
              latitude,
              longitude,
              GOOGLE_API,
            });
            setAddress(address);
            const places = await getNearbyPlaces({
              latitude,
              longitude,
              GOOGLE_API,
            });

            setNearbyPlaces(places);
          } catch (error: any) {
            setError("Failed to get address");
          }
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${GOOGLE_API}`
        );
        const predictions = response.data.predictions.map(
          (prediction: any) => prediction.description
        );
        setNearbyPlaces(predictions);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    } else {
      setNearbyPlaces([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=1500&type=restaurant&keyword=${address}&key=${GOOGLE_API}`
      );

      const places = response.data.results.map((place: any) => ({
        name: place.name,
        address: place.vicinity,
        image: place.icon,
        rating: place.rating,
        userRating: place.user_ratings_total,
      }));
      dispatch(setResturents(places));

      setRestaurants(places);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div className="w-[50%] bg-black p-2 rounded-[10px]">
      <form className="flex gap-4 w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder="Search Mockups, Logos..."
            value={address}
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onChange={handleSearchChange}
          />
          {isFocused && nearbyPlaces.length > 0 && (
            <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-10">
              {nearbyPlaces.map((place, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setAddress(place)}
                >
                  {place}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={(e: any) => handleSubmit(e)}
          className="end-2.5 bottom-2.5 bg-[#90EA93] text-black font-bold focus:ring-4 focus:outline-none focus:ring-black rounded-lg text-sm px-4 py-2"
        >
          Find Restaurants
        </button>
      </form>
    </div>
  );
};

export default LocationComponent;
