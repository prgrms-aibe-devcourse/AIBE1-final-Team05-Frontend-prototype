// src/components/ProductDetail/ProductReviews/ReviewList.tsx

import React, { useState } from "react";
import { Box, Typography, Rating, Divider, IconButton, Tooltip } from "@mui/material";
import { Review } from "../review";
import ReportModal from "../../common/ReportModal.tsx";

interface ReviewListProps {
    reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<string>("");
    const [selectedReviewerName, setSelectedReviewerName] = useState<string>("");

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const handleReportClick = (reviewId: string, reviewerName: string) => {
        setSelectedReviewId(reviewId);
        setSelectedReviewerName(reviewerName);
        setReportModalOpen(true);
    };

    const handleReportModalClose = () => {
        setReportModalOpen(false);
        setSelectedReviewId("");
        setSelectedReviewerName("");
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {reviews.map((review, index) => (
                <Box
                    key={review.id}
                    sx={{
                        backgroundColor: "background.paper",
                        border: "1px solid",
                        borderColor: "grey.200",
                        borderRadius: 2,
                        p: 3,
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {/* 리뷰어 정보 및 날짜 */}
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
                                    sx={{
                                        fontWeight: 600,
                                        color: "text.primary"
                                    }}
                                >
                                    {review.reviewer.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.75rem"
                                    }}
                                >
                                    {review.reviewer.petInfo}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.75rem"
                                    }}
                                >
                                    {formatDate(review.date)}
                                </Typography>



                                <Tooltip title="리뷰 신고하기" placement="top">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleReportClick(review.id, review.reviewer.name)}
                                        sx={{
                                            color: "text.secondary",
                                            "&:hover": {
                                                backgroundColor: "error.light",
                                                transform: "scale(1.1)",
                                                "& .custom-icon": {
                                                    filter: 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(4456%) hue-rotate(349deg) brightness(98%) contrast(107%)', // 빨간색으로 변경
                                                }
                                            },
                                            width: 28,
                                            height: 28,
                                            transition: "all 0.2s ease-in-out",
                                        }}
                                    >
                                        <Box
                                            className="custom-icon"
                                            component="img"
                                            src="/icons/report-siren.png"
                                            alt="신고"
                                            sx={{
                                                width: 16,
                                                height: 16,
                                                filter: 'opacity(0.6)',
                                                transition: 'filter 0.2s ease-in-out',
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* 평점 */}
                        <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{
                                mb: 1,
                                color: "primary.main",
                                "& .MuiRating-iconEmpty": {
                                    color: "grey.200",
                                },
                            }}
                        />

                        {/* 리뷰 내용 */}
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 2,
                                lineHeight: 1.6,
                                color: "text.primary",
                            }}
                        >
                            {review.content}
                        </Typography>

                        {/* 리뷰 이미지 (있는 경우) */}
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

                    {/* 구분선 (마지막 리뷰가 아닌 경우) */}
                    {index < reviews.length - 1 && (
                        <Divider sx={{ mt: 3, borderColor: "#f0f0f0" }} />
                    )}
                </Box>
            ))}

            {/* 신고 모달 */}
            <ReportModal
                open={reportModalOpen}
                onClose={handleReportModalClose}
                type="review"
                targetId={selectedReviewId}
                targetName={selectedReviewerName}
            />
        </Box>
    );
};

export default ReviewList;