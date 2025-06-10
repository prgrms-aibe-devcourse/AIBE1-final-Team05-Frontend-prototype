// src/App.tsx

import React from "react";
import Layout from "./components/common/Layout";
import ProductsPage from "./pages/ProductsPage";
// import ProductManagementPage from "./pages/ProductManagementPage";

const App: React.FC = () => {
  return (
    <Layout>
      <ProductsPage />
    </Layout>
  );
};

export default App;
