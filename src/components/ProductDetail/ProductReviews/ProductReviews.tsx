// src/components/ProductDetail/ProductReviews/ProductReviews.tsx

import React, { useState, useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Review, ReviewStats } from "../review";
import ReviewStatsOverview from "./ReviewStatsOverview";
import ReviewSummaryAI from "./ReviewSummaryAI";
import ReviewList from "./ReviewList";
import ReviewPagination from "./ReviewPagination";

interface ProductReviewsProps {
    reviews: Review[];
    stats: ReviewStats;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, stats }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    // 데이터 안전성 체크
    if (!stats || !stats.ratingDistribution) {
        return (
            <div style={{ color: "red", fontSize: "2rem" }}>
                ERROR: stats 데이터가 없습니다!
            </div>
        );
    }

    // 페이지네이션 계산
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const currentReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        return reviews.slice(startIndex, endIndex);
    }, [reviews, currentPage, reviewsPerPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        const reviewSection = document.getElementById("review-section");
        if (reviewSection) {
            reviewSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Box sx={{ mt: 6, py: 4 }}>
            <Box
                id="review-section"
                sx={{ backgroundColor: "#f8f4f0", p: 4, borderRadius: 2 }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        mb: 4,
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "#1b150e",
                    }}
                >
                    고객 리뷰
                </Typography>

                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <ReviewStatsOverview stats={stats} />
                </Grid>

                {/* 페이지 정보 표시 */}
                <Box
                    sx={{
                        mb: 4,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: "#97784e", fontSize: "0.875rem" }}
                    >
                        총 {stats.totalReviews}개 리뷰 중{" "}
                        {(currentPage - 1) * reviewsPerPage + 1}-
                        {Math.min(currentPage * reviewsPerPage, reviews.length)}개 표시
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "#97784e", fontSize: "0.875rem" }}
                    >
                        {currentPage} / {totalPages} 페이지
                    </Typography>
                </Box>

                {/* AI 리뷰 요약 */}
                <ReviewSummaryAI reviews={reviews} totalReviews={stats.totalReviews} />

                {/* 리뷰 목록 */}
                <ReviewList reviews={currentReviews} />

                {/* 페이지네이션 */}
                <ReviewPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />

                {/* 리뷰가 없을 때 표시할 메시지 */}
                {reviews.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography
                            variant="body1"
                            sx={{ color: "#97784e", fontSize: "1rem" }}
                        >
                            아직 등록된 리뷰가 없습니다.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "#d5c4ae", fontSize: "0.875rem", mt: 1 }}
                        >
                            첫 번째 리뷰를 남겨보세요!
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProductReviews;