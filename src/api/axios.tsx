import axios from 'axios';
const BASE_URL = 'http://localhost:5173';
const BASE_URL_DEV = 'https://ikara-development.appspot.com';


const api = axios.create({
    baseURL: window.location.protocol +'//'+window.location.hostname,
});
   
export default api;
export { BASE_URL_DEV };