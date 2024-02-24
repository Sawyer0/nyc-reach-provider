import axios from "axios";
import axiosInstance from "../api/axios";

const mapboxGeocode = async (address) => {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json`;

  try {
    const response = await axios.get(url, {
      params: { access_token: accessToken },
    });

    if (response.data.features && response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].center;
      return { longitude, latitude };
    }
    return { longitude: null, latitude: null };
  } catch (error) {
    console.error("Error during Mapbox geocoding:", error);
    return { longitude: null, latitude: null };
  }
};

export const fetchProviders = async (attribute, searchTerm) => {
  try {
    const queryParams = new URLSearchParams({
      [attribute]: searchTerm,
    }).toString();
    const response = await axiosInstance.get(`/7btz-mnc8.json?${queryParams}`);

    const providersWithCoords = await Promise.all(
      response.data.map(async (provider) => {
        if (!provider.longitude || !provider.latitude) {
          const fullAddress = `${provider.practice_name}, ${provider.practice_mailing_address}, ${provider.practice_borough}, NY ${provider.practice_zip_code}`;
          const coords = await mapboxGeocode(fullAddress);
          return { ...provider, ...coords };
        }
        return provider;
      })
    );

    return providersWithCoords.filter((p) => p.longitude && p.latitude);
  } catch (error) {
    console.error("Error occurred while fetching providers:", error);
    throw error;
  }
};
