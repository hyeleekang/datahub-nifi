import { Outlet } from 'react-router-dom';

import { SideBar } from '@shared/components';
/**
 * @function PublicLayout
 * @description 공개 router 레이아웃 컴포넌트
 * @return {JSX.Element}
 */
export const PublicLayout = (): JSX.Element => {
    return (
        <div className="flex size-full min-h-screen overflow-hidden">
            <header>{/* 네비게이션 바 등 공통 요소 */}</header>
            <SideBar />
            <main className="container mx-auto px-4">
                {/* 자식 라우트가 렌더링되는 위치 */}
                <Outlet />
            </main>
            <footer>{/* 푸터 */}</footer>
        </div>
    );
};
