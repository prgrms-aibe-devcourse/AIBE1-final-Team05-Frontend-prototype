import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/mainpage/HomePage';
import CategoriesPage from '@/pages/mainpage/CategoriesPage';
import WorkshopsPage from '@/pages/mainpage/WorkshopsPage';
import SupportPage from '@/pages/mainpage/SupportPage';
import LoginPage from '@/pages/auth/LoginPage';
import RoleSelectionPage from '@/pages/auth/RoleSelectionPage';
import NotFoundPage from "@/pages/mainpage/NotFoundPage.tsx";

// React Router 6 사용
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,      // Header + Outlet + Footer
        children: [
            // 메인페이지
            { index: true, element: <HomePage /> },
            { path: 'categories', element: <CategoriesPage /> },
            { path: 'workshops', element: <WorkshopsPage /> },
            { path: 'support', element: <SupportPage /> },

            //로그인 & 역할선택
            { path: 'login', element: <LoginPage /> },
            { path: 'role-selection', element: <RoleSelectionPage /> },

            // 404 페이지
            { path: '*',element: <NotFoundPage/>},
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;