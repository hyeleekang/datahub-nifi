import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 공통 상태를 포함한 객체로, 사이드바 열기 여부를 포함합니다.
 * @type {CommonState}
 * @property {boolean} isSideBarOpen 사이드바 열기 여부.
 */
type CommonState = {
    isSideBarOpen: boolean;
};

/**
 * 공통 저장소에서 수행할 수 있는 액션들.
 *  @type {CommonActions}
 * @property {(isSideBarOpen: boolean) => void} setIsSideBarOpen 사이드바 열기 여부를 설정하는 함수.
 * @property {() => void} reset 인증 상태를 초기값으로 재설정하는 함수.
 */
type CommonActions = {
    setIsSideBarOpen: (isSideBarOpen: boolean) => void;
    reset: () => void;
};

/**
 * 공통 저장소의 초기 상태.
 * @type {CommonState}
 */
const initialState: CommonState = {
    isSideBarOpen: false,
};

/**
 * 공통 상태를 관리하는 Zustand 저장소로, 사이드바 열기 여부를 포함합니다.
 * 상태를 zustand 스토리지에 저장합니다.
 */
export const useCommonStore = create(
    persist<CommonState & CommonActions>(
        set => ({
            ...initialState,
            setIsSideBarOpen: (isSideBarOpen: boolean) => set({ isSideBarOpen }),
            reset: () => {
                set(initialState);
            },
        }),
        {
            name: 'commonStorage',
        },
    ),
);
