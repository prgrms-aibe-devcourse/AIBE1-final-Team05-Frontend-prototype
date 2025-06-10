import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/mainpage/HomePage';
import CategoriesPage from '@/pages/mainpage/CategoriesPage';
import WorkshopsPage from '@/pages/mainpage/WorkshopsPage';
import SupportPage from '@/pages/mainpage/SupportPage';
import NotFoundPage from "@/pages/mainpage/NotFoundPage.tsx";
import SellerInfoPage from '@/pages/SellerInfoPage';

// React Router 7 사용
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

            // 판매자 상세 페이지 추가
            { path: 'seller/:sellerId', element: <SellerInfoPage /> },

            // 404 페이지
            { path: '*',element: <NotFoundPage/>},
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;