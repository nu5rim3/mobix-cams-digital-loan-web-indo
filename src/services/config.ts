import axios from "axios";
import * as React from 'react';

export const axiosInstance = axios.create({
    baseURL: '/indo-digital-loan'
});

export const axiosFileInstance = axios.create({
        responseType: 'arraybuffer' as 'json', // To receive image data as an array buffer
        baseURL: '/indo-digital-loan'
});

export const setAxiosToken = async (token:string, idx: any) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosFileInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common['X-Auth-Token'] = btoa(idx);
        axiosFileInstance.defaults.headers.common['X-Auth-Token'] = btoa(idx);
    }
  };



