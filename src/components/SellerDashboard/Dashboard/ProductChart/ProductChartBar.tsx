// src/components/SellerDashboard/Dashboard/components/ProductChart/ProductChartBar.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import { ProductData } from "./types";

interface ProductChartBarProps {
    item: ProductData;
}

export const ProductChartBar: React.FC<ProductChartBarProps> = ({ item }) => {
    return (
        <Box
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
    );
};