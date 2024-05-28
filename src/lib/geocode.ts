// utils/geocode.js

import axios from "axios";

const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

interface Props {
  latitude: number;
  longitude: number;
  GOOGLE_API: string;
}

export const getAddressFromCoordinates = async ({
  latitude,
  longitude,
  GOOGLE_API,
}: Props) => {
  const url = `${GEOCODING_API_URL}?latlng=${latitude},${longitude}&key=${GOOGLE_API}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const address = response.data.results[0].formatted_address;
      return address;
    } else {
      throw new Error(response.data.error_message || "Failed to get address");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

export const getNearbyPlaces = async ({
  latitude,
  longitude,
  GOOGLE_API,
}: Props) => {
  const url = `${PLACES_API_URL}?location=${latitude},${longitude}&radius=1500&key=${GOOGLE_API}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.results.map((place: any) => place.name);
    } else {
      throw new Error(
        response.data.error_message || "Failed to get nearby places"
      );
    }
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};
