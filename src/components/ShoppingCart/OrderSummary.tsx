"use client"

import type React from "react"
import { Box, Button, Divider, Paper, Typography } from "@mui/material"
import type { Coupon } from "./types/cart.types"

interface OrderSummaryProps {
    subtotal: number
    discount: number
    total: number
    appliedCoupon: Coupon | null
    formatPrice: (price: number) => string
    onCheckout: () => void
    onContinueShopping: () => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                       subtotal,
                                                       discount,
                                                       total,
                                                       appliedCoupon,
                                                       formatPrice,
                                                       onCheckout,
                                                       onContinueShopping,
                                                   }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 2,
            }}
        >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                주문 요약
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                        상품 금액
                    </Typography>
                    <Typography variant="body2">{formatPrice(subtotal)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                        배송비
                    </Typography>
                    <Typography variant="body2">다음 단계에서 계산</Typography>
                </Box>

                {discount > 0 && appliedCoupon && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                            할인 ({appliedCoupon.name})
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#e89830" }}>
                            -{formatPrice(discount)}
                        </Typography>
                    </Box>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    총 결제 금액
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {formatPrice(total)}
                </Typography>
            </Box>

            <Button
                fullWidth
                variant="contained"
                onClick={onCheckout}
                sx={{
                    bgcolor: "#e89830",
                    "&:hover": {
                        bgcolor: "#d18727",
                    },
                    mb: 1.5,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                }}
            >
                결제하기
            </Button>

            <Button
                fullWidth
                variant="outlined"
                onClick={onContinueShopping}
                sx={{
                    borderColor: "#ddd",
                    color: "#666",
                    "&:hover": {
                        borderColor: "#ccc",
                        bgcolor: "#f9f9f9",
                    },
                    py: 1.5,
                }}
            >
                쇼핑 계속하기
            </Button>
        </Paper>
    )
}

export default OrderSummary
