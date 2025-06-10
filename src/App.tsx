// src/App.tsx

import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import Layout from "./components/common/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductManagementPage from "./pages/ProductManagementPage";

// MUI 테마 설정 (상품 관리 페이지에 맞게 조정)
const theme = createTheme({
  palette: {
    primary: {
      main: "#ef9942", // 오렌지 컬러로 변경
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#a5d6a7", // 연한 초록색
      contrastText: "#1f2937",
    },
    background: {
      default: "#FFFBF5", // 크림색 배경
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2d2a27",
      secondary: "#5c5752",
    },
    divider: "#F5EFEA",
  },
  typography: {
    fontFamily: "'Noto Sans KR', 'Plus Jakarta Sans', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          backgroundColor: "#ef9942",
          "&:hover": {
            backgroundColor: "#e08830",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#f9fafb",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ef9942",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ef9942",
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

type PageType = "products" | "admin";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("products");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "admin":
        return <ProductManagementPage />;
      case "products":
      default:
        return (
          <Layout>
            <ProductsPage />
          </Layout>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        {/* 페이지 전환 버튼 (개발용) */}
        <Box
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            display: "flex",
            gap: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            p: 1,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Button
            size="small"
            variant={currentPage === "products" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("products")}
            sx={{ fontSize: "0.75rem" }}
          >
            상품 페이지
          </Button>
          <Button
            size="small"
            variant={currentPage === "admin" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("admin")}
            sx={{ fontSize: "0.75rem" }}
          >
            관리자 페이지
          </Button>
        </Box>

        {renderCurrentPage()}
      </Box>
    </ThemeProvider>
  );
};

export default App;
