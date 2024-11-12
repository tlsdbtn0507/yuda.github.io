import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { renewToken } from "./users/usersApi";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const getLocation = async () => {
  const { data } = await axios.get(process.env.REACT_APP_IPINFO_URL as string);
  return data.loc.split(",") as string[];
};

export const getLocation = async () => {
  const { data } = await axios.get(process.env.REACT_APP_IPINFO_URL as string);
  return data.loc.split(',') as string[];
}


let isRefreshing = false; // Token refresh 상태를 추적하는 플래그
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];
// 실패한 요청 큐

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token);
    } else {
      reject(error!);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    if (error.response?.status === 401) {
      if (originalRequest._retry) {
        // 이미 재시도 중일 때, 실패한 요청을 큐에 저장
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err: AxiosError) => Promise.reject(err));
      }

      // 첫 번째 재시도
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      if (originalRequest._retryCount > 2) {
        return Promise.reject(error); // 재시도 횟수 초과 시 오류 반환
      }

      if (isRefreshing) {
        // 이미 토큰 갱신 중일 때, 실패한 요청을 큐에 저장
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token: string) => {
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err: AxiosError) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const { accessToken } = await renewToken();

        // API의 기본 헤더와 원래 요청 헤더에 새 토큰 설정
        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        // 원래 요청 재시도
        return API(originalRequest);
      } catch (tokenError) {
        processQueue(tokenError as AxiosError, null);
        return Promise.reject(tokenError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
