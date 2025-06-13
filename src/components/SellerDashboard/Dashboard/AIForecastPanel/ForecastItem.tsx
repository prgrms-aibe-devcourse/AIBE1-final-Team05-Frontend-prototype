// src/components/SellerDashboard/Dashboard/AIForecastPanel/ForecastItem.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { TrendingUp, CheckCircle } from "@mui/icons-material";
import { DemandForecastItem, getStatusColor } from "../SellerDashboardData";

interface ForecastItemProps {
    item: DemandForecastItem;
}

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

export const ForecastItem: React.FC<ForecastItemProps> = ({ item }) => {
    return (
        <Box
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
    );
};