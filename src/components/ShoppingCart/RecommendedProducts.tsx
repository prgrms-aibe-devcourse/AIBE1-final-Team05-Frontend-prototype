"use client"

import type React from "react"
import { Box, Grid, Paper, Typography } from "@mui/material"
import type { RecommendedProduct } from "./types/cart.types"

interface RecommendedProductsProps {
    products: RecommendedProduct[]
    formatPrice: (price: number) => string
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products, formatPrice }) => {
    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid #f0f0f0",
                            borderRadius: 2,
                            overflow: "hidden",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                transform: "translateY(-4px)",
                            },
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                                width: "100%",
                                height: 200,
                                objectFit: "cover",
                            }}
                        />
                        <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    mb: 1,
                                    flexGrow: 1,
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: "#e89830", fontWeight: 600 }}>
                                {formatPrice(product.price)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}

export default RecommendedProducts
