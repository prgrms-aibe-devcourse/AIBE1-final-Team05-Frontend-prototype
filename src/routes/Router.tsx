// src/routes/Router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SellerLayout from "@/components/layout/sellerLayout/SellerLayout.tsx";
import HomePage from "@/pages/mainpage/HomePage";
import CategoriesPage from "@/pages/mainpage/CategoriesPage";
import WorkshopsPage from "@/pages/mainpage/WorkshopsPage";
import SupportPage from "@/pages/mainpage/SupportPage";
import LoginPage from "@/pages/auth/LoginPage";
import RoleSelectionPage from "@/pages/auth/RoleSelectionPage";
import NotFoundPage from "@/pages/mainpage/NotFoundPage";
import SellerInfoPage from "@/pages/SellerInfoPage";
import PetTreatsCheckout from "@/pages/pet-treats-checkout";
import MyPage from "@/pages/account";
import ProductsPage from "@/pages/ProductsPage";
import ProductManagementPage from "@/pages/ProductManagementPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SellerInfoEnterPage from "@/pages/SellerInfoEnterPage";
import { SettlementTab } from "@/domains/settlement";
import SellerDashboardDashboardPage from "@/pages/SellerDashboardPage";
import CustomerManagementPage from "@/pages/seller/CustomerManagementPage.tsx";



// React Router 7 사용
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // 구매자용 레이아웃 (Header + Outlet + Footer)
        children: [
            // 메인페이지
            { index: true, element: <HomePage /> },
            { path: "categories", element: <CategoriesPage /> },
            { path: "workshops", element: <WorkshopsPage /> },
            { path: "support", element: <SupportPage /> },

            { path: "productsList", element: <ProductsPage /> }, // 상품 목록 페이지

            // 상품 상세 페이지
            { path: 'product-detail', element: <ProductDetailPage /> },

            // 판매자 상세 페이지 (구매자가 보는 판매자 정보)
            { path: 'seller/:sellerId', element: <SellerInfoPage /> },

            // 로그인 & 역할선택
            { path: 'login', element: <LoginPage /> },
            { path: 'role-selection', element: <RoleSelectionPage /> },

            // 결제 및 계정 관련 페이지
            { path: "payment", element: <PetTreatsCheckout /> },
            { path: "account", element: <MyPage /> },

            // 404 페이지
            { path: "*", element: <NotFoundPage /> },
        ],
    },
    {
        path: "/seller",
        element: <SellerLayout />, // 판매자용 레이아웃 (SellerHeader + Sidebar + Outlet)
        children: [
            {
                path: "/seller",
                element: <SellerDashboardDashboardPage /> //todo 대시보드페이지 탭
            },
            {
                path: "products",
                element: <ProductManagementPage /> // todo 상품관리 탭
            },
            {
                path: "orders",
                element: <ProductManagementPage />  //todo 주문배송 페이지 탭
            },
            {
                path: "settlement",
                element: <SettlementTab /> // 정산탭
            },
            {
                path: "customers",
                element: <CustomerManagementPage />  //todo 고객관리 페이지 탭
            },
            {
                path: "info",
                element: <SellerInfoEnterPage /> //todo 판매자 정보 페이지 탭
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;