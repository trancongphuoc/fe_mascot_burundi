import axios from 'axios';
const BASE_URL_DEV = 'https://ikara-development.appspot.com';

const api = axios.create({
    baseURL: window.location.hostname == "localhost" ? BASE_URL_DEV : window.location.origin,
});
   
export default api;

export const token = window.sessionStorage.getItem('token');