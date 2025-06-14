// src/components/SellerDashboard/SellerInfo/CardComponents.tsx

import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Rating,
    Card,
    CardContent,
    Chip,
    Stack,
} from "@mui/material";
import { AccessTime as TimeIcon } from "@mui/icons-material";
import { BRAND_COLORS } from "./constants";
import { ProgressCircle } from "./BasicComponents";

// ==================== 프로필 미리보기 카드 ====================
interface ProfilePreviewCardProps {
    workshopName?: string;
    rating?: number;
    avatarEmoji?: string;
    profileImage?: string | null;
    tags?: string[];
    operatingHours?: {
        start: string;
        end: string;
        holidayInfo: string;
    };
}

export const ProfilePreviewCard: React.FC<ProfilePreviewCardProps> = ({
                                                                          workshopName = "달콤한 우리집 간식공방",
                                                                          rating = 4.5,
                                                                          avatarEmoji = "🐾",
                                                                          profileImage = null,
                                                                          tags = ["수제간식", "무첨가", "강아지전용"],
                                                                          operatingHours = {
                                                                              start: "09:00",
                                                                              end: "18:00",
                                                                              holidayInfo: "주말 및 공휴일 휴무"
                                                                          }
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

            {/* 프로필 정보 */}
            <Box display="flex" alignItems="flex-start" gap={2} mb={3}>
                <Avatar sx={{
                    width: 96,
                    height: 96,
                    borderRadius: 2,
                    backgroundColor: profileImage ? "transparent" : BRAND_COLORS.PRIMARY,
                    fontSize: profileImage ? 0 : '2rem'
                }}>
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        avatarEmoji
                    )}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="h6"
                        fontWeight="600"
                        color={BRAND_COLORS.TEXT_PRIMARY}
                        mb={1}
                    >
                        {workshopName}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Rating value={rating} precision={0.5} readOnly size="small" />
                        <Typography
                            variant="body2"
                            color={BRAND_COLORS.TEXT_SECONDARY}
                            ml={1}
                        >
                            ({rating}/5.0)
                        </Typography>
                    </Box>

                    {/* 운영시간 */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <TimeIcon sx={{ fontSize: 16, color: BRAND_COLORS.TEXT_SECONDARY, mr: 1 }} />
                        <Typography variant="body2" color={BRAND_COLORS.TEXT_SECONDARY}>
                            {operatingHours.start} - {operatingHours.end} ({operatingHours.holidayInfo})
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* 태그 */}
            {tags.length > 0 && (
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight="500"
                        color={BRAND_COLORS.TEXT_PRIMARY}
                        mb={1}
                    >
                        워크샵 태그
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={`#${tag}`}
                                size="small"
                                sx={{
                                    backgroundColor: BRAND_COLORS.PRIMARY,
                                    color: "white",
                                    fontSize: "0.75rem",
                                    height: 24,
                                    mb: 1
                                }}
                            />
                        ))}
                    </Stack>
                </Box>
            )}
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
                textAlign="center"
            >
                완성도를 높여 더 많은 고객을 만나세요!
            </Typography>
        </CardContent>
    </Card>
);