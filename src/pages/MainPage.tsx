// src/pages/MainPage.tsx

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  Pets as PetsIcon,
  Storefront as StorefrontIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

interface MainPageProps {
  onNavigate: (page: "products" | "admin") => void;
}

const MainPage: React.FC<MainPageProps> = ({ onNavigate }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFFBF5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* 로고 및 메인 타이틀 */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            <PetsIcon sx={{ fontSize: 64, color: "#ef9942", mr: 2 }} />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: "#2d2a27",
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              캣독잇츠
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#5c5752",
              mb: 2,
              fontWeight: 400,
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            반려동물을 위한 건강한 간식 쇼핑몰
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#8d837a",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            수제품부터 완제품까지, 반려동물의 건강을 생각하는 엄선된 간식들을
            만나보세요. 상품 관리부터 재고 관리까지 모든 것을 한 곳에서 편리하게
            관리할 수 있습니다.
          </Typography>
        </Box>

        {/* 페이지 이동 카드들 */}
        <Grid container spacing={4} justifyContent="center">
          {/* 상품 페이지 카드 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.16)",
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    mb: 3,
                  }}
                >
                  <StorefrontIcon sx={{ fontSize: 48 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#2d2a27",
                    mb: 2,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  상품 쇼핑
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#5c5752",
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  다양한 반려동물 간식을 둘러보고 필터링하여 원하는 상품을
                  찾아보세요. 상품 상세 정보와 리뷰를 확인할 수 있습니다.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {["상품 목록", "필터링", "검색", "찜하기"].map((feature) => (
                    <Paper
                      key={feature}
                      sx={{
                        px: 2,
                        py: 0.5,
                        backgroundColor: "#f9fafb",
                        borderRadius: 2,
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "#6b7280", fontWeight: 500 }}
                      >
                        {feature}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => onNavigate("products")}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  상품 페이지로 이동
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* 관리자 페이지 카드 */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.16)",
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "#fdecdb",
                    color: "#ef9942",
                    mb: 3,
                  }}
                >
                  <AdminIcon sx={{ fontSize: 48 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#2d2a27",
                    mb: 2,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  관리자 페이지
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#5c5752",
                    mb: 3,
                    lineHeight: 1.6,
                  }}
                >
                  상품 등록, 수정, 삭제 및 재고 관리를 할 수 있는 관리자 전용
                  페이지입니다. 편리한 대시보드로 모든 것을 관리하세요.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {["상품 등록", "재고 관리", "상품 수정", "통계"].map(
                    (feature) => (
                      <Paper
                        key={feature}
                        sx={{
                          px: 2,
                          py: 0.5,
                          backgroundColor: "#fff7f5",
                          borderRadius: 2,
                          border: "1px solid #fdecdb",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: "#ef9942", fontWeight: 500 }}
                        >
                          {feature}
                        </Typography>
                      </Paper>
                    )
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => onNavigate("admin")}
                  sx={{
                    backgroundColor: "#ef9942",
                    color: "white",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#e08830",
                    },
                  }}
                >
                  관리자 페이지로 이동
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* 푸터 */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#8d837a",
              fontSize: "0.875rem",
            }}
          >
            © 2024 캣독잇츠. 모든 권리 보유. 행복한 반려동물을 위해 정성껏
            만들었습니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MainPage;
