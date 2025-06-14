"use client"

import type React from "react"
import { Box, Button, TextField, Typography, Paper } from "@mui/material"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"

interface CouponInputProps {
    couponCode: string
    onCouponChange: (code: string) => void
    onApplyCoupon: () => void
}

const CouponInput: React.FC<CouponInputProps> = ({ couponCode, onCouponChange, onApplyCoupon }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onApplyCoupon()
    }

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 2,
                mb: 3,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocalOfferIcon sx={{ color: "#e89830", mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    할인쿠폰
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    gap: 1,
                }}
            >
                <TextField
                    size="small"
                    placeholder="쿠폰을 선택하세요"
                    value={couponCode}
                    onChange={(e) => onCouponChange(e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1,
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: "#e89830",
                        "&:hover": {
                            bgcolor: "#d18727",
                        },
                        px: 3,
                        whiteSpace: "nowrap",
                    }}
                >
                    적용
                </Button>
            </Box>
        </Paper>
    )
}

export default CouponInput
