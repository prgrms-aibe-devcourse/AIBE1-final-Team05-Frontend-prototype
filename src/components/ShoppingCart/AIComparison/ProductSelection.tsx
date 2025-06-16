"use client"

import type React from "react"
import { Box, Typography, Card, CardContent, Radio, FormControlLabel, Grid, Chip } from "@mui/material"
import type { CartItem } from "../types/cart.types"

interface ProductSelectionProps {
    products: CartItem[]
    selectedProducts: {
        product1: CartItem | null
        product2: CartItem | null
    }
    onProductSelect: (products: {
        product1: CartItem | null
        product2: CartItem | null
    }) => void
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
                                                               products,
                                                               selectedProducts,
                                                               onProductSelect
                                                           }) => {
    const handleProductSelect = (product: CartItem, position: 'product1' | 'product2') => {
        const newSelection = { ...selectedProducts }

        // 이미 다른 위치에 선택된 제품이면 위치를 바꿈
        if (selectedProducts.product1?.id === product.id) {
            newSelection.product1 = null
        }
        if (selectedProducts.product2?.id === product.id) {
            newSelection.product2 = null
        }

        newSelection[position] = product
        onProductSelect(newSelection)
    }

    const isProductSelected = (productId: string) => {
        return selectedProducts.product1?.id === productId || selectedProducts.product2?.id === productId
    }

    const getProductPosition = (productId: string) => {
        if (selectedProducts.product1?.id === productId) return 'product1'
        if (selectedProducts.product2?.id === productId) return 'product2'
        return null
    }

    if (products.length < 2) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#d32f2f" }}>
                    선택한 카테고리에 제품이 부족합니다
                </Typography>
                <Typography variant="body2" sx={{ color: "#57493a" }}>
                    비교를 위해서는 최소 2개의 제품이 필요합니다. 장바구니에 더 많은 제품을 추가해주세요.
                </Typography>
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, color: "#1b150e", fontWeight: 600 }}>
                비교할 두 개의 제품을 선택해주세요
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: "#57493a" }}>
                각각 '제품 1'과 '제품 2'로 선택하여 상세 비교를 진행합니다.
            </Typography>

            {/* 선택된 제품 요약 */}
            <Box sx={{ mb: 4, p: 2, bgcolor: "#f9f6f2", borderRadius: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            제품 1
                        </Typography>
                        {selectedProducts.product1 ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    component="img"
                                    src={selectedProducts.product1.image}
                                    alt={selectedProducts.product1.name}
                                    sx={{ width: 32, height: 32, borderRadius: 1, objectFit: "cover" }}
                                />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {selectedProducts.product1.name}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#888", fontStyle: "italic" }}>
                                선택되지 않음
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                            제품 2
                        </Typography>
                        {selectedProducts.product2 ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    component="img"
                                    src={selectedProducts.product2.image}
                                    alt={selectedProducts.product2.name}
                                    sx={{ width: 32, height: 32, borderRadius: 1, objectFit: "cover" }}
                                />
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {selectedProducts.product2.name}
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="body2" sx={{ color: "#888", fontStyle: "italic" }}>
                                선택되지 않음
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>

            {/* 제품 목록 */}
            <Grid container spacing={3}>
                {products.map((product) => {
                    const isSelected = isProductSelected(product.id)
                    const position = getProductPosition(product.id)

                    return (
                        <Grid item xs={12} sm={6} key={product.id}>
                            <Card
                                sx={{
                                    border: isSelected
                                        ? "2px solid #e89830"
                                        : "1px solid #e7ddd0",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                    },
                                    position: "relative"
                                }}
                            >
                                {isSelected && (
                                    <Chip
                                        label={position === 'product1' ? '제품 1' : '제품 2'}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            bgcolor: "#e89830",
                                            color: "white",
                                            zIndex: 1
                                        }}
                                    />
                                )}

                                <CardContent>
                                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 2,
                                                objectFit: "cover",
                                                border: "1px solid #e7ddd0"
                                            }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: "#57493a", display: "block", mb: 1 }}>
                                                옵션: {product.option}
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: "#e89830" }}>
                                                {product.price.toLocaleString()}원
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* 선택 라디오 버튼 */}
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={selectedProducts.product1?.id === product.id}
                                                    onChange={() => handleProductSelect(product, 'product1')}
                                                    sx={{ color: "#e89830", "&.Mui-checked": { color: "#e89830" } }}
                                                />
                                            }
                                            label="제품 1로 선택"
                                            sx={{ fontSize: "0.875rem" }}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    checked={selectedProducts.product2?.id === product.id}
                                                    onChange={() => handleProductSelect(product, 'product2')}
                                                    sx={{ color: "#e89830", "&.Mui-checked": { color: "#e89830" } }}
                                                />
                                            }
                                            label="제품 2로 선택"
                                            sx={{ fontSize: "0.875rem" }}
                                        />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default ProductSelection