import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://musicproject-back.onrender.com"
})