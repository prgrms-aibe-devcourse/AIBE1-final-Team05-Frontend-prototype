import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/mainpage/HomePage';
import CategoriesPage from '@/pages/mainpage/CategoriesPage';
import WorkshopsPage from '@/pages/mainpage/WorkshopsPage';
import SupportPage from '@/pages/mainpage/SupportPage';
import NotFoundPage from '@/pages/mainpage/NotFoundPage';
import LoginPage from '@/pages/auth/LoginPage';
import RoleSelectionPage from '@/pages/auth/RoleSelectionPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            // 메인 애플리케이션 라우트
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'categories',
                element: <CategoriesPage />,
            },
            {
                path: 'workshops',
                element: <WorkshopsPage />,
            },
            {
                path: 'support',
                element: <SupportPage />,
            },
            // 🆕 인증 라우트도 Layout 안에 포함
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'role-selection',
                element: <RoleSelectionPage />,
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;