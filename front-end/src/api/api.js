import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3006/api', // Địa chỉ API của bạn
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
