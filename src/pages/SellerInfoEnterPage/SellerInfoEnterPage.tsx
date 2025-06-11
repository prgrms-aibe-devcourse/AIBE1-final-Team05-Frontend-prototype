// src/pages/SellerInfoEnterPage/SellerInfoEnterPage.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  TextField,
  Alert,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Stack,
  Card,
  CardContent,
  Rating,
  CircularProgress,
} from "@mui/material";
import {
  Info as InfoIcon,
  Storefront as StorefrontIcon,
  Schedule as ScheduleIcon,
  Security as SecurityIcon,
  Image as ImageIcon,
  Campaign as CampaignIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  ShoppingBag as ShoppingBagIcon,
  Edit as EditIcon,
  Pets as PetsIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  ProfilePreviewCard,
  CompletionCard,
  BRAND_COLOR,
} from "./SellerInfoEnterComponents";

// 브랜드 컬러 상수
const BRAND_COLOR_HOVER = "#c86a0e";

// 스타일드 컴포넌트들
const StyledAppBar = styled(AppBar)({
  backgroundColor: "white",
  color: "#1a1a1a",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderBottom: "1px solid #e5e7eb",
});

const LogoIcon = styled(Box)({
  width: 24,
  height: 24,
  color: BRAND_COLOR,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PrimaryButton = styled(Button)({
  backgroundColor: BRAND_COLOR,
  color: "white",
  borderRadius: "9999px",
  textTransform: "none",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: BRAND_COLOR_HOVER,
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#f7f5f2",
  color: "#372f29",
  borderRadius: "9999px",
  textTransform: "none",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#edeae6",
  },
});

const SidebarListItem = styled(ListItemButton)<{ active?: boolean }>(
  ({ active }) => ({
    borderRadius: 8,
    margin: "4px 0",
    padding: "12px 16px",
    backgroundColor: active ? BRAND_COLOR : "transparent",
    color: active ? "white" : "#374151",
    "&:hover": {
      backgroundColor: active ? BRAND_COLOR_HOVER : "#f3f4f6",
    },
    "& .MuiListItemIcon-root": {
      color: active ? "white" : "#6b7280",
      minWidth: "40px",
    },
    "& .MuiListItemText-primary": {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  })
);

// 네비게이션 메뉴 데이터
const navigationItems = [
  { id: "basic-info", label: "기본 정보", icon: InfoIcon, active: true },
  { id: "workshop-intro", label: "워크샵 소개", icon: StorefrontIcon },
  { id: "operation-info", label: "운영 정보", icon: ScheduleIcon },
  { id: "certification", label: "인증 정보", icon: SecurityIcon },
  { id: "workshop-images", label: "워크샵 이미지", icon: ImageIcon },
  { id: "notice-management", label: "공지 관리", icon: CampaignIcon },
  { id: "account-settings", label: "계정 설정", icon: SettingsIcon },
];

// 메인 컴포넌트
const SellerInfoEnter: React.FC = () => {
  const [activeSection, setActiveSection] = useState("basic-info");
  const [workshopName, setWorkshopName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // 화면 크기 추적
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 크기별 스타일 계산 (사용하지 않음 - 제거)

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSave = () => {
    console.log("저장하기:", {
      workshopName,
      representativeName,
      businessNumber,
      businessAddress,
    });
  };

  const handleCancel = () => {
    setWorkshopName("");
    setRepresentativeName("");
    setBusinessNumber("");
    setBusinessAddress("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#fafaf9",
      }}
    >
      {/* 헤더 - 반응형 수정 */}
      <StyledAppBar position="static">
        <Toolbar
          sx={{ px: { xs: 1, sm: 4 }, py: 1, minHeight: "64px !important" }}
        >
          {/* 로고 영역 - 축소 가능하도록 설정 */}
          <Box
            display="flex"
            alignItems="center"
            gap={{ xs: 1, sm: 2 }}
            sx={{ minWidth: 0, flexShrink: 1 }}
          >
            <LogoIcon>
              <PetsIcon />
            </LogoIcon>
            <Typography
              variant="h6"
              component="h1"
              fontWeight="bold"
              color="#1f2937"
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              CatDogEats
              <Typography
                component="span"
                fontWeight="medium"
                color="#6b7280"
                ml={1}
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                판매자 센터
              </Typography>
            </Typography>
          </Box>

          <Box flexGrow={1} />

          {/* 네비게이션 - 중간 크기 화면에서도 표시 */}
          <Box
            display={{ xs: "none", md: "flex" }}
            alignItems="center"
            gap={1}
            mr={1}
            sx={{ flexShrink: 1 }}
          >
            {["홈", "상품 전체", "강아지", "고양이"].map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#374151",
                  textTransform: "none",
                  fontSize: { md: "0.75rem", lg: "0.875rem" },
                  fontWeight: 500,
                  minWidth: "auto",
                  px: { md: 1, lg: 1.5 },
                  py: 0.5,
                  "&:hover": {
                    color: BRAND_COLOR,
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* 우측 아이콘들 - 작은 화면에서 일부 숨김 */}
          <Box
            display="flex"
            alignItems="center"
            gap={{ xs: 0.5, sm: 1 }}
            sx={{ flexShrink: 0 }}
          >
            <IconButton
              size="small"
              sx={{
                bgcolor: "#f3f4f6",
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                "&:hover": { bgcolor: "#e5e7eb" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                bgcolor: "#f3f4f6",
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                "&:hover": { bgcolor: "#e5e7eb" },
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ShoppingBagIcon fontSize="small" />
            </IconButton>
            <Avatar
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                border: "1px solid #e5e7eb",
              }}
              src="/api/placeholder/40/40"
            />
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* 메인 콘텐츠 - 패딩 최적화 */}
      <Container
        maxWidth="xl"
        sx={{ flex: 1, py: 3, px: { xs: 1, sm: 2, md: 3 } }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* 사이드바 - 비율 조정 */}
          <Grid item xs={12} md={3} lg={2.5}>
            <Paper
              sx={{
                minHeight: 700,
                p: 2,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
              }}
            >
              <List sx={{ p: 0 }}>
                {navigationItems.map((item) => (
                  <SidebarListItem
                    key={item.id}
                    active={activeSection === item.id}
                    onClick={() => handleSectionChange(item.id)}
                  >
                    <ListItemIcon>
                      <item.icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </SidebarListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* 메인 콘텐츠 영역 - 비율 조정 */}
          <Grid item xs={12} md={9} lg={9.5}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 2,
                border: "1px solid #e5e7eb",
              }}
            >
              {/* 페이지 헤더 - 깔끔하고 안정적인 디자인 */}
              <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: "56px",
                  width: "100%",
                  flexWrap: "nowrap",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#1f2937"
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: "0 1 auto",
                  }}
                >
                  내 페이지
                </Typography>
                <PrimaryButton
                  startIcon={<EditIcon />}
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    px: { xs: 2, sm: 3 },
                    py: 1,
                    minWidth: "160px",
                    height: "44px",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  고객화면에서 보기
                </PrimaryButton>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* 프로필 미리보기 & 완성도 - 수정된 버전 */}
              <Grid container spacing={3} mb={4}>
                <Grid item xs={12} md={8}>
                  <Card
                    sx={{
                      backgroundColor: "#fafaf9",
                      border: "1px solid #e5e7eb",
                      borderRadius: 3,
                      overflow: "hidden", // 추가
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#1f2937"
                        mb={1}
                      >
                        워크샵 프로필 미리보기
                      </Typography>
                      <Typography variant="body2" color="#6b7280" mb={3}>
                        현재 워크샵 프로필 요약과 고객에게 표시될 내용을
                        간략하게 확인해보세요.
                      </Typography>

                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{ width: 96, height: 96, borderRadius: 2 }}
                          src="/api/placeholder/96/96"
                        />
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="h6"
                            fontWeight="semibold"
                            color="#1f2937"
                          >
                            달콤한 우리집 간식공방
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Rating
                              value={4.5}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body2" color="#6b7280" ml={1}>
                              (4.5/5.0)
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      backgroundColor: "#fafaf9",
                      border: "1px solid #e5e7eb",
                      borderRadius: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden", // 추가
                    }}
                  >
                    <CardContent
                      sx={{ textAlign: "center", p: 3, width: "100%" }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="medium"
                        color="#1f2937"
                        mb={2}
                      >
                        프로필 완성도
                      </Typography>
                      <Box position="relative" display="inline-flex" mb={2}>
                        <CircularProgress
                          variant="determinate"
                          value={100}
                          size={128}
                          thickness={3}
                          sx={{ color: "#e5e7eb" }}
                        />
                        <CircularProgress
                          variant="determinate"
                          value={75}
                          size={128}
                          thickness={3}
                          sx={{
                            color: BRAND_COLOR,
                            position: "absolute",
                            left: 0,
                            "& .MuiCircularProgress-circle": {
                              strokeLinecap: "round",
                            },
                          }}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            component="div"
                            color={BRAND_COLOR}
                            fontWeight="bold"
                          >
                            75%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" color="#6b7280">
                        완성도를 높여 더 많은 고객을 만나세요!
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* 경고 알림 */}
              <Alert
                icon={<EditIcon sx={{ color: BRAND_COLOR }} />}
                action={
                  <SecondaryButton size="small">소개 작성하기</SecondaryButton>
                }
                sx={{
                  mb: 4,
                  backgroundColor: "#fefce8",
                  border: "1px solid #fde047",
                  borderRadius: 2,
                  "& .MuiAlert-icon": {
                    color: BRAND_COLOR,
                  },
                }}
              >
                <Typography fontWeight="medium">
                  워크샵 소개를 작성하여 프로필을 완성하세요!
                </Typography>
                <Typography variant="body2" color="#6b7280">
                  매력적인 소개글은 고객의 관심을 끌고 신뢰를 높입니다.
                </Typography>
              </Alert>

              {/* 기본 정보 설정 폼 */}
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="semibold"
                  color="#1f2937"
                  mb={3}
                >
                  기본 정보 설정
                </Typography>

                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="#374151"
                      mb={1}
                    >
                      워크샵 이름{" "}
                      <Typography component="span" color="error">
                        *
                      </Typography>
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="예: 냥멍이네 수제간식 공방"
                      value={workshopName}
                      onChange={(e) => setWorkshopName(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: BRAND_COLOR,
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="#374151"
                      mb={1}
                    >
                      대표자명
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="홍길동"
                      value={representativeName}
                      onChange={(e) => setRepresentativeName(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: BRAND_COLOR,
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="#374151"
                      mb={1}
                    >
                      사업자 등록번호
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="nowrap">
                      <TextField
                        fullWidth
                        placeholder="123-45-67890"
                        value={businessNumber}
                        onChange={(e) => setBusinessNumber(e.target.value)}
                        sx={{
                          flexShrink: 1,
                          minWidth: 0,
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: BRAND_COLOR,
                            },
                          },
                        }}
                      />
                      <SecondaryButton
                        sx={{
                          minWidth: { xs: 80, sm: 120 },
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          px: { xs: 1, sm: 2 },
                        }}
                      >
                        인증요청
                      </SecondaryButton>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="#374151"
                      mb={1}
                    >
                      사업자 주소
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="서울특별시 강남구 테헤란로 123"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: BRAND_COLOR,
                          },
                        },
                      }}
                    />
                  </Box>
                </Stack>

                {/* 폼 액션 버튼들 */}
                <Box pt={4} borderTop="1px solid #e5e7eb" mt={4}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    gap={2}
                    flexWrap="wrap"
                  >
                    <SecondaryButton
                      onClick={handleCancel}
                      sx={{
                        minWidth: { xs: 100, sm: 120 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      변경 취소
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={handleSave}
                      sx={{
                        minWidth: { xs: 100, sm: 120 },
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      저장하기
                    </PrimaryButton>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SellerInfoEnter;
