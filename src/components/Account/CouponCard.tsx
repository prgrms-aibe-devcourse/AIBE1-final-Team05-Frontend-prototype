"use client"

import type React from "react"
import { Card, CardContent, Typography, Box, Chip, Button } from "@mui/material"
import type { Coupon } from "./index"

interface CouponCardProps {
    coupon: Coupon
    onUse?: (couponId: string) => void
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onUse }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "#4CAF50"
            case "expiring":
                return "#FF9800"
            case "expired":
            case "used":
                return "#9E9E9E"
            default:
                return "#9E9E9E"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "available":
                return "사용 가능"
            case "expiring":
                return "만료 임박"
            case "expired":
                return "기간 만료"
            case "used":
                return "사용 완료"
            default:
                return "알 수 없음"
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")} 까지`
    }

    const isDisabled = coupon.status === "expired" || coupon.status === "used"

    return (
        <Card
            sx={{
                height: "100%",
                opacity: isDisabled ? 0.6 : 1,
                border: coupon.isExpiringSoon ? "2px solid #FF9800" : "1px solid #e0e0e0",
                "&:hover": {
                    boxShadow: isDisabled ? 1 : 3,
                },
            }}
        >
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(coupon.expiryDate)}
                    </Typography>
                    <Chip
                        label={getStatusText(coupon.status)}
                        size="small"
                        sx={{
                            backgroundColor: getStatusColor(coupon.status),
                            color: "white",
                            fontWeight: 500,
                        }}
                    />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {coupon.title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: "auto" }}>
                        {coupon.status === "available" ? "기간 만료" : "기간 만료"}
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: getStatusColor(coupon.status),
                            mr: 1,
                        }}
                    >
                        {coupon.discountType === "percentage"
                            ? `${coupon.discountValue}%`
                            : `${coupon.discountValue.toLocaleString()}원`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        할인
                    </Typography>
                </Box>

                <Box sx={{ mt: "auto" }}>
                    {coupon.minOrderAmount && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {coupon.minOrderAmount.toLocaleString()}원 이상 구매시
                        </Typography>
                    )}

                    <Button
                        variant="outlined"
                        fullWidth
                        disabled={isDisabled}
                        onClick={() => onUse?.(coupon.id)}
                        sx={{
                            borderColor: isDisabled ? "#e0e0e0" : "#FDBF60",
                            color: isDisabled ? "#9e9e9e" : "#4A2C2A",
                            "&:hover": {
                                borderColor: isDisabled ? "#e0e0e0" : "#FDB94E",
                                backgroundColor: isDisabled ? "transparent" : "#FFF3E0",
                            },
                        }}
                    >
                        적용 가능한 판매자 보기
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CouponCard