import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/mainpage/HomePage";
import CategoriesPage from "@/pages/mainpage/CategoriesPage";
import WorkshopsPage from "@/pages/mainpage/WorkshopsPage";
import SupportPage from "@/pages/mainpage/SupportPage";
import LoginPage from "@/pages/auth/LoginPage";
import RoleSelectionPage from "@/pages/auth/RoleSelectionPage";
import NotFoundPage from "@/pages/mainpage/NotFoundPage.tsx";
import SellerInfoPage from "@/pages/SellerInfoPage";
import SellerDashboardPage from "@/pages/seller/SellerDashboardPage";
import PetTreatsCheckout from "@/pages/pet-treats-checkout";
import MyPage from "@/pages/account";
import ProductsPage from "@/pages/ProductsPage";
import ProductManagementPage from "@/pages/ProductManagementPage";

// React Router 7 사용
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Header + Outlet + Footer
    children: [
      // 메인페이지
      { index: true, element: <HomePage /> },
      { path: "categories", element: <CategoriesPage /> },
      { path: "workshops", element: <WorkshopsPage /> },
      { path: "support", element: <SupportPage /> },

      { path: "productsList", element: <ProductsPage /> }, // 상품 목록 페이지

      // 판매자 상세 페이지 추가
      { path: "seller/:sellerId", element: <SellerInfoPage /> },
      // 로그인 & 역할선택
      { path: "login", element: <LoginPage /> },
      { path: "role-selection", element: <RoleSelectionPage /> },

      // 결제 및 계정 관련 페이지
      { path: "payment", element: <PetTreatsCheckout /> },
      { path: "account", element: <MyPage /> },

      // 404 페이지
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // 판매자 대시보드 (별도 레이아웃)
  {
    path: "/seller-dashboard",
    element: <SellerDashboardPage />,
  },
  // 관리자 페이지 (별도 레이아웃)
  {
    path: "/seller-pdManagement",
    element: <ProductManagementPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
