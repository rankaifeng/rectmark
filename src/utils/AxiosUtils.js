import axios from 'axios';
import qs from 'qs';
const Axios = axios.create({
    baseURL: 'http://192.168.30.115:3001/',
    timeout: '30000',
    responseType: 'json',
    withCredentials: 'true',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
})

Axios.interceptors.request.use(
    config => {
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "get"
        ) {
            config.data = JSON.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

Axios.interceptors.response.use(
    res => {
        return res.data
    }, error => {
        return Promise.reject(error);
    }
)

export default Axios;