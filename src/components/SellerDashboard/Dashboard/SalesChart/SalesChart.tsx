// src/components/SellerDashboard/Dashboard/components/SalesChart/SalesChart.tsx

import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { SalesChartSVG } from "./SalesChartSVG";

interface SalesChartProps {
    title?: string;
    period?: string;
    totalSales?: string;
    growthRate?: string;
    weekDays?: string[];
}

export const SalesChart: React.FC<SalesChartProps> = ({
                                                          title = "주간 매출 동향",
                                                          period = "이번 주",
                                                          totalSales = "₩15,000,000",
                                                          growthRate = "+15%",
                                                          weekDays = ["월", "화", "수", "목", "금", "토", "일"]
                                                      }) => {
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
                    {title}
                </Typography>
                <Typography variant="body2" color="#A59A8E">
                    {period}
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
                    {totalSales}
                </Typography>
                <Typography sx={{ color: "#6FCF97", fontWeight: 500 }}>
                    {growthRate}
                </Typography>
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
                <SalesChartSVG />
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
                    {weekDays.map((day) => (
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
};