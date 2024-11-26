import axios from 'axios';
import {useNavigate} from 'react-router-dom';
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

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const {response} = error;
        const navigate = useNavigate();

        if (response) {
            const {status} = response;
            switch (status) {
                case 401    :
                    toast.error('Unauthorized access - redirecting to login...');
                    navigate('/login');
                    break;

                case 403:
                    toast.error('You do not have the necessary permissions to perform this action.');
                    navigate('/home');
                    break;

            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
