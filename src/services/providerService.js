import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const MAPBOX_GEOCODING_URL = process.env.REACT_APP_MAPBOX_GEOCODING_URL;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const fetchProviders = async (searchAttribute, searchTerm) => {
  try {
    if (!BASE_URL || !MAPBOX_GEOCODING_URL || !MAPBOX_TOKEN) {
      console.error("Missing environment variables");
      throw new Error("Configuration error");
    }

    const params = {
      $where: `practice_borough='${searchTerm}'`,
      $limit: 5,
    };

    console.log("Fetching with params:", params);
    const response = await axios.get(BASE_URL, { params });

    const providersWithCoordinates = await Promise.all(
      response.data.map(async (provider) => {
        try {
          if (provider.practice_zip_code) {
            const geocodeResponse = await axios.get(
              `${MAPBOX_GEOCODING_URL}/${provider.practice_zip_code}.json`,
              {
                params: {
                  access_token: MAPBOX_TOKEN,
                  limit: 1,
                  country: "US",
                  types: "postcode",
                  proximity: "-73.935242,40.730610",
                },
              }
            );

            if (
              geocodeResponse.data.features &&
              geocodeResponse.data.features.length > 0
            ) {
              const [lng, lat] = geocodeResponse.data.features[0].center;
              return {
                ...provider,
                longitude: lng,
                latitude: lat,
              };
            }
          }
          return provider;
        } catch (error) {
          console.error("Geocoding error:", error);
          return provider;
        }
      })
    );

    return providersWithCoordinates;
  } catch (error) {
    console.error("Error details:", error.response?.data || error);
    throw error;
  }
};
