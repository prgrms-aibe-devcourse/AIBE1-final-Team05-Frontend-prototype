// src/pages/SellerInfoEnterPage.tsx

import React, { useState } from "react";
import {
    Box,
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
    Edit as EditIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// 브랜드 컬러 상수
const BRAND_COLOR = "#ef9942";
const BRAND_COLOR_HOVER = "#e08830";

// 스타일드 컴포넌트들
const PrimaryButton = styled(Button)({
    backgroundColor: BRAND_COLOR,
    color: "white",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: BRAND_COLOR_HOVER,
    },
});

const SecondaryButton = styled(Button)({
    backgroundColor: "#f7f5f2",
    color: "#372f29",
    borderRadius: "8px",
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
const SellerInfoPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState("basic-info");
    const [workshopName, setWorkshopName] = useState("");
    const [representativeName, setRepresentativeName] = useState("");
    const [businessNumber, setBusinessNumber] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");

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
                    판매자 정보 관리
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ color: "#5c5752", fontSize: "1rem" }}
                >
                    워크샵 정보를 관리하고 고객에게 보여질 프로필을 설정하세요.
                </Typography>
            </Box>

            <Grid container spacing={{ xs: 2, sm: 3 }}>
                {/* 사이드바 */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper
                        sx={{
                            minHeight: 500,
                            p: 2,
                            borderRadius: 3,
                            border: "1px solid #F5EFEA",
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

                {/* 메인 콘텐츠 영역 */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Paper
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            borderRadius: 3,
                            border: "1px solid #F5EFEA",
                        }}
                    >
                        {/* 페이지 헤더 */}
                        <Box
                            sx={{
                                mb: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                color="#2d2a27"
                                sx={{
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                }}
                            >
                                내 페이지
                            </Typography>
                            <PrimaryButton
                                startIcon={<EditIcon />}
                                sx={{
                                    fontSize: { xs: "0.875rem", sm: "1rem" },
                                    px: { xs: 2, sm: 3 },
                                    py: 1.5,
                                }}
                            >
                                고객화면에서 보기
                            </PrimaryButton>
                        </Box>

                        <Divider sx={{ mb: 4, borderColor: "#F5EFEA" }} />

                        {/* 프로필 미리보기 & 완성도 */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Card
                                    sx={{
                                        backgroundColor: "#fafaf9",
                                        border: "1px solid #F5EFEA",
                                        borderRadius: 3,
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="#2d2a27"
                                            mb={1}
                                        >
                                            워크샵 프로필 미리보기
                                        </Typography>
                                        <Typography variant="body2" color="#5c5752" mb={3}>
                                            현재 워크샵 프로필 요약과 고객에게 표시될 내용을
                                            간략하게 확인해보세요.
                                        </Typography>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar
                                                sx={{
                                                    width: 96,
                                                    height: 96,
                                                    borderRadius: 2,
                                                    backgroundColor: BRAND_COLOR,
                                                    fontSize: '2rem'
                                                }}
                                            >
                                                🐾
                                            </Avatar>
                                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="600"
                                                    color="#2d2a27"
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
                                                    <Typography variant="body2" color="#5c5752" ml={1}>
                                                        (4.5/5.0)
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <Card
                                    sx={{
                                        backgroundColor: "#fafaf9",
                                        border: "1px solid #F5EFEA",
                                        borderRadius: 3,
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CardContent
                                        sx={{ textAlign: "center", p: 3, width: "100%" }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="600"
                                            color="#2d2a27"
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
                                                sx={{ color: "#F5EFEA" }}
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
                                        <Typography variant="caption" color="#5c5752">
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
                            <Typography fontWeight="500">
                                워크샵 소개를 작성하여 프로필을 완성하세요!
                            </Typography>
                            <Typography variant="body2" color="#5c5752">
                                매력적인 소개글은 고객의 관심을 끌고 신뢰를 높입니다.
                            </Typography>
                        </Alert>

                        {/* 기본 정보 설정 폼 */}
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color="#2d2a27"
                                mb={3}
                            >
                                기본 정보 설정
                            </Typography>

                            <Stack spacing={3}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        fontWeight="500"
                                        color="#2d2a27"
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
                                                backgroundColor: "#fafafa",
                                                borderRadius: 2,
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
                                        fontWeight="500"
                                        color="#2d2a27"
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
                                                backgroundColor: "#fafafa",
                                                borderRadius: 2,
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
                                        fontWeight="500"
                                        color="#2d2a27"
                                        mb={1}
                                    >
                                        사업자 등록번호
                                    </Typography>
                                    <Box display="flex" gap={1}>
                                        <TextField
                                            fullWidth
                                            placeholder="123-45-67890"
                                            value={businessNumber}
                                            onChange={(e) => setBusinessNumber(e.target.value)}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    backgroundColor: "#fafafa",
                                                    borderRadius: 2,
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: BRAND_COLOR,
                                                    },
                                                },
                                            }}
                                        />
                                        <SecondaryButton
                                            sx={{
                                                minWidth: 120,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            인증요청
                                        </SecondaryButton>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="body2"
                                        fontWeight="500"
                                        color="#2d2a27"
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
                                                backgroundColor: "#fafafa",
                                                borderRadius: 2,
                                                "&.Mui-focused fieldset": {
                                                    borderColor: BRAND_COLOR,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Stack>

                            {/* 폼 액션 버튼들 */}
                            <Box
                                pt={4}
                                borderTop="1px solid #F5EFEA"
                                mt={4}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={2}
                                    flexWrap="wrap"
                                >
                                    <SecondaryButton
                                        onClick={handleCancel}
                                        sx={{
                                            minWidth: 120,
                                            px: 3,
                                            py: 1.5,
                                        }}
                                    >
                                        변경 취소
                                    </SecondaryButton>
                                    <PrimaryButton
                                        onClick={handleSave}
                                        sx={{
                                            minWidth: 120,
                                            px: 3,
                                            py: 1.5,
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
        </Box>
    );
};

export default SellerInfoPage;