import axios from 'axios';
import { useCallback } from 'react';

import { useToast } from '@shared/hooks/useToast';

/**
 * @type statusHandlersType
 * @description 상태 핸들러 타입
 * @property {number} [key: number] - 상태 코드
 * @property {function} default - 기본 상태 핸들러
 */
export type statusHandlersType = {
    [key: number]: (msg: string) => void;
    default: () => void;
};

/**
 * @function useApiError
 * @description API 에러 처리 함수
 * @returns {object} - 에러 처리 함수
 */
export const useApiError = () => {
    const showToast = useToast();

    const statusHandlers: statusHandlersType = {
        400: (msg: string) => {
            showToast({ type: 'error', title: msg || '잘못된 요청입니다.' });
        },
        500: () => {
            showToast({ type: 'error', title: '서버 오류가 발생했습니다.' });
        },
        default: () => {
            showToast({ type: 'error', title: '서버에서 알 수 없는 오류가 발생했습니다.' });
        },
    };

    const handleError = useCallback(
        (error: unknown) => {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const httpStatus = error.response?.status;
                    const errorResponse = error.response?.data;
                    const httpMessage = errorResponse.message;

                    const handler = httpStatus ? statusHandlers[httpStatus] : statusHandlers.default;
                    handler(httpMessage);
                } else {
                    showToast({ type: 'error', title: '서버 연결이 원활하지 않습니다.' });
                }
            } else {
                showToast({ type: 'error', title: '네트워크 연결 오류 또는 기타 오류가 발생했습니다.' });
            }
        },
        [showToast],
    );

    return { handleError };
};
