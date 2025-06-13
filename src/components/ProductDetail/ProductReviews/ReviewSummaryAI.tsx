// src/components/ProductDetail/ProductReviews/ReviewSummaryAI.tsx

import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Tabs,
    Tab,
    Chip,
} from "@mui/material";
import { AutoAwesome, TrendingUp, TrendingDown } from "@mui/icons-material";
import { Review } from "../review";

interface ReviewSummaryAIProps {
    reviews: Review[];
    totalReviews: number;
}

// Mock LLM 요약 데이터
const mockReviewSummary = {
    positive: {
        summary: "고객들이 제품의 품질과 강아지 반응에 대해 매우 만족하고 있습니다.",
        keyPoints: [
            "100% 국내산 닭가슴살로 만든 안전한 재료",
            "강아지들의 뛰어난 기호성과 맛에 대한 만족",
            "인공첨가물 없는 건강한 성분 구성",
            "훈련용 간식으로도 활용도가 높음",
            "다양한 견종과 연령대에 적합한 크기와 식감",
        ],
        percentage: 87,
        mostMentioned: ["맛있어해요", "건강한재료", "국내산", "안심"],
    },
    negative: {
        summary: "가격과 포장에 대한 개선 요구가 주요 불만사항입니다.",
        keyPoints: [
            "다른 제품 대비 높은 가격으로 인한 부담감",
            "포장재의 밀폐력 부족으로 보관 시 불편함",
            "소형견에게는 다소 딱딱한 식감",
            "일부 강아지의 기호도 차이",
            "정기구매 할인 혜택 부족",
        ],
        percentage: 13,
        mostMentioned: ["가격부담", "포장개선", "딱딱함", "할인필요"],
    },
};

const ReviewSummaryAI: React.FC<ReviewSummaryAIProps> = ({ reviews: _reviews, totalReviews }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleToggleExpand = () => {
        if (!isExpanded) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setIsExpanded(true);
            }, 800);
        } else {
            setIsExpanded(false);
        }
    };

    const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );

    return (
        <Card
            sx={{
                mb: 4,
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
            }}
        >
            {/* 헤더 */}
            <Box
                onClick={handleToggleExpand}
                sx={{
                    p: 3,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: isExpanded ? "background.default" : "background.paper",
                    borderBottom: isExpanded ? "1px solid #f0f0f0" : "none",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        backgroundColor: "background.default",
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <AutoAwesome sx={{ color: "primary.main", fontSize: "1.5rem" }} />
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: "1.125rem",
                                fontWeight: 600,
                                color: "text.primary",
                                mb: 0.5,
                            }}
                        >
                            AI 리뷰 요약 분석
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontSize: "0.8125rem",
                            }}
                        >
                            총 {totalReviews}개 리뷰를 AI가 분석한 결과입니다
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {isLoading && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                            >
                                분석 중...
                            </Typography>
                            <Box
                                sx={{
                                    width: 16,
                                    height: 16,
                                    border: "2px solid #f0f0f0",
                                    borderTop: "2px solid",
                                    borderTopColor: "primary.main",
                                    borderRadius: "50%",
                                    animation: "spin 1s linear infinite",
                                    "@keyframes spin": {
                                        "0%": { transform: "rotate(0deg)" },
                                        "100%": { transform: "rotate(360deg)" },
                                    },
                                }}
                            />
                        </Box>
                    )}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: "0.8125rem",
                            fontWeight: 500,
                        }}
                    >
                        {isExpanded ? "접기" : "자세히 보기"}
                    </Typography>
                    <Box
                        sx={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                            color: "text.secondary",
                        }}
                    >
                        ▼
                    </Box>
                </Box>
            </Box>

            {/* 확장 가능한 콘텐츠 영역 */}
            <Box
                sx={{
                    maxHeight: isExpanded ? "1000px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease-in-out",
                }}
            >
                {isExpanded && !isLoading && (
                    <>
                        <Box sx={{ borderBottom: 1, borderColor: "#f0f0f0" }}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                sx={{
                                    px: 3,
                                    "& .MuiTabs-indicator": {
                                        backgroundColor: "primary.main",
                                    },
                                    "& .MuiTab-root": {
                                        color: "text.secondary",
                                        fontWeight: 500,
                                        fontSize: "0.875rem",
                                        minHeight: 48,
                                        "&.Mui-selected": {
                                            color: "primary.main",
                                        },
                                    },
                                }}
                            >
                                <Tab
                                    icon={<TrendingUp fontSize="small" />}
                                    iconPosition="start"
                                    label={`긍정적 리뷰 요약 (${mockReviewSummary.positive.percentage}%)`}
                                />
                                <Tab
                                    icon={<TrendingDown fontSize="small" />}
                                    iconPosition="start"
                                    label={`부정적 리뷰 요약 (${mockReviewSummary.negative.percentage}%)`}
                                />
                            </Tabs>
                        </Box>

                        <CardContent sx={{ p: 0 }}>
                            {/* 긍정적 리뷰 요약 탭 */}
                            <TabPanel value={selectedTab} index={0}>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            lineHeight: 1.6,
                                            fontSize: "0.875rem",
                                            color: "text.primary",
                                            backgroundColor: "#f8fdf8",
                                            p: 2,
                                            borderRadius: 1,
                                            borderLeft: "4px solid #4caf50",
                                        }}
                                    >
                                        {mockReviewSummary.positive.summary}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            mb: 2,
                                            fontWeight: 600,
                                            color: "text.primary",
                                            fontSize: "0.875rem",
                                        }}
                                    >
                                        주요 만족 포인트
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
                                        {mockReviewSummary.positive.keyPoints.map((point, index) => (
                                            <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: "50%",
                                                        backgroundColor: "#4caf50",
                                                        mt: 0.75,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: "0.8125rem", color: "text.primary", lineHeight: 1.5 }}
                                                >
                                                    {point}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mb: 1.5, fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}
                                    >
                                        자주 언급되는 키워드
                                    </Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        {mockReviewSummary.positive.mostMentioned.map((keyword, index) => (
                                            <Chip
                                                key={index}
                                                label={keyword}
                                                size="small"
                                                sx={{
                                                    backgroundColor: "#e8f5e8",
                                                    color: "#2e7d32",
                                                    fontSize: "0.75rem",
                                                    "& .MuiChip-label": { px: 1.5 },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </TabPanel>

                            {/* 부정적 리뷰 요약 탭 */}
                            <TabPanel value={selectedTab} index={1}>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            lineHeight: 1.6,
                                            fontSize: "0.875rem",
                                            color: "text.primary",
                                            backgroundColor: "#fff8f8",
                                            p: 2,
                                            borderRadius: 1,
                                            borderLeft: "4px solid #f44336",
                                        }}
                                    >
                                        {mockReviewSummary.negative.summary}
                                    </Typography>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mb: 2, fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}
                                    >
                                        주요 개선 요구사항
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
                                        {mockReviewSummary.negative.keyPoints.map((point, index) => (
                                            <Box key={index} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: "50%",
                                                        backgroundColor: "#f44336",
                                                        mt: 0.75,
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: "0.8125rem", color: "text.primary", lineHeight: 1.5 }}
                                                >
                                                    {point}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mb: 1.5, fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}
                                    >
                                        주요 불만 키워드
                                    </Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                        {mockReviewSummary.negative.mostMentioned.map((keyword, index) => (
                                            <Chip
                                                key={index}
                                                label={keyword}
                                                size="small"
                                                sx={{
                                                    backgroundColor: "#ffeaea",
                                                    color: "#c62828",
                                                    fontSize: "0.75rem",
                                                    "& .MuiChip-label": { px: 1.5 },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </TabPanel>
                        </CardContent>
                    </>
                )}
            </Box>
        </Card>
    );
};

export default ReviewSummaryAI;