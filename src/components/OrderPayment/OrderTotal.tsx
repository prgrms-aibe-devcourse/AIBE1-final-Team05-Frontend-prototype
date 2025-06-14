"use client"

import type React from "react"
import { Paper, Typography, Box, Divider } from "@mui/material"

interface OrderTotalProps {
    subtotal: number
    shipping: number
    discount: number
    total: number
}

const OrderTotal: React.FC<OrderTotalProps> = ({ subtotal, shipping, discount, total }) => {
    return (
        <Paper
            style={{
                padding: 24,
                backgroundColor: "#fcfaf8",
                border: "1px solid #f3eee7",
                borderRadius: 8,
            }}
        >
            <Typography variant="h6" style={{ marginBottom: 24, fontWeight: 600 }}>
                총 금액
            </Typography>

            <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
                    소계
                </Typography>
                <Typography style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
                    배송비
                </Typography>
                <Typography style={{ fontWeight: 500 }}>${shipping.toFixed(2)}</Typography>
            </Box>

            {discount > 0 && (
                <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                    <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
                        할인
                    </Typography>
                    <Typography style={{ fontWeight: 500, color: "#d32f2f" }}>
                        -${discount.toFixed(2)}
                    </Typography>
                </Box>
            )}

            <Divider
                style={{ marginTop: 16, marginBottom: 16, borderColor: "#e7ddd0" }}
            />

            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                    총액
                </Typography>
                <Typography
                    variant="h6"
                    style={{ fontWeight: 700, fontSize: "1.25rem" }}
                >
                    ${total.toFixed(2)}
                </Typography>
            </Box>
        </Paper>
    )
}

export default OrderTotal
