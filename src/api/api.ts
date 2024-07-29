import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

API.interceptors.response.use((response:AxiosResponse) => response,
  async (error:AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry ) {
      original._retry = true;
      try {
        
      } catch (error) {
        
      }
    }

  }
)

export default API

