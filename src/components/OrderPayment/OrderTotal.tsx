"use client"

import type React from "react"
import { Paper, Typography, Box, Divider } from "@mui/material"

interface OrderTotalProps {
    subtotal: number
    shipping: number
    total: number
}

const OrderTotal: React.FC<OrderTotalProps> = ({ subtotal, shipping, total }) => {
    return (
        <Paper style={{ padding: 24, backgroundColor: "#fcfaf8", border: "1px solid #f3eee7", borderRadius: 8 }}>
            <Typography variant="h6" style={{ marginBottom: 24, fontWeight: 600 }}>
                Order Total
            </Typography>
            <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
                    Subtotal
                </Typography>
                <Typography style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Typography color="text.secondary" style={{ fontSize: "0.875rem" }}>
                    배송
                </Typography>
                <Typography style={{ fontWeight: 500 }}>${shipping.toFixed(2)}</Typography>
            </Box>
            <Divider style={{ marginTop: 16, marginBottom: 16, borderColor: "#e7ddd0" }} />
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Total
                </Typography>
                <Typography variant="h6" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                    ${total.toFixed(2)}
                </Typography>
            </Box>
        </Paper>
    )
}

export default OrderTotal
