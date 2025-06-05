import {
    UseMutationOptions,
    UseMutationResult,
    UseQueryOptions,
    UseQueryResult,
    useMutation,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosInstance } from './axios';

/**
 * @type ApiConfig
 * @description API 요청 설정
 * @property {string} url - API 요청 URL
 * @property {'GET' | 'PUT'} method - API 요청 메서드
 * @property {object} params - API 요청 파라미터
 * @property {any} data - API 요청 데이터
 * @property {object} headers - API 요청 헤더
 */
export type ApiConfig = {
    url: string;
    method: 'GET' | 'PUT';
    params?: object;
    data?: unknown;
    headers?: object;
};

/**
 * @constant defaultQueryOptions
 * @description 기본 쿼리 옵션
 */
const defaultQueryOptions = {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 300000, // 5분
};

/**
 * @function useApiQuery
 * @description GET 요청을 위한 hook
 * @param {string[]} key - 쿼리 키
 * @param {Omit<ApiConfig, 'method'>} config - API 요청 설정
 * @param {UseQueryOptions<AxiosResponse<T>, AxiosError>} options - 쿼리 옵션
 * @returns {UseQueryResult<AxiosResponse<T>, AxiosError>} - 쿼리 결과
 */
export function useApiQuery<T = unknown>(
    key: string[],
    config: Omit<ApiConfig, 'method'>,
    options?: Omit<UseQueryOptions<AxiosResponse<T>, AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<AxiosResponse<T>, AxiosError> {
    return useQuery<AxiosResponse<T>, AxiosError>({
        ...defaultQueryOptions,
        queryKey: key,
        queryFn: async () => {
            const response = await axiosInstance({
                method: 'GET',
                ...config,
            });
            return response;
        },
        ...options,
    });
}

/**
 * @function useApiMutation
 * @description PUT 요청을 위한 hook
 * @param {Omit<ApiConfig, 'params'>} config - API 요청 설정
 * @param {UseMutationOptions<AxiosResponse<T>, AxiosError, D>} options - 뮤테이션 옵션
 * @returns {UseMutationResult<AxiosResponse<T>, AxiosError, D>} - 뮤테이션 결과
 */
export function useApiMutation<T = unknown, D = unknown>(
    config: Omit<ApiConfig, 'params'>,
    options?: UseMutationOptions<AxiosResponse<T>, AxiosError, D>,
): UseMutationResult<AxiosResponse<T>, AxiosError, D> {
    return useMutation({
        mutationFn: async (data: D) => {
            const response = await axiosInstance({
                ...config,
                data,
            });
            return response;
        },
        ...options,
    });
}

/**
 * @function useGet
 * @description GET 요청을 위한 편의성을 위한 래퍼 함수
 * @param {string[]} key - 쿼리 키
 * @param {string} url - API 요청 URL
 * @param {object} params - 요청 파라미터
 * @param {UseQueryOptions<AxiosResponse<T>, AxiosError>} options - 쿼리 옵션
 * @returns {UseQueryResult<AxiosResponse<T>, AxiosError>} - 쿼리 결과
 */
export function useGet<T = unknown>(
    key: string[],
    url: string,
    params?: object,
    options?: Omit<UseQueryOptions<AxiosResponse<T>, AxiosError>, 'queryKey' | 'queryFn'>,
): UseQueryResult<AxiosResponse<T>, AxiosError> {
    return useApiQuery<T>(key, { url, params }, options);
}

/**
 * @function usePut
 * @description PUT 요청을 위한 편의성을 위한 래퍼 함수
 * @param {string} url - API 요청 URL
 * @param {UseMutationOptions<AxiosResponse<T>, AxiosError, D>} options - 뮤테이션 옵션
 * @returns {UseMutationResult<AxiosResponse<T>, AxiosError, D>} - 뮤테이션 결과
 */
export function usePut<T = unknown, D = unknown>(
    url: string,
    options?: UseMutationOptions<AxiosResponse<T>, AxiosError, D>,
): UseMutationResult<AxiosResponse<T>, AxiosError, D> {
    return useApiMutation<T, D>({ url, method: 'PUT' }, options);
}
