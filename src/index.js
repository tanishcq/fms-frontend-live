import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import {
    AdminHomePage,
    Analytics,
    ReportBug,
} from 'pages/admin';

import ImportSheetPage from 'pages/admin/ImportSheetPage/ImportSheetPage';

// import { Sidebar } from 'components';

import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    // createRoutesFromElements,
    // Route,
} from 'react-router-dom';

import { LandingPage, LoginPage, ForgotPassword } from 'pages';
import NotFound from './pages/NotFound/NotFound.jsx';

import LoginProtected from './components/LoginProtected.jsx';
import Protected from './components/Protected.jsx';

const AppLayout = () => (
    <>
        {/* <Sidebar /> */}
        <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="light"
        />
        <Outlet />
    </>
);

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route element={<AppLayout />}>
//             <Route path="/" element={<LandingPage />} />
//             <Route
//                 path="/login"
//                 element={<LoginProtected component={LoginPage} />}
//             />
//             <Route
//                 path="/forgot-password"
//                 element={<LoginProtected component={ForgotPassword} />}
//             />
//             <Route
//                 path="/admin/dashboard"
//                 element={<Protected component={AdminHomePage} />}
//             />
//             <Route
//                 path="/admin/analytics"
//                 element={<Protected component={Analytics} />}
//             />
//             <Route
//                 path="/admin/change-password"
//                 element={<Protected component={ChangePassword} />}
//             />
//             <Route
//                 path="/admin/report-bug"
//                 element={<Protected component={ReportBug} />}
//             />
//             <Route path="*" element={<NotFound />} />
//         </Route>,
//     ),
// );

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: '/login',
                element: <LoginProtected component={LoginPage} />,
            },
            {
                path: '/forgot-password',
                element: <LoginProtected component={ForgotPassword} />,
            },
            {
                path: '/admin/dashboard',
                element: <Protected component={AdminHomePage} />,
            },
            {
                path: '/admin/analytics',
                element: <Protected component={Analytics} />,
            },
            {
                path: '/admin/import-sheet',
                element: <Protected component={ImportSheetPage} />,
            },
            {
                path: '/admin/report-bug',
                element: <Protected component={ReportBug} />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
