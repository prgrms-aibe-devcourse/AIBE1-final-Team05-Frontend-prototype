// src/components/SellerDashboard/Dashboard/AIForecastPanel/AIForecastPanel.tsx
import React from "react";
import {
    Box,
    Typography,
    Card,
    Chip,
    Alert,
    AlertTitle,
} from "@mui/material";
import { AutoAwesome, Psychology } from "@mui/icons-material";
import { ForecastItem } from "./ForecastItem";
import { DemandForecastItem } from "../SellerDashboardData";

interface AIForecastPanelProps {
    title?: string;
    data: DemandForecastItem[];
}

export const AIForecastPanel: React.FC<AIForecastPanelProps> = ({
                                                                    title = "AI 수요 예측 결과",
                                                                    data
                                                                }) => {
    const reorderCount = data.filter(item =>
        item.status === "긴급 재주문" || item.status === "재주문 필요"
    ).length;

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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Psychology sx={{ color: "#ef9942", fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                        {title}
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

            {reorderCount > 0 && (
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
                            {reorderCount}개 상품의 재고 부족이 예상됩니다. 자동 주문을 권장합니다.
                        </Typography>
                    </Alert>
                </Box>
            )}

            <Box sx={{ flex: 1, overflow: "auto" }}>
                {data.map((item, index) => (
                    <ForecastItem key={index} item={item} />
                ))}
            </Box>
        </Card>
    );
};