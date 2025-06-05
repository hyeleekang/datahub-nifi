import classNames from 'classnames';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { ICONS, ROUTES } from '@shared/constants';
import { useCommonStore } from '@shared/store';

const { SMALL_LOGO, FOLDER, DOUBLE_ARROW_LEFT, DOUBLE_ARROW_RIGHT } = ICONS;

/**
 * @function SideBar
 * @description 사이드바 컴포넌트
 * @returns {JSX.Element}
 */
export const SideBar = (): JSX.Element => {
    // store
    const commonStore = useCommonStore();
    // state
    const [isSideBarMouseOver, setIsSideBarMouseOver] = useState(false);
    // hooks
    const navigate = useNavigate();

    /**
     * @function getNavLinkClasses
     * @description react-router-dom Link 클래스 정의
     */
    const getNavLinkClasses = (isActive: boolean, isDisabled = false) =>
        classNames('flex size-40 items-center rounded-4', {
            'bg-gray-300': isActive,
            'hover:bg-gray-300': !isActive && !isDisabled,
            'cursor-pointer': !isDisabled,
            'cursor-default opacity-50': isDisabled,
            'justify-center': !commonStore.isSideBarOpen,
            'justify-start w-full px-8 gap-8': commonStore.isSideBarOpen,
        });

    return (
        <aside
            className={classNames(
                'fixed z-50 flex h-full flex-col items-center justify-between border-r-1 border-gray-400 bg-white py-28',
                {
                    'w-58': !commonStore.isSideBarOpen,
                    'w-180': commonStore.isSideBarOpen,
                },
            )}
            onMouseOver={() => setIsSideBarMouseOver(true)}
            onMouseLeave={() => setIsSideBarMouseOver(false)}
            onFocus={() => setIsSideBarMouseOver(true)}
            onBlur={() => setIsSideBarMouseOver(false)}
        >
            {/* 사이드바 로고 및 메뉴 버튼 영역 (top) */}
            <div className="flex w-full flex-col items-center justify-center">
                <div
                    className={classNames(
                        'absolute -right-12 top-27 flex h-28 w-24 items-center justify-center rounded-4 border-1 border-gray-400 bg-white transition-all duration-300',
                        'translate-x-4 opacity-0', // 기본 상태
                        {
                            'translate-x-0 opacity-100': isSideBarMouseOver, // 마우스 오버 시
                        },
                    )}
                >
                    <button
                        type="button"
                        className="flex size-40 items-center justify-center focus:outline-none focus-visible:ring-0"
                        onClick={() => commonStore.setIsSideBarOpen(!commonStore.isSideBarOpen)}
                    >
                        <img src={commonStore.isSideBarOpen ? DOUBLE_ARROW_LEFT : DOUBLE_ARROW_RIGHT} alt="logo" />
                    </button>
                </div>
                {/* 로고 자리 */}
                <div className="flex h-22 cursor-pointer items-center justify-center">
                    <button
                        type="button"
                        className={classNames(
                            'flex items-center overflow-hidden transition-all duration-300 ease-in-out',
                            {
                                'w-120 justify-center': commonStore.isSideBarOpen,
                                'w-24 justify-center': !commonStore.isSideBarOpen,
                            },
                        )}
                        onClick={() => navigate(ROUTES.nifiManagement)}
                    >
                        {commonStore.isSideBarOpen ? (
                            // <span className="whitespace-nowrap font-tech text-xl font-bold text-gray-1100 transition-colors duration-200 hover:text-blue-500">
                            <span className="whitespace-nowrap bg-transparent bg-clip-text font-tech text-xl font-bold [-webkit-background-clip:text] [background-image:conic-gradient(from_195.42deg_at_62%_12.96%,#388EFF_0deg,#0341A3_180deg,#022255_360deg)] [color:transparent]">
                                DATAHUB
                            </span>
                        ) : (
                            <img src={SMALL_LOGO} alt="logo" />
                        )}
                    </button>
                </div>
                <div
                    className={classNames('mt-8 flex flex-col justify-center gap-8 py-10', {
                        'w-full px-8': commonStore.isSideBarOpen,
                    })}
                >
                    {/** Nifi 관리 */}
                    <NavLink to={ROUTES.nifiManagement} className={({ isActive }) => getNavLinkClasses(isActive)}>
                        <div data-tooltip-id="menuTooltip" data-tooltip-content="Nifi 관리">
                            <img src={FOLDER} alt="logo" className="text-gray-1100" />
                        </div>
                        {commonStore.isSideBarOpen && <span className="text-body05 text-gray-1100">Nifi 관리</span>}
                    </NavLink>
                </div>
            </div>
            {/** tooltip */}
            <Tooltip
                id="menuTooltip"
                place="right"
                className="z-50 !bg-white !text-body06 !text-gray-1100 drop-shadow"
            />
        </aside>
    );
};
