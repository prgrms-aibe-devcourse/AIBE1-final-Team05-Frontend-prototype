"use client"

import type React from "react"
import {
    Card,
    CardContent,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Alert
} from "@mui/material"
import type { Coupon } from "@/components/ShoppingCart"

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
                                                           discountAmount
                                                       }) => {
    return (
        <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: 32 }}>
                <Typography
                    variant="h5"
                    component="h2"
                    style={{ marginBottom: 32, fontWeight: 600, color: "#1b150e" }}
                >
                    쿠폰
                </Typography>

                <Box style={{ marginBottom: 32 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="coupon-label" shrink sx={{ color: "#97784e" }}>
                            쿠폰을 선택하세요
                        </InputLabel>
                        <Select
                            labelId="coupon-label"
                            label="쿠폰을 선택하세요"
                            value={selectedCoupon}
                            onChange={(e) => onCouponSelect(e.target.value)}
                            displayEmpty
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <em style={{ color: "#97784e" }}>쿠폰을 선택하세요</em>
                                }
                                const coupon = availableCoupons.find((c) => c.id === selected)
                                return coupon ? coupon.name : selected
                            }}
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
                                <MenuItem
                                    key={coupon.id}
                                    value={coupon.id}
                                    disabled={!isCouponApplicable(coupon)}
                                >
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
                                                <Chip
                                                    label={`최소 $${coupon.minAmount}`}
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                />
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
                </Box>
            </CardContent>
        </Card>
    )
}

export default CouponSelector
