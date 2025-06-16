"use client"

import type React from "react"
import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material"
import PetsIcon from "@mui/icons-material/Pets"
import type { CartItem } from "../types/cart.types"

interface CategorySelectionProps {
    selectedCategory: "강아지" | "고양이" | null
    onCategorySelect: (category: "강아지" | "고양이") => void
    cartItems: CartItem[]
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
                                                                 selectedCategory,
                                                                 onCategorySelect,
                                                                 cartItems
                                                             }) => {
    // 카테고리별 제품 개수 계산
    const dogProducts = cartItems.filter(item => item.petType === "강아지")
    const catProducts = cartItems.filter(item => item.petType === "고양이")

    const categories = [
        {
            type: "강아지" as const,
            icon: "🐕",
            count: dogProducts.length,
            description: "강아지용 제품 비교",
            color: "#e89830"
        },
        {
            type: "고양이" as const,
            icon: "🐱",
            count: catProducts.length,
            description: "고양이용 제품 비교",
            color: "#6b5b95"
        }
    ]

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, color: "#1b150e", fontWeight: 600 }}>
                비교할 제품의 카테고리를 선택해주세요
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: "#57493a" }}>
                장바구니에 담긴 제품 중 같은 카테고리의 제품들을 비교할 수 있습니다.
            </Typography>

            <Grid container spacing={3}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} key={category.type}>
                        <Card
                            sx={{
                                cursor: category.count >= 2 ? "pointer" : "not-allowed",
                                opacity: category.count >= 2 ? 1 : 0.5,
                                border: selectedCategory === category.type
                                    ? `2px solid ${category.color}`
                                    : "1px solid #e7ddd0",
                                transition: "all 0.3s ease",
                                "&:hover": category.count >= 2 ? {
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    transform: "translateY(-2px)"
                                } : {},
                                position: "relative"
                            }}
                            onClick={() => category.count >= 2 && onCategorySelect(category.type)}
                        >
                            <CardContent sx={{ textAlign: "center", p: 3 }}>
                                <Box sx={{ fontSize: "3rem", mb: 2 }}>
                                    {category.icon}
                                </Box>
                                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                    {category.type}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#57493a", mb: 2 }}>
                                    {category.description}
                                </Typography>
                                <Chip
                                    label={`${category.count}개 제품`}
                                    size="small"
                                    color={category.count >= 2 ? "primary" : "default"}
                                    sx={{
                                        bgcolor: category.count >= 2 ? category.color : "#e0e0e0",
                                        color: "white"
                                    }}
                                />
                                {category.count < 2 && (
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "block",
                                            mt: 1,
                                            color: "#d32f2f"
                                        }}
                                    >
                                        비교를 위해 최소 2개 제품이 필요합니다
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedCategory && (
                <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f6f2", borderRadius: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <PetsIcon sx={{ color: "#e89830" }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            선택된 카테고리: {selectedCategory}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#57493a" }}>
                        {selectedCategory === "강아지" ? dogProducts.length : catProducts.length}개의 제품이 비교 가능합니다.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default CategorySelection