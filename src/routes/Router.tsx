import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/mainpage/HomePage.tsx';
import CategoriesPage from '@/pages/mainpage/CategoriesPage.tsx';
import WorkshopsPage from '@/pages/mainpage/WorkshopsPage.tsx';
import SupportPage from '@/pages/mainpage/SupportPage.tsx';
import NotFoundPage from '@/pages/mainpage/NotFoundPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
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
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;