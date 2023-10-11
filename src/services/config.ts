import axios from "axios";
import * as React from 'react';
import { useContext } from "react";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_INDO_BASE_URL
});

export const setAxiosToken = async (token:string) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };



