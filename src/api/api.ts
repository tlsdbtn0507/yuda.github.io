import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { tokenSet } from "utils/util";
import { renewToken } from "./users/usersApi";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
})

API.interceptors.response.use((response:AxiosResponse) => response,
  async (error:AxiosError) => {
    const originalRequest = error.config as
      AxiosRequestConfig & { _retry?: boolean, _retryCount?: number };
    
    //재시도 횟수 초기화
    if (originalRequest._retryCount === undefined) {
      originalRequest._retryCount = 0;
    }

    if (error.response?.status === 401
      && !originalRequest._retry
      && originalRequest._retryCount < 2
    ) {
      originalRequest._retry = true;
      originalRequest._retryCount += 1; // 재시도 횟수 증가

      try {
        const { accessToken } = await renewToken();

        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        if (!originalRequest.headers) originalRequest.headers = {};

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return API(originalRequest);
      } catch (error) {
        console.error('토큰 갱신 실패:', error);
      }
    }
    return Promise.reject(error);
  }
)

export default API

