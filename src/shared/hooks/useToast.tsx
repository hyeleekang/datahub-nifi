import { toast } from 'react-toastify';

import { ToastAlert, ToastAlertProps } from '@shared/components';

export const useToast = () => {
    const showToast = (props: ToastAlertProps) => {
        toast(<ToastAlert {...props} />, {
            // 기본 스타일링 비활성화
            className: 'custom-toast-container',
            progressClassName: 'custom-toast-progress',
            // 기본 컨테이너 스타일 제거
            style: {},
            // 기본 애니메이션 비활성화 (선택사항)
            transition: undefined,
        });
    };

    return showToast;
};
