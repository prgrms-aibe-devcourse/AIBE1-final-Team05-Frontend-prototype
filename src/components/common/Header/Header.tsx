// src/components/common/Header/Header.tsx
// 전체 페이지 상단의 헤더 컴포넌트 (로고, 네비게이션, 검색, 장바구니 등)

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputAdornment,
  TextField,
  IconButton,
  Link,
} from "@mui/material";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingCartOutlined,
  AccountCircle,
} from "@mui/icons-material";

const Header: React.FC = () => {
  // 네비게이션 메뉴 아이템들 (목표 이미지와 동일)
  const navItems = [
    { label: "새로운 간식", href: "#" },
    { label: "인기 상품", href: "#" },
    { label: "카테고리", href: "#" },
    { label: "회사 소개", href: "#" },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3eee7",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar
        sx={{
          py: 1,
          px: { xs: 2, sm: 3, lg: 5 },
          justifyContent: "space-between",
          minHeight: "64px",
        }}
      >
        {/* Logo - 목표 이미지와 동일 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: "#e89830",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                🐱
              </Typography>
            </Box>
            <Typography
              variant="h3"
              component="div"
              sx={{
                fontWeight: 700,
                color: "#1b150e",
                fontSize: "20px",
              }}
            >
              CatDogEats
            </Typography>
          </Box>

          {/* Navigation - 목표 이미지와 동일한 간격 */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                underline="none"
                sx={{
                  color: "#1b150e",
                  fontWeight: 500,
                  fontSize: "16px",
                  "&:hover": {
                    color: "#e89830",
                  },
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Search and Actions - 목표 이미지와 동일 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="검색"
            size="small"
            sx={{
              width: { xs: 160, sm: 240 },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#f3eee7",
                borderRadius: 3,
                height: "44px",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: "#e8c69b",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "16px",
                color: "#1b150e",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#97784e", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="medium"
              sx={{
                color: "#1b150e",
                backgroundColor: "#f3eee7",
                width: 44,
                height: 44,
                "&:hover": {
                  backgroundColor: "#e8c69b",
                },
              }}
            >
              <FavoriteBorder fontSize="small" />
            </IconButton>

            <IconButton
              size="medium"
              sx={{
                color: "#1b150e",
                backgroundColor: "#f3eee7",
                width: 44,
                height: 44,
                "&:hover": {
                  backgroundColor: "#e8c69b",
                },
              }}
            >
              <ShoppingCartOutlined fontSize="small" />
            </IconButton>

            <IconButton
              size="medium"
              sx={{
                color: "#1b150e",
                width: 44,
                height: 44,
              }}
            >
              <AccountCircle fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
