import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers['X-App-Token'] = API_TOKEN;
    return config;
});

export default axiosInstance;