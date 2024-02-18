import axios from '../api/axios';

export const fetchProviders = async () => {
    try {
        const response = await axios.get('https://data.cityofnewyork.us/resource/7btz-mnc8.json?$limit=2');
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
};