"use client"

import type React from "react"
import { Box, Grid, Paper, Typography, Rating, useTheme } from "@mui/material"
import type { ReviewStats } from "../../types/customer"

interface ReviewStatisticsProps {
    stats: ReviewStats
}

const ReviewStatistics: React.FC<ReviewStatisticsProps> = ({ stats }) => {
    const theme = useTheme()

    return (
        <Paper elevation={1} sx={{ p: 3, mt: 3, mb: 3 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={4}>
                    <Box textAlign="center">
                        <Typography variant="h2" fontWeight="bold" gutterBottom>
                            {stats.averageRating.toFixed(1)}
                        </Typography>
                        <Rating value={Math.round(stats.averageRating)} readOnly size="large" />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            총 {stats.totalReviews}개 리뷰
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <Box key={rating} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Typography variant="body2" sx={{ minWidth: 30 }}>
                                {rating}점
                            </Typography>
                            <Box sx={{ flexGrow: 1, mx: 2, height: 8, backgroundColor: "#e0e0e0", borderRadius: 4 }}>
                                <Box
                                    sx={{
                                        width: `${stats.totalReviews > 0 ? (stats.ratingCounts[rating] / stats.totalReviews) * 100 : 0}%`,
                                        height: "100%",
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 4,
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </Box>
                            <Typography variant="body2" sx={{ minWidth: 20 }}>
                                {stats.ratingCounts[rating]}
                            </Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ReviewStatistics
