import { ClipLoader } from 'react-spinners';

import { Button } from '@shared/components';
import { ICONS } from '@shared/constants';
import { useModalStore } from '@shared/store';

const { MODAL_SUCCESS, MODAL_WARNING, MODAL_NOTICE } = ICONS;

export type ConfirmModalProps = {
    type?: 'notice' | 'success' | 'warning';
    title: string;
    subText?: string;
    subTextColor?: string;
    okMessage?: string;
    cancelMessage?: string;
    onClickOk: () => void;
    onClickCancel: () => void;
};

export const ConfirmModal = ({
    type = 'notice',
    title,
    subText,
    subTextColor,
    okMessage = '확인',
    cancelMessage = '취소',
    onClickCancel,
    onClickOk,
}: ConfirmModalProps) => {
    // store
    const modalStore = useModalStore();

    /**
     * @function renderIconByType
     * @description 모달 타입에 따른 아이콘 렌더링
     * @param {ConfirmModalProps['type']} modalType 모달 타입
     * @returns {JSX.Element}
     */
    const renderIconByType = (modalType: ConfirmModalProps['type']): JSX.Element => {
        switch (modalType) {
            case 'success':
                return <img src={MODAL_SUCCESS} alt="success" />;
            case 'warning':
                return <img src={MODAL_WARNING} alt="warning" />;
            default:
                return <img src={MODAL_NOTICE} alt="notice" />;
        }
    };

    return (
        <div className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
            {/** confirm modal loading  */}
            {modalStore.isConfirmModalLoading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <ClipLoader size={40} color="#b4b4b4" />
                </div>
            )}
            {/** modal wrapper */}
            <div className="flex size-full flex-col gap-20 rounded-4 border-1 border-gray-400 bg-white px-24 py-20 shadow-secondary">
                {/** modal icon */}
                <div className="flex w-full items-center justify-center">{renderIconByType(type)}</div>
                {/** modal title & subtitle */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <pre className="font-pretendard text-header07 text-gray-1200">{title}</pre>
                    {subText && (
                        <pre
                            className="text-center font-pretendard text-body04 text-gray-1000"
                            style={{ color: `${subTextColor || undefined}` }}
                        >
                            {subText}
                        </pre>
                    )}
                </div>
                {/** modal button */}
                <div className="flex w-full gap-8">
                    <Button variant="secondary" color="gray" size="lg" onClick={onClickCancel}>
                        {cancelMessage}
                    </Button>
                    <Button variant="primary" color="blue" size="lg" onClick={onClickOk}>
                        {okMessage}
                    </Button>
                </div>
            </div>
        </div>
    );
};
