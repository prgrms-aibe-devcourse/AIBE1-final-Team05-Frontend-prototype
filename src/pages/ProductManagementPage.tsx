// src/pages/ProductManagementPage.tsx

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  EditNote as EditIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Pets as PetsIcon,
} from "@mui/icons-material";
import AdminSidebar from "../components/admin/AdminSidebar";
import ProductRegistrationForm from "../components/admin/ProductRegistrationForm";
import ProductEditDelete from "../components/admin/ProductEditDelete";
import InventoryManagement from "../components/admin/InventoryManagement";
import { ProductFormData } from "../types/ProductManagement";

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
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFBF5" }}>
      {/* 헤더 */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #F5EFEA",
          color: "#2d2a27",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
          {/* 로고 및 제목 */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}
          >
            <PetsIcon sx={{ fontSize: 32, color: "#ef9942" }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#2d2a27",
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              캣독잇츠
            </Typography>
          </Box>

          {/* 데스크톱 네비게이션 */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {["홈", "상품", "회사 소개", "문의하기"].map((item, index) => (
              <Button
                key={item}
                sx={{
                  color: index === 1 ? "#ef9942" : "#5c5752",
                  fontWeight: index === 1 ? 600 : 500,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  "&:hover": {
                    color: "#ef9942",
                    backgroundColor: "transparent",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* 우측 액션 버튼들 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              sx={{
                backgroundColor: "#a5d6a7",
                color: "#1f2937",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 6,
                display: { xs: "none", sm: "flex" },
                "&:hover": {
                  backgroundColor: "#81c784",
                },
              }}
            >
              장바구니
            </Button>

            <Avatar
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #ef9942",
              }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVRyuF0kkl5s0HPHb2jKz1pSgrewYCb3JiiEm8_VuExef6HoBt25mEKA_Ue0icnmSBZZlfgfmY4OL7yySp3LztjTo34wxGFSSY2oc-5aonmDeaKMWmcUSQUHD2lBk5xvJTExl9Oe67V-qEjzcVmuFmpyyv44KrGFfLOV9aMdNwUjv1lXKEpVcPxwQbLwLEzjAJWBq-1VCUC6_Ki56jRAu4bwrMoaw2YTmi7FqBunoboatYVWVe8XAvPtlAnHUXQGzNLaZcTrVdR9yo"
              alt="프로필"
            />

            {isMobile && (
              <IconButton
                onClick={() => setSidebarOpen(!sidebarOpen)}
                sx={{ color: "#5c5752" }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 메인 컨텐츠 영역 */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* 사이드바 */}
        {(!isMobile || sidebarOpen) && (
          <AdminSidebar
            activeItem="products"
            onItemClick={(itemId) => {
              console.log("Navigate to:", itemId);
              if (isMobile) setSidebarOpen(false);
            }}
          />
        )}

        {/* 메인 컨텐츠 */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Container
            maxWidth={false}
            sx={{
              flex: 1,
              py: 4,
              px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 8 },
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
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
              <Typography
                variant="body1"
                sx={{ color: "#5c5752", fontSize: "1rem" }}
              >
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
          </Container>

          {/* 푸터 */}
          <Box
            component="footer"
            sx={{
              py: 4,
              px: 4,
              textAlign: "center",
              borderTop: "1px solid #F5EFEA",
              backgroundColor: "white",
              mt: "auto",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#8d837a", fontSize: "0.875rem" }}
            >
              © 2024 캣독잇츠. 모든 권리 보유. 행복한 반려동물을 위해 정성껏
              만들었습니다.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductManagementPage;
