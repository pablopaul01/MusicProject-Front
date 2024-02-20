import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:8080"
    baseURL: "https://musicproject-back.onrender.com"
})