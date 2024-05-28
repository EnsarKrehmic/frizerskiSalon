import axios from 'axios';

// host za backend
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchData = () => {
    return api.get('/api/data');
};