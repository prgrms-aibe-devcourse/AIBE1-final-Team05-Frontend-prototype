// src/components/SellerDashboard/Dashboard/SellerDashboardComponents.tsx
import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    Alert,
    AlertTitle,
} from "@mui/material";
import {
    AutoAwesome,
    Psychology,
    CheckCircle,
    TrendingUp,
} from "@mui/icons-material";
import {
    demandForecastData,
    getStatusColor,
} from "./SellerDashboardData";

// getTrendIcon 함수
const getTrendIcon = (trend: string) => {
    switch (trend) {
        case "급증":
            return <TrendingUp sx={{ color: "#EB5757", fontSize: 16 }} />;
        case "증가":
            return <TrendingUp sx={{ color: "#F2994A", fontSize: 16 }} />;
        case "안정":
            return <CheckCircle sx={{ color: "#6FCF97", fontSize: 16 }} />;
        default:
            return <TrendingUp sx={{ color: "#A59A8E", fontSize: 16 }} />;
    }
};

// 통계 카드들 컴포넌트
export const StatCards: React.FC = () => {
    const stats = [
        { title: "오늘의 주문 수", value: "120건", color: "#2196f3" },
        { title: "오늘의 매출", value: "5,500,000원", color: "#4caf50" },
        { title: "오늘의 방문자 수", value: "350명", color: "#ff9800" },
    ];

    return (
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            {stats.map((stat, index) => (
                <Box key={index} sx={{ flex: 1 }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            border: "1px solid #F3EADD",
                            height: 120,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="#A59A8E" gutterBottom>
                                {stat.title}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: stat.color,
                                    fontWeight: 700,
                                    fontSize: { xs: "1.5rem", sm: "1.8rem" }
                                }}
                            >
                                {stat.value}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

// 매출 차트 컴포넌트
export const SalesChart: React.FC = () => (
    <Card
        sx={{
            borderRadius: 3,
            border: "1px solid #F3EADD",
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }
        }}
    >
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                주간 매출 동향
            </Typography>
            <Typography variant="body2" color="#A59A8E">
                이번 주
            </Typography>
        </Box>
        <Box
            sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 1,
                mb: 3,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#2d2a27" }}>
                ₩15,000,000
            </Typography>
            <Typography sx={{ color: "#6FCF97", fontWeight: 500 }}>+15%</Typography>
        </Box>
        <Box
            sx={{
                flex: 1,
                position: "relative",
                backgroundColor: "#fafafa",
                borderRadius: 2,
                minHeight: 200,
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 200"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <defs>
                    <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#ef9942", stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: "#ef9942", stopOpacity: 0.05 }} />
                    </linearGradient>
                </defs>
                <path
                    d="M20 160 Q80 140 120 130 Q160 120 200 110 Q240 100 280 90 Q320 80 380 70"
                    stroke="#ef9942"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M20 160 Q80 140 120 130 Q160 120 200 110 Q240 100 280 90 Q320 80 380 70 L380 180 L20 180 Z"
                    fill="url(#salesGradient)"
                />
            </svg>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                }}
            >
                {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                    <Typography
                        key={day}
                        variant="caption"
                        sx={{ color: "#A59A8E", fontSize: "0.75rem" }}
                    >
                        {day}
                    </Typography>
                ))}
            </Box>
        </Box>
    </Card>
);

// 상품 차트 컴포넌트
export const ProductChart: React.FC = () => {
    const chartData = [
        { name: "상품 A", value: 45, color: "#F3EADD" },
        { name: "상품 B", value: 38, color: "#F3EADD" },
        { name: "상품 C", value: 52, color: "#F3EADD" },
        { name: "상품 D", value: 70, color: "#F3EADD" },
        { name: "상품 E", value: 85, color: "#ef9942" },
        { name: "상품 F", value: 42, color: "#F3EADD" },
        { name: "상품 G", value: 35, color: "#F3EADD" },
    ];

    return (
        <Card
            sx={{
                borderRadius: 3,
                border: "1px solid #F3EADD",
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                    월간 상품 매출 순위
                </Typography>
                <Typography variant="body2" color="#A59A8E">
                    이번 달
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                    mb: 3,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#2d2a27" }}>
                    1,200개
                </Typography>
                <Typography sx={{ color: "#EB5757", fontWeight: 500 }}>-5%</Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    backgroundColor: "#fafafa",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-around",
                    px: 2,
                    pb: 2,
                    minHeight: 200,
                }}
            >
                {chartData.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "12%",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                height: `${item.value * 2}px`,
                                backgroundColor: item.color,
                                borderRadius: "4px 4px 0 0",
                                mb: 1,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scaleY(1.1)',
                                }
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: item.color === "#ef9942" ? "#ef9942" : "#A59A8E",
                                fontSize: "0.7rem",
                                fontWeight: item.color === "#ef9942" ? 600 : 400,
                            }}
                        >
                            {item.name}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

// AI 수요 예측 패널
export const AIForecastPanel: React.FC = () => (
    <Card
        sx={{
            borderRadius: 3,
            border: "1px solid #F3EADD",
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }
        }}
    >
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Psychology sx={{ color: "#ef9942", fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                    AI 수요 예측 결과
                </Typography>
            </Box>
            <Chip
                icon={<AutoAwesome />}
                label="실시간 분석"
                size="small"
                sx={{
                    backgroundColor: "#F3EADD",
                    color: "#ef9942",
                    fontSize: "0.75rem",
                }}
            />
        </Box>

        <Box sx={{ mb: 2 }}>
            <Alert
                severity="warning"
                sx={{
                    backgroundColor: "#FFF3CD",
                    border: "1px solid #F2C94C",
                    borderRadius: 2
                }}
            >
                <AlertTitle sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    재주문 알림
                </AlertTitle>
                <Typography sx={{ fontSize: "0.75rem" }}>
                    2개 상품의 재고 부족이 예상됩니다. 자동 주문을 권장합니다.
                </Typography>
            </Alert>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
            {demandForecastData.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        mb: 1,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 2,
                        border: "1px solid #F8F4F0",
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: "#fafafa",
                            transform: 'translateY(-1px)',
                        }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                mb: 0.5,
                                color: "#333333",
                            }}
                        >
                            {item.product}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography
                                variant="caption"
                                sx={{ color: "#A59A8E", fontSize: "0.75rem" }}
                            >
                                현재: {item.currentStock}개
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "#333333", fontSize: "0.75rem" }}
                            >
                                예측: {item.predictedDemand}개
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {getTrendIcon(item.trend)}
                        <Typography
                            sx={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: getStatusColor(item.status),
                            }}
                        >
                            {item.status}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    </Card>
);

// 재주문 추천 패널
export const ReorderPanel: React.FC = () => (
    <Card
        sx={{
            borderRadius: 3,
            border: "1px solid #F3EADD",
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }
        }}
    >
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
            }}
        >
            <AutoAwesome sx={{ color: "#ef9942", fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                자동 재주문 추천
            </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#ef9942" }}>
                    3건
                </Typography>
                <Typography variant="body2" sx={{ color: "#333333" }}>
                    재주문 필요
                </Typography>
            </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
            {demandForecastData
                .filter((item) => item.recommendedOrder > 0)
                .map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            p: 2,
                            mb: 1.5,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 2,
                            border: `1px solid ${getStatusColor(item.status)}20`,
                            borderLeft: `4px solid ${getStatusColor(item.status)}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: "#fafafa",
                                transform: 'translateY(-1px)',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "0.875rem",
                                fontWeight: 600,
                                mb: 1,
                                color: "#333333",
                            }}
                        >
                            {item.product.length > 15
                                ? `${item.product.substring(0, 15)}...`
                                : item.product}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: "#A59A8E", fontSize: "0.75rem" }}
                            >
                                추천 수량
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    color: getStatusColor(item.status),
                                }}
                            >
                                {item.recommendedOrder}개
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{ color: "#A59A8E", fontSize: "0.75rem" }}
                            >
                                신뢰도: {item.confidence}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={item.confidence}
                                sx={{
                                    width: 60,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: "#F3EADD",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor:
                                            item.confidence >= 90
                                                ? "#6FCF97"
                                                : item.confidence >= 80
                                                    ? "#F2994A"
                                                    : "#EB5757",
                                        borderRadius: 2,
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                ))}

            {demandForecastData.filter((item) => item.recommendedOrder > 0).length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#A59A8E",
                    }}
                >
                    <CheckCircle sx={{ fontSize: 40, mb: 1, color: "#6FCF97" }} />
                    <Typography sx={{ fontSize: "0.875rem", textAlign: "center" }}>
                        모든 상품의 재고가 충분합니다
                    </Typography>
                </Box>
            )}
        </Box>
    </Card>
);