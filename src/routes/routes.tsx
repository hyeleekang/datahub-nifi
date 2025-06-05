import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@shared/constants';

import { App } from '@app/App';

import { NifiManagementPage } from '@pages/NifiManagementPage';

export const routes = createBrowserRouter(
    [
        {
            element: <App />,
            children: [
                { index: true, path: ROUTES.root, element: <Navigate to={ROUTES.nifiManagement} replace /> },
                {
                    handle: 'NifiManagementPage',
                    path: ROUTES.nifiManagement,
                    children: [{ index: true, element: <NifiManagementPage /> }],
                },
            ],
        },
    ],
    {
        /** base url 설정 */
        basename: '/',
    },
);
