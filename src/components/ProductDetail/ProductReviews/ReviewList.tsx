// src/components/ProductDetail/ProductReviews/ReviewList.tsx

import React from "react";
import { Box, Typography, Rating, Avatar, Divider } from "@mui/material";
import { Review } from "../review";
interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMonths = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
        return `${diffInMonths}개월 전`;
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {reviews.map((review, index) => (
                <Box
                    key={review.id}
                    sx={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e7ddd0",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Avatar
                            src={review.reviewer.avatar}
                            alt={review.reviewer.name}
                            sx={{ width: 48, height: 48 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                    mb: 1,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600, color: "#1b150e" }}
                                    >
                                        {review.reviewer.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "#97784e", fontSize: "0.75rem" }}
                                    >
                                        {review.reviewer.petInfo}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#97784e", fontSize: "0.75rem" }}
                                >
                                    {formatTimeAgo(review.date)}
                                </Typography>
                            </Box>

                            <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                sx={{
                                    mb: 1,
                                    color: "#e89830",
                                    "& .MuiRating-iconEmpty": {
                                        color: "#d5c4ae",
                                    },
                                }}
                            />

                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 2,
                                    lineHeight: 1.6,
                                    fontSize: "0.875rem",
                                    color: "#1b150e",
                                }}
                            >
                                {review.content}
                            </Typography>

                            {review.image && (
                                <Box
                                    component="img"
                                    src={review.image}
                                    alt="리뷰 사진"
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: "cover",
                                        borderRadius: 1,
                                        mb: 2,
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                    {index < reviews.length - 1 && (
                        <Divider sx={{ mt: 3, borderColor: "#f0f0f0" }} />
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default ReviewList;