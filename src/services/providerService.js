import axiosInstance from '../api/axios';

export const fetchProviders = async (attribute, searchTerm) => {
  try{
    const queryParams = new URLSearchParams ({
      [attribute]: searchTerm,
    }).toString();
    const requestUrl = `7btz-mnc8.json?${queryParams}`;
    const response = await axiosInstance.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error("Error occured while fetching providers:", error);
    throw error;
  }
};