// src/components/common/Header.tsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  Button,
  Paper,
  alpha,
  useTheme,
} from "@mui/material";
import {
  Pets as PetsIcon,
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingBag as ShoppingBagIcon,
} from "@mui/icons-material";

const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const theme = useTheme();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 5 }, py: 2 }}>
        {/* 로고 및 네비게이션 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
          {/* 로고 */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <PetsIcon sx={{ fontSize: 32, color: "#E92933" }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#E92933",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              펫스낵스
            </Typography>
          </Box>

          {/* 데스크톱 네비게이션 */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {["신상품", "베스트셀러", "간식", "영양제", "선물"].map(
              (item, index) => (
                <Button
                  key={item}
                  sx={{
                    color: index === 2 ? "#E92933" : "#5A5A5A",
                    fontWeight: index === 2 ? 600 : 500,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    "&:hover": {
                      color: "#E92933",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item}
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* 검색 및 액션 버튼들 */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* 검색바 */}
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: 200, md: 240 },
              height: 40,
              backgroundColor: "#F3ECE8",
              border: "none",
              borderRadius: "20px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: alpha("#F3ECE8", 0.8),
              },
            }}
          >
            <IconButton sx={{ p: "8px", color: "#987D73" }} aria-label="search">
              <SearchIcon fontSize="small" />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "0.875rem",
                "& .MuiInputBase-input::placeholder": {
                  color: "#987D73",
                  opacity: 1,
                },
              }}
              placeholder="간식 검색..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Paper>

          {/* 액션 버튼들 */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{
                backgroundColor: "#F3ECE8",
                color: "#5A5A5A",
                width: 40,
                height: 40,
                "&:hover": {
                  backgroundColor: "#E5D9D5",
                },
              }}
              aria-label="찜목록"
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>

            <IconButton
              sx={{
                backgroundColor: "#F3ECE8",
                color: "#5A5A5A",
                width: 40,
                height: 40,
                "&:hover": {
                  backgroundColor: "#E5D9D5",
                },
              }}
              aria-label="장바구니"
            >
              <Badge
                badgeContent={2}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#E92933",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    minWidth: 16,
                    height: 16,
                    top: 4,
                    right: 6,
                  },
                }}
              >
                <ShoppingBagIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Box>

          {/* 프로필 아바타 */}
          <Avatar
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #E92933",
            }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB35iYxbNqCP5KIZP5n2FxiHgwUewzYqL62PJhRM_DW4I0ke-FaSJ_RmnkwnWVNs7uv63O8W7FQcK4kWwE8iRPnchgt8J9qA_JUSDjg8j699gj8yAwgGMUKzN_f0Tg_i4hWgnoixA-AN52sXcffAZP3s8eVXpORsr6k5CNmB6gUP3Vu0Z8IE1s6dRnNQoBKbyTqn3OwO07dAffmthXQmLkyOXlTbdbVYOKgzEqF4PisE2zLwBuDEZq9qZVYH2ct96__o7VZhGvqkDlm"
            alt="프로필"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
