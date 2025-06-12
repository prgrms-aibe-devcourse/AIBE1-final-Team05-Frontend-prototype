// src/pages/SellerDashboardPage/OrdersManagementPage.tsx

import React from "react";
import { Box } from "@mui/material";
import { OrderShippingManagement } from "@/components/OrderManagement";

const OrdersManagementPage: React.FC = () => {
  return (
    <Box>
      <OrderShippingManagement />
    </Box>
  );
};

export default OrdersManagementPage;
