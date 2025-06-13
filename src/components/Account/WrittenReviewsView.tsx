"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Box, Typography, Paper, Avatar, Rating, Button } from "@mui/material"
import Pagination from "../common/Pagination"
import {mockWrittenReviews} from "@/data/mock-data.ts";



interface WrittenReviewsViewProps {
}

const WrittenReviewsView: React.FC<WrittenReviewsViewProps> = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // 목업 작성된 리뷰 데이터


    // 페이지네이션을 위한 리뷰 슬라이싱
    const paginatedReviews = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return mockWrittenReviews.slice(startIndex, endIndex)
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


    return (
        <Box>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <Typography variant="body2" color="text.secondary">
                    작성한 리뷰 {mockWrittenReviews.length}건
                </Typography>
            </Box>

            {paginatedReviews.map((review) => (
                <Paper key={review.id} style={{ marginBottom: 24, padding: 24 }}>
                    <Box style={{ display: "flex", gap: 24 }}>
                        {/* 상품 이미지 */}
                        <Avatar src={review.productImage} variant="rounded" style={{ width: 80, height: 80, flexShrink: 0 }} />

                        {/* 리뷰 내용 */}
                        <Box style={{ flex: 1 }}>
                            {/* 상품명 */}
                            <Typography variant="body1" style={{ fontWeight: 600, marginBottom: 12}}>
                                {review.productName}
                            </Typography>

                            {/* 별점과 날짜 */}
                            <Box style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary">
                                    {review.reviewDate}
                                </Typography>
                            </Box>

                            {/* 리뷰 텍스트 */}
                            <Typography variant="body2" style={{ marginBottom: 16, lineHeight: 1.6 }}>
                                {review.reviewText}
                            </Typography>


                            {/* 한줄 요약 (있는 경우) */}
                            {review.summary && (
                                <Box style={{ marginBottom: 16 }}>
                                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: 4 }}>
                                        한줄 요약
                                    </Typography>
                                    <Typography variant="body2" style={{ fontStyle: "italic" }}>
                                        "{review.summary}"
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* 수정/삭제 버튼 */}
                        <Box style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                            <Box style={{ display: "flex", gap: 8 }}>
                                <Button variant="text" size="small" color="primary">
                                    수정
                                </Button>
                                <Typography variant="body2" color="text.secondary">
                                    |
                                </Typography>
                                <Button variant="text" size="small" color="error">
                                    삭제
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            ))}

            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage}
                totalItems={mockWrittenReviews.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </Box>
    )
}

export default WrittenReviewsView