import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        'https://raw.githubusercontent.com/brandiqa/json-examples/master/src/',
});

axiosInstance.interceptors.request.use(config => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
        'Content-Type': 'application/json',
    };
    return config;
});

export default axiosInstance;
