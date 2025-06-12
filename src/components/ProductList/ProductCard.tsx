// src/components/product/ProductCard.tsx

import React, { useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Chip,
    Rating,
    alpha,
    useTheme,
} from "@mui/material";
import {
    FavoriteBorder as FavoriteIcon,
    Favorite as FilledFavoriteIcon,
    LocalShipping as ShippingIcon,
    Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { Product } from "@/components/ProductList/Product.ts";

interface ProductCardProps {
    product: Product;
    onFavoriteToggle?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     product,
                                                     onFavoriteToggle,
                                                 }) => {
    const theme = useTheme();
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
    const [isHovered, setIsHovered] = useState(false);

    const handleFavoriteClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsFavorite(!isFavorite);
        onFavoriteToggle?.(product.id);
    };

    const formatPrice = (price: number): string => {
        return `₩${price.toLocaleString()}`;
    };

    const renderStars = (rating: number) => {
        return (
            <Rating
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                sx={{
                    color: theme.palette.primary.main, // 주황색으로 변경
                    "& .MuiRating-iconEmpty": {
                        color: theme.palette.grey[200],
                    },
                }}
            />
        );
    };

    const getShippingInfo = () => {
        if (product.isOutOfStock && product.restockDate) {
            return {
                icon: <ScheduleIcon sx={{ fontSize: 14 }} />,
                text: product.restockDate,
                color: theme.palette.primary.dark, // 진한 주황색
            };
        }
        return {
            icon: <ShippingIcon sx={{ fontSize: 14 }} />,
            text: product.shippingInfo,
            color: theme.palette.primary.main, // 주황색
        };
    };

    const shippingInfo = getShippingInfo();

    return (
        <Card
            sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.07)",
                },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 이미지 영역 */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="192"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        opacity: product.isOutOfStock ? 0.5 : 1,
                    }}
                />

                {/* 찜하기 버튼 */}
                <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: "blur(4px)",
                        color: isFavorite ? theme.palette.primary.main : theme.palette.text.secondary,
                        width: 32,
                        height: 32,
                        "&:hover": {
                            backgroundColor: alpha(theme.palette.background.paper, 0.9),
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {isFavorite ? (
                        <FilledFavoriteIcon sx={{ fontSize: 18 }} />
                    ) : (
                        <FavoriteIcon sx={{ fontSize: 18 }} />
                    )}
                </IconButton>

                {/* 배지 */}
                {product.isNew && (
                    <Chip
                        label="NEW"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            height: 24,
                        }}
                    />
                )}

                {product.isBestseller && (
                    <Chip
                        label="베스트셀러"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.text.primary,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            height: 24,
                        }}
                    />
                )}

                {/* 품절 오버레이 */}
                {product.isOutOfStock && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.3),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Chip
                            label="품절"
                            sx={{
                                backgroundColor: alpha(theme.palette.secondary.main, 0.8),
                                color: theme.palette.background.paper,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* 컨텐츠 영역 */}
            <CardContent
                sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: "0.875rem",
                        mb: 0.5,
                        height: 40,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                    }}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.75rem",
                        mb: 1,
                    }}
                >
                    {product.brand}
                </Typography>

                {/* 평점 */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {renderStars(product.rating)}
                    <Typography
                        variant="caption"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "0.75rem",
                            ml: 1,
                        }}
                    >
                        ({product.reviewCount})
                    </Typography>
                </Box>

                {/* 가격 */}
                <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: product.isOutOfStock ? theme.palette.text.primary : theme.palette.primary.main,
                            fontSize: "1.125rem",
                            mr: 1,
                        }}
                    >
                        {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: "0.875rem",
                                textDecoration: "line-through",
                            }}
                        >
                            {formatPrice(product.originalPrice)}
                        </Typography>
                    )}
                </Box>

                {/* 배송 정보 */}
                {(product.shippingInfo || product.restockDate) && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: "auto",
                        }}
                    >
                        <Box sx={{ color: shippingInfo.color, mr: 0.5 }}>
                            {shippingInfo.icon}
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: shippingInfo.color,
                                fontSize: "0.75rem",
                                fontWeight: 500,
                            }}
                        >
                            {shippingInfo.text}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;