// src/pages/SellerDashboardPage/SellerInfoPage.tsx

import React from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import {
    BRAND_COLORS,
    PageHeader,
    ProfilePreviewCard,
    CompletionCard,
    BasicInfoForm,
    FormActions,
    useSellerInfo,
} from "@/components/SellerDashboard/SellerInfo";

const SellerInfoPage: React.FC = () => {
    const {
        data,
        isLoading,
        updateField,
        handleSave,
        handleCancel,
        handleBusinessNumberVerify,
        handleCustomerViewClick,
    } = useSellerInfo();

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* 페이지 제목 - 좌측 정렬로 변경 */}
            <Container maxWidth="lg" sx={{ mb: 4 }}>
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: "2.5rem",
                            fontWeight: 700,
                            color: BRAND_COLORS.TEXT_PRIMARY,
                            fontFamily: "'Noto Sans KR', sans-serif",
                            mb: 1,
                        }}
                    >
                        판매자 정보 관리
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: BRAND_COLORS.TEXT_SECONDARY,
                            fontSize: "1rem"
                        }}
                    >
                        워크샵 정보를 관리하고 고객에게 보여질 프로필을 설정하세요.
                    </Typography>
                </Box>
            </Container>

            {/* 메인 콘텐츠 - 더 넓은 최대 너비로 확장 */}
            <Container maxWidth="lg" sx={{ width: '100%' }}>
                <Paper
                    sx={{
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: 3,
                        border: `1px solid ${BRAND_COLORS.BORDER}`
                    }}
                >
                    {/* 페이지 헤더 */}
                    <PageHeader
                        title="기본 정보 설정"
                        onCustomerViewClick={handleCustomerViewClick}
                    />

                    {/* 카드 섹션 - 반응형 레이아웃 개선 */}
                    <Box sx={{ mb: 5 }}>
                        <Grid container spacing={3}>
                            {/* 프로필 미리보기 카드 */}
                            <Grid item xs={12} lg={8}>
                                <ProfilePreviewCard
                                    workshopName={data.workshopName || "달콤한 우리집 간식공방"}
                                    rating={data.rating}
                                    avatarEmoji={data.avatarEmoji}
                                    profileImage={data.profileImage}
                                    tags={data.tags}
                                    operatingHours={data.operatingHours}
                                />
                            </Grid>

                            {/* 완성도 카드 */}
                            <Grid item xs={12} lg={4}>
                                <CompletionCard completionRate={data.completionRate} />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* 폼 섹션 */}
                    <Box>
                        <BasicInfoForm
                            data={{
                                workshopName: data.workshopName,
                                representativeName: data.representativeName,
                                businessNumber: data.businessNumber,
                                postalCode: data.postalCode,
                                roadAddress: data.roadAddress,
                                detailAddress: data.detailAddress,
                                tags: data.tags,
                                operatingHours: data.operatingHours,
                                profileImage: data.profileImage,
                            }}
                            onChange={updateField}
                            onBusinessNumberVerify={handleBusinessNumberVerify}
                        />

                        <FormActions
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isLoading={isLoading}
                        />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SellerInfoPage;