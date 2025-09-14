import axios from 'axios'
import { environments } from '@/config/environments/index'

const axiosInstance = axios.create({
    baseURL: environments.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

export default axiosInstance 