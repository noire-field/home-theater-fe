import axios from 'axios';

export const AppAPI = axios.create({ 
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
})

export type { AxiosResponse, AxiosError } from 'axios';