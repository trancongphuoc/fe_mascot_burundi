import axios from 'axios';
// const BASE_URL = 'http://localhost:5173';
const BASE_URL_DEV = 'https://ikara-development.appspot.com';


const api = axios.create({
    baseURL: 'https://ikara-development.appspot.com',
});
   
export default api;
export { BASE_URL_DEV };