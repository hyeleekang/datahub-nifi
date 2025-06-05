import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import { Content, SideBar } from '@shared/components';

export const App = (): JSX.Element => {
    return (
        <div spellCheck={false} className="flex size-full min-h-screen max-w-1920 overflow-hidden bg-container">
            <SideBar />
            <Content>
                <Outlet />
            </Content>
            <ToastContainer
                limit={1}
                autoClose={1500}
                closeButton={false}
                position="top-center"
                transition={Slide}
                hideProgressBar
                className="root-toast-container"
                toastClassName="root-toast"
                closeOnClick
            />
        </div>
    );
};
