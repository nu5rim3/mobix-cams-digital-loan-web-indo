import axios from "axios";
import * as React from 'react';

export const axiosInstance = axios.create({
    baseURL: '/indo-digital-loan',
});

export const axiosFileInstance = axios.create({
        responseType: 'arraybuffer' as 'json', // To receive image data as an array buffer
        baseURL: '/indo-digital-loan',
});

export const setAxiosToken = async (token:string, idx: any) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosFileInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.defaults.headers.common['X-Auth-Token'] = btoa(idx);
        axiosFileInstance.defaults.headers.common['X-Auth-Token'] = btoa(idx);
        axiosInstance.defaults.headers.common['Content-Security-Policy'] = "default-src 'self' http: https: data: blob: 'unsafe-inline'";
        axiosInstance.defaults.headers.common['X-Frame-Options'] = "SAMEORIGIN";
        // axiosInstance.defaults.headers.common['Set-Cookie'] = "Path=/; HttpOnly; Secure";
        axiosInstance.defaults.headers.common['Strict-Transport-Security'] = "max-age=31536000; includeSubDomains";
    }
  };



