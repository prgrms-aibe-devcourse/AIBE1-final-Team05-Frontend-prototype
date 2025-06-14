// src/components/SellerDashboard/SellerInfo/CardComponents.tsx

import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Rating,
    Card,
    CardContent,
} from "@mui/material";
import { BRAND_COLORS } from "./constants";
import { ProgressCircle } from "./BasicComponents";

// ==================== 프로필 미리보기 카드 ====================
interface ProfilePreviewCardProps {
    workshopName?: string;
    rating?: number;
    avatarEmoji?: string;
}

export const ProfilePreviewCard: React.FC<ProfilePreviewCardProps> = ({
                                                                          workshopName = "달콤한 우리집 간식공방",
                                                                          rating = 4.5,
                                                                          avatarEmoji = "🐾"
                                                                      }) => (
    <Card sx={{
        backgroundColor: BRAND_COLORS.BACKGROUND_LIGHT,
        border: `1px solid ${BRAND_COLORS.BORDER}`,
        borderRadius: 3
    }}>
        <CardContent sx={{ p: 3 }}>
            <Typography
                variant="h6"
                fontWeight="bold"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={1}
            >
                워크샵 프로필 미리보기
            </Typography>
            <Typography
                variant="body2"
                color={BRAND_COLORS.TEXT_SECONDARY}
                mb={3}
            >
                현재 워크샵 프로필 요약과 고객에게 표시될 내용을 간략하게 확인해보세요.
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{
                    width: 96,
                    height: 96,
                    borderRadius: 2,
                    backgroundColor: BRAND_COLORS.PRIMARY,
                    fontSize: '2rem'
                }}>
                    {avatarEmoji}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={BRAND_COLORS.TEXT_PRIMARY}
                    >
                        {workshopName}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Rating value={rating} precision={0.5} readOnly size="small" />
                        <Typography
                            variant="body2"
                            color={BRAND_COLORS.TEXT_SECONDARY}
                            ml={1}
                        >
                            ({rating}/5.0)
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

// ==================== 완성도 카드 ====================
interface CompletionCardProps {
    completionRate: number;
}

export const CompletionCard: React.FC<CompletionCardProps> = ({
                                                                  completionRate
                                                              }) => (
    <Card sx={{
        backgroundColor: BRAND_COLORS.BACKGROUND_LIGHT,
        border: `1px solid ${BRAND_COLORS.BORDER}`,
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <CardContent sx={{
            textAlign: "center",
            p: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Typography
                variant="h6"
                fontWeight="600"
                color={BRAND_COLORS.TEXT_PRIMARY}
                mb={2}
            >
                프로필 완성도
            </Typography>
            <ProgressCircle value={completionRate} />
            <Typography
                variant="caption"
                color={BRAND_COLORS.TEXT_SECONDARY}
                mt={2}
            >
                완성도를 높여 더 많은 고객을 만나세요!
            </Typography>
        </CardContent>
    </Card>
);