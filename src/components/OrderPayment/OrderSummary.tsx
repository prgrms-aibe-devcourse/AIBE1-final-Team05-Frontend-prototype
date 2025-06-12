"use client"

import type React from "react"
import { Card, CardContent, Typography, Paper, Box, Avatar } from "@mui/material"

interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    image: string
}

interface OrderSummaryProps {
    orderItems: OrderItem[]
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems }) => {
    return (
        <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent>
                <Typography variant="h5" component="h2" style={{ marginBottom: 24, fontWeight: 600 }}>
                    Order Summary
                </Typography>
                {orderItems.map((item) => (
                    <Paper key={item.id} style={{ padding: 16, marginBottom: 16, border: "1px solid #f3eee7" }}>
                        <Box style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <Avatar src={item.image} style={{ width: 64, height: 64, borderRadius: 8 }} variant="rounded" />
                            <Box style={{ flexGrow: 1 }}>
                                <Typography variant="body1" style={{ fontWeight: 500 }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {item.quantity}
                                </Typography>
                            </Box>
                            <Typography variant="body1" style={{ fontWeight: 600 }}>
                                ${item.price.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                ))}
            </CardContent>
        </Card>
    )
}

export default OrderSummary
