"use client"

import type React from "react"
import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material"

interface CartSummaryProps {
    subtotal: number
    discount: number
    total: number
    selectedCouponName?: string
    onCheckout: () => void
    onContinueShopping: () => void
}

const CartSummary: React.FC<CartSummaryProps> = ({
                                                     subtotal,
                                                     discount,
                                                     total,
                                                     selectedCouponName,
                                                     onCheckout,
                                                     onContinueShopping,
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
                        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                    }}
                >
                    Order Summary
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: "#57493a" }}>
                            Subtotal
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "#1b150e" }}>
                            ${subtotal.toFixed(2)}
                        </Typography>
                    </Box>

                    {discount > 0 && selectedCouponName && (
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ color: "#57493a" }}>
                                Discount ({selectedCouponName})
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: "#e89830" }}>
                                -${discount.toFixed(2)}
                            </Typography>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: "#57493a" }}>
                            Shipping
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#1b150e" }}>
                            Calculated at next step
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 1, borderColor: "#e7ddd0" }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#1b150e" }}>
                            Total
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "#1b150e" }}>
                            ${total.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={onCheckout}
                        sx={{
                            bgcolor: "#e89830",
                            color: "white",
                            py: 1.5,
                            fontWeight: "bold",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                            "&:hover": { bgcolor: "#d18727" },
                        }}
                    >
                        결제하기
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        size="large"
                        onClick={onContinueShopping}
                        sx={{
                            borderColor: "#e7ddd0",
                            color: "#57493a",
                            py: 1.5,
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            fontSize: "1rem",
                            fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                            "&:hover": {
                                borderColor: "#e89830",
                                bgcolor: "#f9f6f2",
                                color: "#1b150e",
                            },
                        }}
                    >
                        쇼핑 계속하기
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CartSummary
