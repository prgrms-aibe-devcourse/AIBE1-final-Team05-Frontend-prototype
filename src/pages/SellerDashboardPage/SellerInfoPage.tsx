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
            {/* 페이지 제목 - Paper 밖으로 분리하여 가독성 향상 */}
            <Box sx={{ mb: 4, ml: { xs: 2, sm: 3, md: 4 } }}>
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

            {/* 메인 콘텐츠 */}
            <Paper
                sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 3,
                    border: `1px solid ${BRAND_COLORS.BORDER}`,
                    mx: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box sx={{ maxWidth: { xs: "100%", sm: "50%" }, minWidth: { sm: "600px" } }}>
                    <PageHeader
                        title="기본 정보 설정"
                        onCustomerViewClick={handleCustomerViewClick}
                    />
                </Box>

                {/* 카드 섹션 - 반응형 너비 조정 */}
                <Box sx={{ maxWidth: { xs: "100%", sm: "50%" }, minWidth: { sm: "600px" } }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                        mb: 4
                    }}>
                        {/* 프로필 미리보기 카드 */}
                        <Box sx={{ flex: { sm: 2 }, width: "100%" }}>
                            <ProfilePreviewCard
                                workshopName={data.workshopName || "달콤한 우리집 간식공방"}
                                rating={data.rating}
                                avatarEmoji={data.avatarEmoji}
                                profileImage={data.profileImage}
                                tags={data.tags}
                                operatingHours={data.operatingHours}
                            />
                        </Box>

                        {/* 완성도 카드 */}
                        <Box sx={{ flex: { sm: 1 }, width: "100%", minWidth: { sm: 200 } }}>
                            <CompletionCard completionRate={data.completionRate} />
                        </Box>
                    </Box>
                </Box>

                {/* 폼 섹션 - 반응형 너비 조정 */}
                <Box sx={{ maxWidth: { xs: "100%", sm: "50%" }, minWidth: { sm: "600px" } }}>
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
        </Box>
    );
};

export default SellerInfoPage;