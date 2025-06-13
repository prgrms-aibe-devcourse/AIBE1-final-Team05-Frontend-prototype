"use client"

import type React from "react"
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material"
import { LocalOffer as CouponIcon } from "@mui/icons-material"
import type { Coupon } from "./types/cart.types"

interface CouponSelectorProps {
    availableCoupons: Coupon[]
    selectedCoupon: string
    onCouponSelect: (couponId: string) => void
    isCouponApplicable: (coupon: Coupon) => boolean
    discountAmount: number
}

const CouponSelector: React.FC<CouponSelectorProps> = ({
                                                           availableCoupons,
                                                           selectedCoupon,
                                                           onCouponSelect,
                                                           isCouponApplicable,
                                                           discountAmount,
                                                       }) => {
    return (
        <Card
            sx={{
                border: "1px solid #e7ddd0",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: "#1b150e",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                    }}
                >
                    <CouponIcon sx={{ color: "#e89830" }} />
                    할인쿠폰
                </Typography>
                <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: "#97784e" }}>쿠폰을 선택하세요</InputLabel>
                    <Select
                        value={selectedCoupon}
                        onChange={(e) => onCouponSelect(e.target.value)}
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e7ddd0",
                                borderRadius: "8px",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e89830",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e89830",
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>쿠폰을 선택하지 않음</em>
                        </MenuItem>
                        {availableCoupons.map((coupon) => (
                            <MenuItem key={coupon.id} value={coupon.id} disabled={!isCouponApplicable(coupon)}>
                                <Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {coupon.name}
                                        </Typography>
                                        {!isCouponApplicable(coupon) && (
                                            <Chip label={`최소 $${coupon.minAmount}`} size="small" color="error" variant="outlined" />
                                        )}
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#97784e" }}>
                                        {coupon.description}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedCoupon && (
                    <Alert
                        severity="success"
                        sx={{
                            mt: 2,
                            borderRadius: "8px",
                            "& .MuiAlert-message": {
                                fontSize: "0.875rem",
                            },
                        }}
                    >
                        쿠폰이 적용되었습니다! ${discountAmount.toFixed(2)} 할인
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}

export default CouponSelector
