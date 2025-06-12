// src/routes/Router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BuyerLayout from "@/components/layout/buyerLayout/BuyerLayout.tsx";
import SellerLayout from "@/components/layout/sellerLayout/SellerLayout.tsx";
import HomePage from "@/pages/mainpage/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import RoleSelectionPage from "@/pages/auth/RoleSelectionPage";
import NotFoundPage from "@/pages/common/NotFoundPage.tsx";
import SellerStorePage from "@/pages/SellerDashboardPage/SellerStorePage.tsx";
import OrderCheckoutPage from "@/pages/OrderCheckoutPage.tsx";
import MyPage from "@/pages/Account/Account.tsx";
import ProductListPage from "@/pages/ProductListPage.tsx";
import ProductManagementPage from "@/pages/SellerDashboardPage/ProductManagementPage.tsx";
import ProductDetailPage from "@/pages/ProductDetailPage";
import SellerInfoPage from "@/components/SellerDashboard/SellerInfo";
import { SettlementPage } from "@/components/SellerDashboard/settlement";
import SellerDashboardDashboardPage from "@/components/SellerDashboard/Dashboard";
import CustomerManagementPage from "@/pages/SellerDashboardPage/CustomerManagementPage.tsx";
import OrdersManagementPage from "@/pages/SellerDashboardPage/OrderManagementPage.tsx";
import ShoppingCartPage from "@/pages/ShoppingCartPage";



// React Router 7 사용
const router = createBrowserRouter([
    {
        path: "/",
        element: <BuyerLayout />, // 구매자용 레이아웃 (BuyerHeader + Outlet + BuyerFooter)
        children: [
            // 메인페이지
            { index: true, element: <HomePage /> },



            { path: "productsList", element: <ProductListPage /> }, // 상품 목록 페이지

            // 상품 상세 페이지
            { path: 'product-detail', element: <ProductDetailPage /> },

            //주문 결제 페이지
            { path: 'checkout', element: <OrderCheckoutPage /> },

            // 마이페이지
            { path: 'account', element: <MyPage /> },

            // 장바구니
            { path: "cart", element: <ShoppingCartPage /> },



            // 판매자 스토어 페이지 (구매자가 보는 판매자 정보)
            { path: 'seller/:sellerId', element: <SellerStorePage /> },

            // 로그인 & 역할선택
            { path: 'login', element: <LoginPage /> },
            { path: 'role-selection', element: <RoleSelectionPage /> },

            // 결제 및 계정 관련 페이지
            { path: "payment", element: <OrderCheckoutPage /> },
            { path: "mypage", element: <MyPage /> },

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
                element: <OrdersManagementPage />  //todo 주문배송 페이지 탭
            },
            {
                path: "settlement",
                element: <SettlementPage /> // 정산탭
            },
            {
                path: "customers",
                element: <CustomerManagementPage />  //todo 고객관리 페이지 탭
            },
            {
                path: "info",
                element: <SellerInfoPage /> //todo 판매자 정보 페이지 탭
            },
        ],
    },

]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;