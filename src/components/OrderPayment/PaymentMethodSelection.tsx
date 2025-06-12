"use client"

import type React from "react"
import { Card, CardContent, Typography, Box, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material"
import { CreditCard } from "@mui/icons-material"

interface PaymentMethodSelectionProps {
    paymentMethod: string
    onPaymentMethodChange: (method: string) => void
}

const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({ paymentMethod, onPaymentMethodChange }) => {
    return (
        <Card style={{ marginBottom: 32, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardContent style={{ padding: 32 }}>
                <Typography variant="h5" component="h2" style={{ marginBottom: 32, fontWeight: 600, color: "#1b150e" }}>
                    Payment Method
                </Typography>
                <Box style={{ marginBottom: 32 }}>
                    <RadioGroup
                        row
                        value={paymentMethod}
                        onChange={(e) => onPaymentMethodChange(e.target.value)}
                        style={{ gap: 16 }}
                    >
                        <Paper
                            elevation={0}
                            style={{
                                border: "1px solid #e7ddd0",
                                borderRadius: 8,
                                paddingLeft: 24,
                                paddingRight: 24,
                                paddingTop: 16,
                                paddingBottom: 16,
                                backgroundColor: paymentMethod === "toss" ? "#fff8f0" : "transparent",
                                borderColor: paymentMethod === "toss" ? "#e89830" : "#e7ddd0",
                                borderWidth: paymentMethod === "toss" ? 2 : 1,
                                transition: "all 0.2s ease-in-out",
                                flex: 1,
                            }}
                        >
                            <FormControlLabel
                                value="toss"
                                control={<Radio style={{ display: "none" }} />}
                                label={
                                    <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <Box
                                            component="img"
                                            src="/placeholder.svg?height=20&width=60"
                                            alt="Toss Payments"
                                            style={{ height: 20 }}
                                        />
                                        <Typography style={{ fontWeight: 500 }}>Toss Pay</Typography>
                                    </Box>
                                }
                                style={{ margin: 0, width: "100%", justifyContent: "center" }}
                            />
                        </Paper>
                        <Paper
                            elevation={0}
                            style={{
                                border: "1px solid #e7ddd0",
                                borderRadius: 8,
                                paddingLeft: 24,
                                paddingRight: 24,
                                paddingTop: 16,
                                paddingBottom: 16,
                                backgroundColor: paymentMethod === "card" ? "#fff8f0" : "transparent",
                                borderColor: paymentMethod === "card" ? "#e89830" : "#e7ddd0",
                                borderWidth: paymentMethod === "card" ? 2 : 1,
                                transition: "all 0.2s ease-in-out",
                                flex: 1,
                            }}
                        >
                            <FormControlLabel
                                value="card"
                                control={<Radio style={{ display: "none" }} />}
                                label={
                                    <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <CreditCard fontSize="small" />
                                        <Typography style={{ fontWeight: 500 }}>Credit Card</Typography>
                                    </Box>
                                }
                                style={{ margin: 0, width: "100%", justifyContent: "center" }}
                            />
                        </Paper>
                    </RadioGroup>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PaymentMethodSelection