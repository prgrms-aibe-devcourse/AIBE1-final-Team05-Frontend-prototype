"use client"

import type React from "react"
import { Button, Typography, Paper } from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

interface EmptyCartProps {
    onContinueShopping: () => void
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #f0f0f0",
                borderRadius: 2,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "250px",
            }}
        >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                장바구니가 비어있습니다
            </Typography>
            <Typography variant="body2" sx={{ color: "#888", mb: 3, textAlign: "center" }}>
                원하는 상품을 장바구니에 담아보세요
            </Typography>
            <Button
                variant="contained"
                onClick={onContinueShopping}
                sx={{
                    bgcolor: "#e89830",
                    "&:hover": {
                        bgcolor: "#d18727",
                    },
                    px: 3,
                }}
            >
                쇼핑 계속하기
            </Button>
        </Paper>
    )
}

export default EmptyCart
