// src/components/ProductDetail/ProductInfo/ProductBasicInfo.tsx

import React from "react";
import { Box, Typography, Rating, Chip } from "@mui/material";
import { Product } from "../Product";

interface ProductBasicInfoProps {
    product: Product;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ product }) => {
    return (
        <Box>
            {/* 상품명 */}
            <Typography
                variant="h1"
                sx={{
                    mb: 2,
                    color: "text.primary",
                    lineHeight: 1.2,
                }}
            >
                {product.name}
            </Typography>

            {/* 상품 설명 */}
            <Typography
                variant="body1"
                sx={{
                    mb: 3,
                    color: "text.secondary",
                    whiteSpace: "pre-line",
                }}
            >
                {product.description || "신선하고 건강한 수제 간식입니다."}
            </Typography>

            {/* 평점 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{
                        color: "primary.main",
                        "& .MuiRating-iconEmpty": {
                            color: "grey.200",
                        },
                    }}
                />
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                >
                    {product.rating} (리뷰 {product.reviewCount}개)
                </Typography>
            </Box>

            {/* 가격 */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {product.originalPrice && (
                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            textDecoration: "line-through",
                        }}
                    >
                        {product.originalPrice.toLocaleString()}원
                    </Typography>
                )}
                <Typography
                    variant="h2"
                    sx={{
                        color: "primary.main",
                        fontWeight: 700,
                    }}
                >
                    {product.price.toLocaleString()}원
                </Typography>
            </Box>

            {/* 태그 표시 */}
            {product.tags && product.tags.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                    {product.tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderColor: "primary.main",
                                color: "primary.main",
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ProductBasicInfo;