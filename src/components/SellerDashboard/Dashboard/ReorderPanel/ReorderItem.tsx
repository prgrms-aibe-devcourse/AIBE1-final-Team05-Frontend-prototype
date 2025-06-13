// src/components/SellerDashboard/Dashboard/ReorderPanel/ReorderItem.tsx
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { DemandForecastItem, getStatusColor } from "../SellerDashboardData";

interface ReorderItemProps {
    item: DemandForecastItem;
}

export const ReorderItem: React.FC<ReorderItemProps> = ({ item }) => {
    const truncatedProductName = item.product.length > 15
        ? `${item.product.substring(0, 15)}...`
        : item.product;

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 90) return "#6FCF97";
        if (confidence >= 80) return "#F2994A";
        return "#EB5757";
    };

    return (
        <Box
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
                {truncatedProductName}
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
                            backgroundColor: getConfidenceColor(item.confidence),
                            borderRadius: 2,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};