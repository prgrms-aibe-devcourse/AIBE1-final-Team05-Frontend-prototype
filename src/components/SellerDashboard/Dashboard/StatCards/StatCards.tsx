// src/components/SellerDashboard/Dashboard/components/StatCards/StatCards.tsx
import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { StatItem } from "./types";
import { statCardData } from "./data";

interface StatCardsProps {
    data?: StatItem[];
}

export const StatCards: React.FC<StatCardsProps> = ({
                                                        data = statCardData
                                                    }) => {
    return (
        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            {data.map((stat, index) => (
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