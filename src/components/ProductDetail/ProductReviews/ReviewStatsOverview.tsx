// src/components/ProductDetail/ProductReviews/ReviewStatsOverview.tsx

import React from "react";
import { Box, Typography, Rating, Grid } from "@mui/material";
import { ReviewStats } from "../review";

interface ReviewStatsOverviewProps {
    stats: ReviewStats;
}

const ReviewStatsOverview: React.FC<ReviewStatsOverviewProps> = ({ stats }) => {
    return (
        <>
            {/* 평점 요약 섹션 */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "3rem",
                            fontWeight: 700,
                            color: "text.primary",
                            mb: 1,
                        }}
                    >
                        {stats.averageRating}
                    </Typography>
                    <Rating
                        value={stats.averageRating}
                        precision={0.1}
                        readOnly
                        sx={{
                            mb: 1,
                            color: "primary.main",
                            "& .MuiRating-iconEmpty": {
                                color: "grey.200",
                            },
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {stats.totalReviews}개 리뷰
                    </Typography>
                </Box>
            </Grid>

            {/* 평점 분포 섹션 */}
            <Grid size={{ xs: 12, md: 8 }}>
                <Box sx={{ width: "100%" }}>
                    {[5, 4, 3, 2, 1].map((rating) => {

                        const ratingKey = rating as unknown as keyof typeof stats.ratingDistribution;
                        const percentage = stats.ratingDistribution[ratingKey] || 0;

                        return (
                            <Box
                                key={rating}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mb: 0.5,
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        width: "8px",
                                        color: "text.primary",
                                        textAlign: "center",
                                        fontWeight: 400,
                                    }}
                                >
                                    {rating}
                                </Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 8,
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${Math.max(Number(percentage), 0)}%`,
                                            height: "100%",
                                            backgroundColor: "primary.main",
                                            borderRadius: 0,
                                            minWidth: percentage > 0 ? "4px" : "0px",
                                            transition: "width 0.3s ease-in-out",
                                        }}
                                    />
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        width: "28px",
                                        textAlign: "right",
                                        color: "text.secondary",
                                        fontWeight: 400,
                                    }}
                                >
                                    {percentage}%
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </>
    );
};

export default ReviewStatsOverview;