"use client"

import type React from "react"
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import type { RecommendedProduct } from "./types/cart.types"

interface RecommendedProductsProps {
    products: RecommendedProduct[]
    onAddToCart?: (productId: string) => void
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products, onAddToCart }) => {
    return (
        <Box sx={{ mt: 8 }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 4,
                    fontWeight: "bold",
                    color: "#1b150e",
                    fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                }}
            >
                함께 구매하면 좋은 제품
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card
                            sx={{
                                border: "1px solid #e7ddd0",
                                borderRadius: "12px",
                                overflow: "hidden",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 8px 25px rgba(232, 152, 48, 0.15)",
                                    borderColor: "#e89830",
                                },
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ objectFit: "cover" }}
                                />
                                <IconButton
                                    onClick={() => onAddToCart && onAddToCart(product.id)}
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        right: 12,
                                        bgcolor: "rgba(255,255,255,0.9)",
                                        color: "#e89830",
                                        backdropFilter: "blur(4px)",
                                        width: 36,
                                        height: 36,
                                        opacity: 0,
                                        transition: "all 0.3s ease",
                                        ".MuiCard-root:hover &": {
                                            opacity: 1,
                                        },
                                        "&:hover": {
                                            bgcolor: "#e89830",
                                            color: "white",
                                            transform: "scale(1.1)",
                                        },
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <CardContent sx={{ p: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: "#1b150e",
                                        mb: 1,
                                        lineHeight: 1.4,
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        minHeight: "2.8em",
                                    }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#e89830",
                                        fontSize: "1rem",
                                    }}
                                >
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default RecommendedProducts
