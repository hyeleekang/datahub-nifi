import { ICONS } from '@shared/constants';

const { MODAL_SUCCESS, MODAL_WARNING } = ICONS;

/**
 * @type ToastAlertProps
 * @description 토스트 알림 컴포넌트 타입
 */
export type ToastAlertProps = {
    type?: 'success' | 'error';
    title: string;
    subText?: string;
};

/**
 * @function ToastAlert
 * @description 토스트 알림 컴포넌트
 * @param {ToastAlertProps} props 토스트 알림 컴포넌트 프로퍼티
 * @returns {JSX.Element}
 */
export const ToastAlert = ({ type = 'success', title, subText }: ToastAlertProps): JSX.Element => {
    return (
        <div className="flex w-fit max-w-300 flex-col gap-16 rounded-4 bg-gray-1200 px-24 py-20 shadow-secondary">
            <div className="flex w-full items-center justify-center">
                <img src={type === 'success' ? MODAL_SUCCESS : MODAL_WARNING} alt="toast type icon" />
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-8">
                <span className="whitespace-normal break-keep text-center text-subheader02 text-white">{title}</span>
                {subText && (
                    <span className="whitespace-normal break-keep text-center text-body04 text-gray-200">
                        {subText}
                    </span>
                )}
            </div>
        </div>
    );
};
