// src/pages/SellerDashboardPage/ProductManagementPage.tsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  EditNote as EditIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";
import {
  ProductRegistrationForm,
  ProductEditDelete,
  InventoryManagement,
  ProductFormData,
} from "@/components/ProductManagement";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const ProductManagementPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProductSubmit = (data: ProductFormData) => {
    console.log("상품 등록 데이터:", data);
    // 실제 구현에서는 API 호출
  };

  const tabsData = [
    {
      label: "상품 등록",
      icon: <AddIcon />,
      component: <ProductRegistrationForm onSubmit={handleProductSubmit} />,
    },
    {
      label: "상품 수정/삭제",
      icon: <EditIcon />,
      component: <ProductEditDelete />,
    },
    {
      label: "재고 관리",
      icon: <InventoryIcon />,
      component: <InventoryManagement />,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* 페이지 제목 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#2d2a27",
            fontFamily: "'Noto Sans KR', sans-serif",
            mb: 1,
          }}
        >
          상품 관리
        </Typography>
        <Typography variant="body1" sx={{ color: "#5c5752", fontSize: "1rem" }}>
          상품 등록, 수정, 재고 관리를 한 곳에서 편리하게 관리하세요.
        </Typography>
      </Box>

      {/* 탭 네비게이션 */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#F5EFEA",
            backgroundColor: "#f9fafb",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              px: 2,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#8d837a",
                minHeight: 72,
                gap: 1,
                "&.Mui-selected": {
                  color: "#ef9942",
                },
                "&:hover": {
                  color: "#ef9942",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ef9942",
                height: 3,
                borderRadius: 1.5,
              },
            }}
          >
            {tabsData.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{
                  "& .MuiTab-iconWrapper": {
                    color: "inherit",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* 탭 컨텐츠 */}
        {tabsData.map((tab, index) => (
          <TabPanel key={index} value={tabValue} index={index}>
            <Box sx={{ backgroundColor: "white" }}>{tab.component}</Box>
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default ProductManagementPage;
