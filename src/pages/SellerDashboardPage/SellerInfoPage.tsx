// src/pages/SellerDashboardPage/SellerInfoPage.tsx

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
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
            {/* 페이지 제목 */}
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

            <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Paper
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            borderRadius: 3,
                            border: `1px solid ${BRAND_COLORS.BORDER}`,
                        }}
                    >
                        <PageHeader
                            title="내 페이지"
                            onCustomerViewClick={handleCustomerViewClick}
                        />

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <ProfilePreviewCard
                                    workshopName={data.workshopName || "달콤한 우리집 간식공방"}
                                    rating={data.rating}
                                    avatarEmoji={data.avatarEmoji}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <CompletionCard completionRate={data.completionRate} />
                            </Grid>
                        </Grid>

                        <BasicInfoForm
                            data={{
                                workshopName: data.workshopName,
                                representativeName: data.representativeName,
                                businessNumber: data.businessNumber,
                                businessAddress: data.businessAddress,
                            }}
                            onChange={updateField}
                            onBusinessNumberVerify={handleBusinessNumberVerify}
                        />

                        <FormActions
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isLoading={isLoading}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SellerInfoPage;