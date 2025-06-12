// src/components/product/ProductGrid.tsx

import React from "react";
import { Grid, Box, Pagination, Button, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ProductCard from "./ProductCard";
import { Product } from "@/components/ProductList/Product.ts";

interface ProductGridProps {
    products: Product[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onFavoriteToggle?: (productId: string) => void;
    onLoadMore?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
                                                     products,
                                                     currentPage,
                                                     totalPages,
                                                     onPageChange,
                                                     onFavoriteToggle,
                                                     onLoadMore,
                                                 }) => {
    const theme = useTheme();

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
        // 페이지 변경 시 스크롤을 맨 위로
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Box>
            {/* 상품 그리드 */}
            <Grid container spacing={3} sx={{ mb: 5 }}>
                {products.map((product) => (
                    <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={product.id}>
                        <ProductCard
                            product={product}
                            onFavoriteToggle={onFavoriteToggle}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* 빈 상품일 경우 */}
            {products.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 8,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            mb: 1,
                        }}
                    >
                        조건에 맞는 상품이 없습니다
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            opacity: 0.7,
                        }}
                    >
                        다른 필터 조건을 시도해보세요
                    </Typography>
                </Box>
            )}

            {/* 페이지네이션 */}
            {products.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="medium"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: theme.palette.text.primary,
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    color: theme.palette.primary.main,
                                },
                                "&.Mui-selected": {
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    "&:hover": {
                                        backgroundColor: theme.palette.primary.dark,
                                    },
                                },
                            },
                            "& .MuiPaginationItem-ellipsis": {
                                color: theme.palette.text.secondary,
                            },
                        }}
                    />

                    {/* 더보기 버튼 (옵션) */}
                    {onLoadMore && currentPage < totalPages && (
                        <Button
                            onClick={onLoadMore}
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                px: 3,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "0.875rem",
                                fontWeight: 500,
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            더보기
                        </Button>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ProductGrid;