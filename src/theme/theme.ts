// src/theme/theme.ts
// CatDogEats 프로젝트의 MUI 테마 설정

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    // 메인 컬러 (목표 이미지의 오렌지)
    primary: {
      main: "#e89830",
      light: "#f4b454",
      dark: "#d18720",
      contrastText: "#ffffff",
    },
    // 보조 컬러 (갈색 톤)
    secondary: {
      main: "#97784e",
      light: "#b89668",
      dark: "#7a5f3e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fcfaf8", // 목표 이미지의 배경색
      paper: "#ffffff",
    },
    text: {
      primary: "#1b150e", // 목표 이미지의 진한 텍스트
      secondary: "#97784e", // 목표 이미지의 연한 텍스트
    },
    divider: "#f3eee7", // 목표 이미지의 구분선 색상
  },
  typography: {
    // 폰트 패밀리 설정 (한국어 최적화)
    fontFamily: [
      "Noto Sans KR",
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Plus Jakarta Sans",
      "sans-serif",
    ].join(","),
    // 제목 스타일들 (목표 이미지와 동일)
    h1: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      color: "#1b150e",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5rem", // 24px
      fontWeight: 700,
      color: "#1b150e",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.125rem", // 18px
      fontWeight: 600,
      color: "#1b150e",
      lineHeight: 1.4,
    },
    // 본문 텍스트 스타일들
    body1: {
      fontSize: "1rem", // 16px
      lineHeight: 1.6,
      color: "#1b150e",
    },
    body2: {
      fontSize: "0.875rem", // 14px
      lineHeight: 1.5,
      color: "#97784e",
    },
  },
  shape: {
    borderRadius: 12, // 목표 이미지의 둥근 모서리
  },
  components: {
    // 버튼 스타일 커스터마이징 (목표 이미지와 동일)
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // 대문자 변환 제거
          fontWeight: 700,
          borderRadius: 12,
          fontSize: "1rem",
          padding: "12px 24px",
          minHeight: "48px",
        },
        contained: {
          backgroundColor: "#e89830",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#d18720",
            boxShadow: "0 2px 8px rgba(232, 152, 48, 0.3)",
          },
        },
        outlined: {
          borderColor: "#e89830",
          color: "#e89830",
          "&:hover": {
            backgroundColor: "#e89830",
            color: "#ffffff",
            borderColor: "#e89830",
          },
        },
      },
    },
    // 카드 스타일 커스터마이징
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    // TextField 스타일 (목표 이미지와 동일)
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#f3eee7",
            "& fieldset": {
              borderColor: "#e7ddd0",
            },
            "&:hover fieldset": {
              borderColor: "#e89830",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#e89830",
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});
