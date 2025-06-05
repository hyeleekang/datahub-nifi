import axios from 'axios';

const DEFAULT_TIMEOUT = 300000; // 5분

/**
  @description: API 인스턴스 생성
  @returns {AxiosInstance} - API 인스턴스
*/
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});
