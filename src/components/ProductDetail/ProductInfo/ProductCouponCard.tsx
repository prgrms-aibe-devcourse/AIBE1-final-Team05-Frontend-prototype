// src/components/ProductDetail/ProductInfo/ProductCouponCard.tsx
// 상품 상세페이지 전용 쿠폰 발급 카드 (팀원의 쿠폰함과는 별도)

import React from "react";
import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material";
import { CheckCircle, LocalOffer } from "@mui/icons-material";

// 상품별 쿠폰 발급 전용 타입 (팀원 타입과 구분)
export interface ProductCoupon {
    id: string;
    title: string;
    description: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    minOrderAmount?: number;
    expiryDate: string;
    category: string;
    applicableProducts?: string[]; // 적용 가능한 상품 ID 목록
    sellerName?: string; // 판매자 이름
    maxIssueCount?: number; // 최대 발급 개수
    currentIssueCount?: number; // 현재 발급된 개수
}

interface ProductCouponCardProps {
    coupon: ProductCoupon;
    isIssued: boolean;
    onIssue: (couponId: string) => void;
    productId: string;
}

const ProductCouponCard: React.FC<ProductCouponCardProps> = ({
                                                                 coupon,
                                                                 isIssued,
                                                                 onIssue,
                                                                 // productId
                                                             }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 3) {
            return `${diffDays}일 후 만료`;
        }

        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")} 까지`;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "신규회원": return "#FF6B6B";
            case "브랜드": return "#4ECDC4";
            case "배송": return "#45B7D1";
            case "특가": return "#FFA726";
            default: return "#66BB6A";
        }
    };

    const isLimitedQuantity = coupon.maxIssueCount !== undefined && coupon.currentIssueCount !== undefined;
    const remainingCount = isLimitedQuantity
        ? coupon.maxIssueCount! - coupon.currentIssueCount!
        : null;

    return (
        <Card
            sx={{
                height: "100%",
                border: isIssued ? "2px solid #4CAF50" : "1px solid #e0e0e0",
                borderRadius: 3,
                boxShadow: isIssued ? "0 4px 12px rgba(76, 175, 80, 0.2)" : "0 2px 8px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                    boxShadow: isIssued ? "0 6px 16px rgba(76, 175, 80, 0.3)" : "0 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-2px)",
                },
            }}
        >
            {/* 카테고리 라벨 (상단 리본) */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: getCategoryColor(coupon.category),
                    color: "white",
                    px: 2,
                    py: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderBottomLeftRadius: 8,
                }}
            >
                {coupon.category}
            </Box>

            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                {/* 만료일 정보 */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2, mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                        {formatDate(coupon.expiryDate)}
                    </Typography>
                    {isIssued && (
                        <Chip
                            icon={<CheckCircle sx={{ fontSize: "16px !important" }} />}
                            label="발급완료"
                            size="small"
                            sx={{
                                backgroundColor: "#E8F5E8",
                                color: "#2E7D32",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }}
                        />
                    )}
                </Box>

                {/* 쿠폰 제목 */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: "1.1rem",
                        color: "text.primary",
                        lineHeight: 1.3,
                    }}
                >
                    {coupon.title}
                </Typography>

                {/* 쿠폰 설명 */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        fontSize: "0.8rem",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        "-webkit-line-clamp": 2,
                        "-webkit-box-orient": "vertical",
                        overflow: "hidden",
                    }}
                >
                    {coupon.description}
                </Typography>

                {/* 할인 정보 */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LocalOffer sx={{ color: "primary.main", mr: 1, fontSize: "1.2rem" }} />
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "primary.main",
                            mr: 1,
                            fontSize: "1.8rem",
                        }}
                    >
                        {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `${coupon.discountValue.toLocaleString()}원`}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                        할인
                    </Typography>
                </Box>

                {/* 사용 조건 */}
                <Box sx={{ mt: "auto" }}>
                    {coupon.minOrderAmount && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "0.75rem" }}>
                            📦 {coupon.minOrderAmount.toLocaleString()}원 이상 구매시
                        </Typography>
                    )}

                    {coupon.sellerName && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "0.75rem" }}>
                            🏪 {coupon.sellerName} 전용
                        </Typography>
                    )}

                    {remainingCount !== null && (
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 2,
                                fontSize: "0.75rem",
                                color: remainingCount < 10 ? "error.main" : "text.secondary",
                                fontWeight: 500,
                            }}
                        >
                        </Typography>
                    )}

                    {/* 발급 버튼 */}
                    <Button
                        variant={isIssued ? "outlined" : "contained"}
                        fullWidth
                        disabled={isIssued || (remainingCount !== null && remainingCount <= 0)}
                        onClick={() => onIssue(coupon.id)}
                        sx={{
                            height: 48,
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            borderRadius: 2,
                            backgroundColor: isIssued ? "transparent" : "primary.main",
                            color: isIssued ? "success.main" : "white",
                            borderColor: isIssued ? "success.main" : "primary.main",
                            "&:hover": {
                                backgroundColor: isIssued ? "transparent" : "primary.dark",
                                transform: "none", // 버튼 hover시 transform 제거
                            },
                            "&:disabled": {
                                backgroundColor: "transparent",
                                color: remainingCount === 0 ? "text.disabled" : "success.main",
                                borderColor: remainingCount === 0 ? "text.disabled" : "success.main",
                            },
                        }}
                    >
                        {isIssued ? (
                            <>
                                <CheckCircle sx={{ mr: 1, fontSize: "1.1rem" }} />
                                발급 완료
                            </>
                        ) : remainingCount === 0 ? (
                            "발급 마감"
                        ) : (
                            "쿠폰 발급받기"
                        )}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCouponCard;