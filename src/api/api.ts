import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { tokenSet } from "utils/util";
import { renewToken } from "./users/usersApi";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // }
})

API.interceptors.response.use((response:AxiosResponse) => response,
  async (error:AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry ) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await renewToken() as { accessToken: string };
        console.log('renewed')
        alert('renewed')
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        if (!originalRequest.headers) originalRequest.headers = {};

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    }
    return Promise.reject(error);
  }
)

export default API

