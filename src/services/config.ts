import axios from "axios";
import * as React from 'react';

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_INDO_BASE_URL
});

export const axiosFileInstance = axios.create({
        responseType: 'arraybuffer' as 'json', // To receive image data as an array buffer
    // baseURL: import.meta.env.VITE_INDO_BASE_URL
});

export const setAxiosToken = async (token:string) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosFileInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };



