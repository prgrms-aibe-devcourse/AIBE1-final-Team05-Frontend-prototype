// src/App.tsx

import React, { useState } from "react";
import Layout from "./components/common/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import MainPage from "./pages/MainPage";

type PageType = "main" | "products" | "admin";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("main");

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "products":
        return (
          <Layout onLogoClick={() => handleNavigate("main")}>
            <ProductsPage />
          </Layout>
        );
      case "admin":
        return (
          <ProductManagementPage onLogoClick={() => handleNavigate("main")} />
        );
      case "main":
      default:
        return <MainPage onNavigate={handleNavigate} />;
    }
  };

  return renderCurrentPage();
};

export default App;
