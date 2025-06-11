// src/components/product/ProductDetail/RelatedProducts.tsx
// 관련 상품 추천 섹션

import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
} from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface RelatedProductsProps {
    products: RelatedProduct[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <Box sx={{ mt: 6, py: 4 }}>
            <Typography
                variant="h2"
                sx={{
                    mb: 4,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#1b150e",
                }}
            >
                추천 상품
            </Typography>

            {/* 리뷰 배경과 동일한 너비, 카드들이 전체 너비를 꽉 채움 */}
            <Box sx={{ width: "1376px" }}>
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid
                            key={product.id}
                            size={{
                                xs: 12 / products.length, // 모든 상품이 한 줄에 균등하게 배치
                                sm: 12 / Math.min(products.length, 4), // 작은 화면에서는 최대 4개
                                md: 12 / Math.min(products.length, 5), // 중간 화면에서는 최대 5개
                                lg: 12 / products.length, // 큰 화면에서는 모든 상품 표시
                            }}
                        >
                            <Card
                                sx={{
                                    position: "relative",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    height: "100%",
                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        transform: "translateY(-2px)",
                                    },
                                }}
                                onClick={() => console.log(`상품 ${product.id} 클릭`)}
                            >
                                {/* 하트 아이콘 - 별도 버튼으로 분리 */}
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 6,
                                        right: 6,
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        zIndex: 2,
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,1)",
                                            color: "#e89830",
                                        },
                                        width: 28,
                                        height: 28,
                                    }}
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 카드 클릭 이벤트 방지
                                        console.log(`상품 ${product.id} 찜하기`);
                                    }}
                                >
                                    <FavoriteBorder fontSize="small" />
                                </IconButton>

                                {/* 상품 이미지 - 정사각형 비율 유지 */}
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        aspectRatio: "1/1", // 정사각형 비율
                                        objectFit: "cover",
                                        backgroundColor: "#f5f5f5",
                                        width: "100%",
                                    }}
                                />

                                {/* 상품 정보 */}
                                <CardContent sx={{ p: 1.5 }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "0.8rem",
                                            mb: 0.5,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            color: "#1b150e",
                                            "&:hover": {
                                                color: "#e89830",
                                            },
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#e89830",
                                            fontWeight: 700,
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        {product.price.toLocaleString()}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default RelatedProducts;