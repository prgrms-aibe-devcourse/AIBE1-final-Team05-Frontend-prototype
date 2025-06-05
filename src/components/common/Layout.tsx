// src/components/common/Layout.tsx

import React from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";

// MUI v7 테마 설정
const theme = createTheme({
  palette: {
    primary: {
      main: "#E92933",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFB800",
    },
    background: {
      default: "#F9F6F4",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#383838",
      secondary: "#5A5A5A",
    },
    divider: "#E5D9D5",
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Noto Sans', sans-serif",
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
    // MUI v7 컴포넌트 커스터마이징
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
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

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;

// src/App.tsx

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
