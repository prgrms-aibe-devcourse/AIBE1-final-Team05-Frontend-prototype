"use client"

import type React from "react"
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Rating,
    Button,
    type SelectChangeEvent,
} from "@mui/material"
import { FilterList, Sort, ThumbUp, Comment, Image, StarRate } from "@mui/icons-material"
import type { Product, ReviewStats } from "../../types/customer"
import ReviewStatistics from "./ReviewStatistics"

interface ProductReviewListProps {
    productReviews: Product[]
    reviewFilter: string
    reviewSort: string
    onFilterChange: (event: SelectChangeEvent) => void
    onSortChange: (event: SelectChangeEvent) => void
}

const ProductReviewList: React.FC<ProductReviewListProps> = ({
                                                                 productReviews,
                                                                 reviewFilter,
                                                                 reviewSort,
                                                                 onFilterChange,
                                                                 onSortChange,
                                                             }) => {
    // 전체 평점 통계 계산
    const getOverallReviewStats = (): ReviewStats => {
        const allReviews = productReviews.flatMap((product) => product.reviews)
        const totalReviews = allReviews.length
        const averageRating =
            totalReviews > 0 ? allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

        const ratingCounts = {
            5: allReviews.filter((r) => r.rating === 5).length,
            4: allReviews.filter((r) => r.rating === 4).length,
            3: allReviews.filter((r) => r.rating === 3).length,
            2: allReviews.filter((r) => r.rating === 2).length,
            1: allReviews.filter((r) => r.rating === 1).length,
        }

        return { totalReviews, averageRating, ratingCounts }
    }

    const stats = getOverallReviewStats()

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                상품 리뷰
            </Typography>

            {/* 전체 리뷰 통계 */}
            <ReviewStatistics stats={stats} />

            {/* 필터 및 정렬 */}
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>평점 필터</InputLabel>
                    <Select
                        value={reviewFilter}
                        label="평점 필터"
                        onChange={onFilterChange}
                        startAdornment={<FilterList sx={{ mr: 1 }} />}
                    >
                        <MenuItem value="all">전체 평점</MenuItem>
                        <MenuItem value="5star">5점 제품만</MenuItem>
                        <MenuItem value="4star">4점 제품만</MenuItem>
                        <MenuItem value="3star">3점 제품만</MenuItem>
                        <MenuItem value="2star">2점 제품만</MenuItem>
                        <MenuItem value="1star">1점 제품만</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>정렬</InputLabel>
                    <Select value={reviewSort} label="정렬" onChange={onSortChange} startAdornment={<Sort sx={{ mr: 1 }} />}>
                        <MenuItem value="latest">최신 리뷰순</MenuItem>
                        <MenuItem value="oldest">오래된 리뷰순</MenuItem>
                        <MenuItem value="rating-high">평점 높은순</MenuItem>
                        <MenuItem value="rating-low">평점 낮은순</MenuItem>
                    </Select>
                </FormControl>

                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
                    {productReviews.length}개의 제품
                </Typography>
            </Box>

            {/* 제품별 리뷰 목록 */}
            <Box sx={{ space: 3 }}>
                {productReviews.map((product) => (
                    <Card key={product.id} sx={{ mb: 3 }}>
                        {/* 제품 헤더 */}
                        <CardContent sx={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 64, height: 64, borderRadius: 2 }}
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Rating value={Math.round(product.averageRating)} readOnly size="small" />
                                        <Typography variant="body2" fontWeight="medium">
                                            {product.averageRating.toFixed(1)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            리뷰 {product.totalReviews}개
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>

                        {/* 해당 제품의 리뷰들 */}
                        <CardContent>
                            {product.reviews.map((review) => (
                                <Box key={review.id}>
                                    {/* 리뷰 헤더 */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Avatar src={review.customerAvatar} sx={{ width: 40, height: 40 }} />
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="medium">
                                                    {review.customerName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {review.reviewDate}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Rating value={review.rating} readOnly size="small" />
                                            <Typography variant="caption" color="text.secondary">
                                                ({review.rating}.0)
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* 리뷰 내용 */}
                                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                        {review.reviewText}
                                    </Typography>

                                    {/* 리뷰 이미지 */}
                                    {review.images.length > 0 && (
                                        <Box sx={{ display: "flex", gap: 1, mb: 2, overflowX: "auto" }}>
                                            {review.images.map((image, index) => (
                                                <CardMedia
                                                    key={index}
                                                    component="img"
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 1,
                                                        flexShrink: 0,
                                                        border: "1px solid #e0e0e0",
                                                    }}
                                                    image={image}
                                                    alt={`리뷰 이미지 ${index + 1}`}
                                                />
                                            ))}
                                        </Box>
                                    )}

                                    {/* 리뷰 액션 */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            pt: 2,
                                            borderTop: "1px solid #f0f0f0",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button startIcon={<ThumbUp />} size="small" color="inherit" sx={{ color: "text.secondary" }}>
                                                도움돼요 ({review.helpful})
                                            </Button>
                                            <Button startIcon={<Comment />} size="small" color="inherit" sx={{ color: "text.secondary" }}>
                                                답글
                                            </Button>
                                        </Box>
                                        {review.images.length > 0 && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                                <Image sx={{ width: 16, height: 16, color: "text.secondary" }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {review.images.length}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* 제품이 없을 때 */}
            {productReviews.length === 0 && (
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <StarRate sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        해당 조건의 제품이 없습니다.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default ProductReviewList
