import classNames from 'classnames';

import { useCommonStore } from '@shared/store';

/**
 * @type ContentProps
 * @description Content 컴포넌트 속성 정의
 * @property {React.ReactNode} children 자식 요소
 */
type ContentProps = {
    children: React.ReactNode;
};

/**
 * @function Content
 * @description Content 컴포넌트
 * @param {ContentProps} props Content 컴포넌트 속성
 * @returns {JSX.Element}
 */
export const Content = ({ children }: ContentProps): JSX.Element => {
    // store
    const commonStore = useCommonStore();

    return (
        <div
            className={classNames('relative z-40 w-full', {
                'ml-58': !commonStore.isSideBarOpen,
                'ml-180': commonStore.isSideBarOpen,
            })}
        >
            {children}
        </div>
    );
};
