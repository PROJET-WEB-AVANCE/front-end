import axios from 'axios';
import {getCurrentToken} from "../services/auth.service";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCurrentToken()?.token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
        if (error) {
            switch (error.status) {
                case 403:
                    toast.error('You are not authorized to access this resource', {
                        position: "top-right",
                        duration: 5000,
                    });
                    window.location.href = '/home';
                    break;
                case 401:
                    toast.error('You are not authenticated', {
                        position: "top-right",
                        duration: 5000,
                    });
                    window.location.href = '/login';
                    break;

            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
