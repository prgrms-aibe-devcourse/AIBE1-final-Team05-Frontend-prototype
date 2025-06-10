// src/pages/SellerDashboardPage/SellerDashboardPage.tsx
// 메인 레이아웃과 상태 관리만 담당

import React, { useState } from "react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Fab,
} from "@mui/material";
import { Notifications, Menu as MenuIcon, Close } from "@mui/icons-material";

// 분리된 컴포넌트들 import
import {
  SidebarContent,
  StatCards,
  SalesChart,
  ProductChart,
  AIForecastPanel,
  ReorderPanel,
} from "./SellerDashboardComponents";

const SellerDashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);

  // 이벤트 핸들러들
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 헤더 */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "#333333",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #F3EADD",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD66xWsaVjx5a2DhhFmO4pR5NafAkznbqCpZhMqQm2DSBTRt7PfTwQnOFI2iRkHeQPZ2iWUx5_Vk7Er_JilLTlNwaDMV5u9xQ3KNW2G9fUX18uB6pQp6qirmr8L1YIRFtqpWFor3g6Y4tnyqiY3iNkSGt_fc2-f-IuitaMh4hjVvaRdzP6ta-5Ex1YUDVSwytKeX5z3viJ5Hsc946MAaLIUY3UlqMK75285A3kbBo0qBTIbs8NHpaQFsRI64KC3mxlmakrCvfYpbDgm"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#E88C30",
                fontSize: "1.125rem",
              }}
            >
              CatDogEats 판매자 대시보드
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* 데스크톱 네비게이션 */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#333333",
                  cursor: "pointer",
                  "&:hover": { color: "#E88C30" },
                }}
              >
                공지사항
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#333333",
                  cursor: "pointer",
                  "&:hover": { color: "#E88C30" },
                }}
              >
                FAQ
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#333333",
                  cursor: "pointer",
                  "&:hover": { color: "#E88C30" },
                }}
              >
                1:1 문의
              </Typography>
            </Box>

            <IconButton
              sx={{
                color: "#E88C30",
                "&:hover": { backgroundColor: "#F3EADD" },
              }}
            >
              <Notifications />
            </IconButton>

            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4i6R6txB3W4iXY5EpJM6uFVfZ_r1WCi5ZBvtf6i1Q5cnPM4q_b4YozRO4DMgBmMUsomTcomuCebUxVM0keBHORGxhS4osRQ637rpvLoIfMcfTdhlk2rbV9MLdO584CTjZ0RNmiTjcL-aPRToTGrGbiaAS-p-QdeWZFbnkX3oA1ltrW1R8gDFvOalrrLeo_NnpVbcILyZ8CCXs2QX9n56Mwi1mW-xdxzWaloSt8c3FYlD5rvfyw0rURH19KQKdwN0rFnjAdoyxksVC"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>

            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem onClick={handleProfileMenuClose}>프로필 수정</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>로그아웃</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 64px)",
          mt: 8,
          backgroundColor: "#FFFBF5",
          width: "100%",
        }}
      >
        {/* 사이드바 */}
        {!isMobile && (
          <Box
            sx={{
              width: 240,
              backgroundColor: "white",
              borderRight: "1px solid #F3EADD",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <SidebarContent isMobile={isMobile} />
          </Box>
        )}

        {/* 메인 콘텐츠 */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFBF5",
            overflow: "hidden",
            px: 3, // 2 → 3으로 증가 (16px → 24px)
            py: 2.5, // 상하 여백도 약간 증가 (16px → 20px)
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#333333",
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.5rem", md: "2rem" },
              flexShrink: 0,
            }}
          >
            대시보드
          </Typography>

          {/* 1행: 통계 카드 영역 */}
          <Box sx={{ flexShrink: 0, mb: 3 }}>
            <StatCards />
          </Box>

          {/* 2행과 3행 컨테이너 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5, // 1.5 → 2.5로 증가 (20px)
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* 2행: 차트 영역 */}
            <Box sx={{ display: "flex", gap: 2.5, flex: 1, minHeight: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                <SalesChart />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                <ProductChart />
              </Box>
            </Box>

            {/* 3행: AI 수요 예측 영역 - 2행과 동일한 1:1 비율 */}
            <Box sx={{ display: "flex", gap: 2.5, flex: 1, minHeight: 0 }}>
              <Box sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                <AIForecastPanel />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
                <ReorderPanel />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 모바일 Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={toggleMobileMenu} sx={{ color: "#E88C30" }}>
            <Close />
          </IconButton>
        </Box>
        <SidebarContent isMobile={isMobile} />
      </Drawer>

      {/* 모바일 메뉴 버튼 */}
      {isMobile && (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#E88C30",
            "&:hover": { backgroundColor: "#d67b28" },
          }}
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </Fab>
      )}
    </Box>
  );
};

export default SellerDashboardPage;
