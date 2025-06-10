// src/App.tsx
// 앱의 최상위 컴포넌트 (테마 적용 + 라우팅)

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellerDashboardPage from "./pages/SellerDashboardPage";
import SellerInfoEnterPage from "./pages/SellerInfoEnterPage";
// import PetTreatsCheckout from "./pages/PetTreatsCheckout";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* MUI 기본 스타일 초기화 */}
      <Routes>
        {/* 상품 상세 페이지 */}
        <Route path="/product-detail" element={<ProductDetailPage />} />

        {/* 판매자 대시보드 페이지 */}
        <Route path="/seller-dashboard" element={<SellerDashboardPage />} />

        {/* 판매자 정보 기입 페이지 */}
        <Route path="/seller-infoenter" element={<SellerInfoEnterPage />} />

        {/* 결제 페이지 */}
        {/* <Route path="/payment" element={<PetTreatsCheckout />} /> */}

        {/* 기본 경로 - 임시로 상품 상세 페이지 표시 */}
        <Route path="/" element={<ProductDetailPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
