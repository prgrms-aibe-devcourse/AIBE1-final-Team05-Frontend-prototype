// src/components/ProductDetail/ProductInfo/ProductPurchaseOptions.tsx
import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    FormControl,
    Select,
    MenuItem,
    IconButton,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { Product } from "../Product";
interface ProductPurchaseOptionsProps {
    product: Product;
}

const ProductPurchaseOptions: React.FC<ProductPurchaseOptionsProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [packaging, setPackaging] = useState("기본 포장");

    const handleAddToCart = () => {
        console.log("장바구니 추가:", { quantity, packaging });
    };

    const handleBuyNow = () => {
        console.log("바로 구매:", { quantity, packaging });
    };

    const handleReportProduct = () => {
        console.log("상품 신고하기");
    };

    return (
        <Box sx={{ width: "100%" }}>
            {/* 수량/포장 선택 */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
                {/* 찜 버튼 자리만큼 공백 */}
                <Box sx={{ width: 48 }}></Box>

                {/* 수량 선택 */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            color: "#1b150e",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                        }}
                    >
                        수량
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            displayEmpty
                            sx={{
                                height: 48,
                                backgroundColor: "#fcfaf8",
                                "& .MuiSelect-select": {
                                    height: "48px",
                                    padding: "0 14px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e7ddd0",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e89830",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e89830",
                                },
                            }}
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}개
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* 포장 선택 */}
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            color: "#1b150e",
                            fontWeight: 500,
                            fontSize: "0.875rem",
                        }}
                    >
                        포장 방식
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={packaging}
                            onChange={(e) => setPackaging(e.target.value)}
                            displayEmpty
                            sx={{
                                height: 48,
                                backgroundColor: "#fcfaf8",
                                "& .MuiSelect-select": {
                                    height: "48px",
                                    padding: "0 14px",
                                    display: "flex",
                                    alignItems: "center",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e7ddd0",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e89830",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#e89830",
                                },
                            }}
                        >
                            <MenuItem value="기본 포장">기본 포장</MenuItem>
                            <MenuItem value="선물 포장">선물 포장</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* 구매 버튼들 */}
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", mb: 2 }}>
                <IconButton
                    sx={{
                        width: 48,
                        height: 48,
                        border: "1px solid #e7ddd0",
                        backgroundColor: "#fcfaf8",
                        "&:hover": {
                            borderColor: "#e89830",
                            backgroundColor: "#f3eee7",
                        },
                    }}
                >
                    <FavoriteBorder sx={{ color: "#e89830" }} />
                </IconButton>

                <Button
                    variant="outlined"
                    startIcon={<AddShoppingCart />}
                    onClick={handleAddToCart}
                    sx={{
                        flex: 1,
                        height: 48,
                        color: "#1b150e",
                        borderColor: "#e7ddd0",
                        backgroundColor: "#f3eee7",
                        "&:hover": {
                            borderColor: "#e89830",
                            backgroundColor: "#e8c69b",
                            color: "#1b150e",
                        },
                    }}
                >
                    장바구니
                </Button>

                <Button
                    variant="contained"
                    onClick={handleBuyNow}
                    sx={{
                        flex: 1,
                        height: 48,
                        backgroundColor: "#e89830",
                        "&:hover": {
                            backgroundColor: "#d18720",
                        },
                    }}
                >
                    바로 구매
                </Button>
            </Box>

            {/* 신고 버튼 */}
            <Button
                variant="outlined"
                fullWidth
                onClick={handleReportProduct}
                sx={{
                    height: 48,
                    color: "#97784e",
                    borderColor: "#e7ddd0",
                    backgroundColor: "#fcfaf8",
                    "&:hover": {
                        borderColor: "#e89830",
                        backgroundColor: "#f3eee7",
                        color: "#e89830",
                    },
                }}
            >
                상품 신고하기
            </Button>
        </Box>
    );
};

export default ProductPurchaseOptions;