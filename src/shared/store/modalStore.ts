import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 모달 상태를 포함한 객체로, 모달 닫힘 블록 여부를 포함합니다.
 * @type {ModalState}
 * @property {boolean} blockClose 모달 닫힘 블록 여부.
 */
type ModalState = {
    blockClose: boolean;
    isLoading: boolean;
    isConfirmModalLoading: boolean;
};

/**
 * 모달 저장소에서 수행할 수 있는 액션들.
 *  @type {ModalActions}
 * @property {(blockClose: boolean) => void} setBlockClose 모달 닫힘 블록 여부를 설정하는 함수.
 */
type ModalActions = {
    setBlockClose: (blockClose: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsConfirmModalLoading: (isConfirmModalLoading: boolean) => void;
    reset: () => void;
};

/**
 * 모달 저장소의 초기 상태.
 * @type {ModalState}
 */
const initialState: ModalState = {
    blockClose: false,
    isLoading: false,
    isConfirmModalLoading: false,
};

/**
 * 모달 상태를 관리하는 Zustand 저장소로, 모달 닫힘 블록 여부를 포함합니다.
 * 상태를 zustand 스토리지에 저장합니다.
 */
export const useModalStore = create(
    persist<ModalState & ModalActions>(
        set => ({
            ...initialState,
            setBlockClose: (blockClose: boolean) => set({ blockClose }),
            setIsLoading: (isLoading: boolean) => set({ isLoading }),
            setIsConfirmModalLoading: (isConfirmModalLoading: boolean) => set({ isConfirmModalLoading }),
            reset: () => set(initialState),
        }),
        {
            name: 'modalStorage',
        },
    ),
);
