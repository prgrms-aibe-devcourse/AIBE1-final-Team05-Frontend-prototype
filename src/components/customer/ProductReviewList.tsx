"use client"

import React from "react"
import type { ReactElement } from "react"
import { useState, useMemo } from "react"
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
    Pagination,
    IconButton,
    Collapse,
    Chip,
    type SelectChangeEvent,
} from "@mui/material"
import { FilterList, Sort, Image, StarRate, ExpandMore } from "@mui/icons-material"
import type { Product, ReviewStats } from "../../types/customer"
import ReviewStatistics from "./ReviewStatistics"

interface ProductReviewListProps {
    productReviews: Product[]
    reviewFilter: string
    reviewSort: string
    onFilterChange: (event: SelectChangeEvent) => void
    onSortChange: (event: SelectChangeEvent) => void
}

const PRODUCTS_PER_PAGE = 5
const REVIEWS_PER_PAGE = 5

const ProductReviewList: React.FC<ProductReviewListProps> = ({
                                                                 productReviews,
                                                                 reviewFilter,
                                                                 reviewSort,
                                                                 onFilterChange,
                                                                 onSortChange,
                                                             }): ReactElement => {
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set())
    const [reviewPages, setReviewPages] = useState<Record<number, number>>({})

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

    // 필터링된 상품 목록
    const filteredProducts = useMemo(() => {
        let filtered = [...productReviews]

        // 평점 필터 적용
        if (reviewFilter !== "all") {
            const targetRating = Number.parseInt(reviewFilter.replace("star", ""))
            filtered = filtered.filter((product) => Math.round(product.averageRating) === targetRating)
        }

        // 정렬 적용
        filtered.sort((a, b) => {
            switch (reviewSort) {
                case "latest":
                    const latestA = Math.max(...a.reviews.map((r) => r.id))
                    const latestB = Math.max(...b.reviews.map((r) => r.id))
                    return latestB - latestA
                case "oldest":
                    const oldestA = Math.min(...a.reviews.map((r) => r.id))
                    const oldestB = Math.min(...b.reviews.map((r) => r.id))
                    return oldestA - oldestB
                case "rating-high":
                    return b.averageRating - a.averageRating
                case "rating-low":
                    return a.averageRating - b.averageRating
                default:
                    return 0
            }
        })

        return filtered
    }, [productReviews, reviewFilter, reviewSort])

    // 상품 페이징 적용
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
        const endIndex = startIndex + PRODUCTS_PER_PAGE
        return filteredProducts.slice(startIndex, endIndex)
    }, [filteredProducts, currentPage])

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

    // 상품 페이지 변경
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // 상품 토글
    const handleProductToggle = (productId: number) => {
        const newExpanded = new Set(expandedProducts)
        if (newExpanded.has(productId)) {
            newExpanded.delete(productId)
        } else {
            newExpanded.add(productId)
            // 처음 펼칠 때 리뷰 페이지를 1로 설정
            if (!reviewPages[productId]) {
                setReviewPages((prev) => ({ ...prev, [productId]: 1 }))
            }
        }
        setExpandedProducts(newExpanded)
    }

    // 리뷰 페이지 변경
    const handleReviewPageChange = (productId: number) => (event: React.ChangeEvent<unknown>, page: number) => {
        setReviewPages((prev) => ({ ...prev, [productId]: page }))
    }

    // 각 상품의 페이징된 리뷰 가져오기
    const getPaginatedReviews = (product: Product) => {
        const currentReviewPage = reviewPages[product.id] || 1
        const startIndex = (currentReviewPage - 1) * REVIEWS_PER_PAGE
        const endIndex = startIndex + REVIEWS_PER_PAGE
        return product.reviews.slice(startIndex, endIndex)
    }

    // 필터나 정렬이 변경될 때 첫 페이지로 이동
    React.useEffect(() => {
        setCurrentPage(1)
    }, [reviewFilter, reviewSort])

    const stats = getOverallReviewStats()

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                판매자 평점
            </Typography>

            {/* 전체 리뷰 통계 */}
            <ReviewStatistics stats={stats} />

            {/* 상품 리뷰 서브 타이틀 */}
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mt: 4, mb: 3 }}>
                상품 리뷰
            </Typography>

            {/* 필터 및 정렬 */}
            <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
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

                <Typography variant="body2" color="text.secondary">
                    총 {filteredProducts.length}개의 제품 (페이지 {currentPage}/{totalPages})
                </Typography>
            </Box>

            {/* 제품별 리뷰 목록 */}
            <Box sx={{ space: 3 }}>
                {paginatedProducts.map((product) => {
                    const isExpanded = expandedProducts.has(product.id)
                    const paginatedReviews = getPaginatedReviews(product)
                    const reviewTotalPages = Math.ceil(product.reviews.length / REVIEWS_PER_PAGE)
                    const currentReviewPage = reviewPages[product.id] || 1

                    return (
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
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Chip label={`리뷰 ${product.totalReviews}개`} size="small" variant="outlined" color="primary" />
                                        <IconButton
                                            onClick={() => handleProductToggle(product.id)}
                                            sx={{
                                                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                                transition: "transform 0.3s ease",
                                            }}
                                        >
                                            <ExpandMore />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </CardContent>

                            {/* 리뷰 목록 (토글) */}
                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {/* 리뷰 페이징 정보 */}
                                    {reviewTotalPages > 1 && (
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                리뷰 {currentReviewPage}/{reviewTotalPages} 페이지
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {REVIEWS_PER_PAGE}개씩 보기
                                            </Typography>
                                        </Box>
                                    )}

                                    {/* 리뷰 목록 */}
                                    {paginatedReviews.map((review, index) => (
                                        <Box
                                            key={review.id}
                                            sx={{
                                                mb: 3,
                                                pb: 3,
                                                borderBottom: index < paginatedReviews.length - 1 ? "1px solid #f0f0f0" : "none",
                                            }}
                                        >
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
                                                    {review.images.map((image, imgIndex) => (
                                                        <CardMedia
                                                            key={imgIndex}
                                                            component="img"
                                                            sx={{
                                                                width: 80,
                                                                height: 80,
                                                                borderRadius: 1,
                                                                flexShrink: 0,
                                                                border: "1px solid #e0e0e0",
                                                            }}
                                                            image={image}
                                                            alt={`리뷰 이미지 ${imgIndex + 1}`}
                                                        />
                                                    ))}
                                                </Box>
                                            )}

                                            {/* 리뷰 액션 */}
                                            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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

                                    {/* 리뷰 페이지네이션 */}
                                    {reviewTotalPages > 1 && (
                                        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                            <Pagination
                                                count={reviewTotalPages}
                                                page={currentReviewPage}
                                                onChange={handleReviewPageChange(product.id)}
                                                color="primary"
                                                size="medium"
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Collapse>
                        </Card>
                    )
                })}
            </Box>

            {/* 상품 페이지네이션 */}
            {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}

            {/* 제품이 없을 때 */}
            {filteredProducts.length === 0 && (
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
