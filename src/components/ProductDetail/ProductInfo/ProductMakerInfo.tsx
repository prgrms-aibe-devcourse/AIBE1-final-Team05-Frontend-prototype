// src/components/ProductDetail/ProductInfo/ProductMakerInfo.tsx
import React from "react";
import { Card, CardContent, Box, Avatar, Typography, Button } from "@mui/material";
import { Product } from "../Product";
interface ProductMakerInfoProps {
    product: Product;
}

const ProductMakerInfo: React.FC<ProductMakerInfoProps> = ({ product }) => {
    if (!product.brand) return null;

    return (
        <Card sx={{ backgroundColor: "#f7f3ef", boxShadow: "none" }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 64, height: 64, backgroundColor: "#e89830" }}>
                        {product.brand.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, color: "#1b150e", mb: 0.5 }}
                        >
                            {product.brand}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#97784e" }}>
                            정성을 담아 만드는 수제 간식 전문 브랜드입니다.
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            color: "#e89830",
                            borderColor: "#e89830",
                            "&:hover": {
                                backgroundColor: "#e89830",
                                color: "#ffffff",
                            },
                        }}
                    >
                        1:1 채팅
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductMakerInfo;