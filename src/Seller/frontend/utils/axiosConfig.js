import axios from 'axios';

const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('seller_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                localStorage.removeItem('seller_token');
                localStorage.removeItem('seller');
                window.location.href = '/seller/login';
            }
            return Promise.reject(error);
        }
    );
};

export { setupAxiosInterceptors }; 