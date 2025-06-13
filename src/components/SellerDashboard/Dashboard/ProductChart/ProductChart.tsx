// src/components/SellerDashboard/Dashboard/components/ProductChart/ProductChart.tsx

import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { ProductChartBar } from "./ProductChartBar";
import { ProductData } from "./types";
import { defaultProductData } from "./data";

interface ProductChartProps {
    title?: string;
    period?: string;
    totalProducts?: string;
    changeRate?: string;
    data?: ProductData[];
}

export const ProductChart: React.FC<ProductChartProps> = ({
                                                              title = "월간 상품 매출 순위",
                                                              period = "이번 달",
                                                              totalProducts = "1,200개",
                                                              changeRate = "-5%",
                                                              data = defaultProductData
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
                    {totalProducts}
                </Typography>
                <Typography sx={{ color: "#EB5757", fontWeight: 500 }}>
                    {changeRate}
                </Typography>
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
                {data.map((item, index) => (
                    <ProductChartBar key={index} item={item} />
                ))}
            </Box>
        </Card>
    );
};