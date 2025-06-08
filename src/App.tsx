import React from "react";
import Layout from "./components/common/Layout";
import ProductsPage from "./pages/ProductsPage";

const App: React.FC = () => {
  return (
    <Layout>
      <ProductsPage />
    </Layout>
  );
};

export default App;
