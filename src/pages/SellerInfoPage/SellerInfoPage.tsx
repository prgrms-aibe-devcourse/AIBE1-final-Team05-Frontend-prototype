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
    Divider,
    Stack,
    Card,
    CardContent,
    Rating,
    CircularProgress,
} from "@mui/material";
import {
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