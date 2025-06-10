import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button,
    Chip,
} from '@mui/material';
import { useState } from 'react';
import { ProductCardProps } from '../types';

const ProductCard = ({ product, onClick }: ProductCardProps) => {
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        if (onClick) {
            onClick(product);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} className="material-icons" style={{ fontSize: '16px', color: '#ffc107' }}>
          star
        </span>
            );
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half" className="material-icons" style={{ fontSize: '16px', color: '#ffc107' }}>
          star_half
        </span>
            );
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="material-icons" style={{ fontSize: '16px', color: '#ffc107' }}>
          star_border
        </span>
            );
        }

        return stars;
    };

    const discountRate = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Card
            sx={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                },
            }}
            onClick={handleCardClick}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                />

                {/* 찜하기 버튼 */}
                <IconButton
                    onClick={handleFavoriteClick}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(4px)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.95)',
                        },
                    }}
                >
          <span
              className="material-icons"
              style={{
                  fontSize: '20px',
                  color: isFavorite ? '#f44336' : '#e89830'
              }}
          >
            {isFavorite ? 'favorite' : 'favorite_border'}
          </span>
                </IconButton>

                {/* 뱃지들 */}
                <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 0.5 }}>
                    {product.isNew && (
                        <Chip
                            label="NEW"
                            size="small"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                    {product.isBestSeller && (
                        <Chip
                            label="BEST"
                            size="small"
                            sx={{
                                backgroundColor: '#48bb78',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                    {discountRate > 0 && (
                        <Chip
                            label={`${discountRate}%`}
                            size="small"
                            sx={{
                                backgroundColor: '#f56565',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                    )}
                </Box>
            </Box>

            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
                {/* 브랜드 */}
                {product.brand && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            mb: 0.5,
                        }}
                    >
                        {product.brand}
                    </Typography>
                )}

                {/* 상품명 */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.6rem',
                    }}
                >
                    {product.name}
                </Typography>

                {/* 가격 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {product.originalPrice && (
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                                fontSize: '0.8rem',
                            }}
                        >
                            {product.originalPrice.toLocaleString()}원
                        </Typography>
                    )}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            fontSize: '1.125rem',
                        }}
                    >
                        {product.price.toLocaleString()}원
                    </Typography>
                </Box>

                {/* 별점 및 리뷰 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderStars(product.rating)}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', ml: 0.5 }}>
                        ({product.reviewCount})
                    </Typography>
                </Box>

                {/* 장바구니 버튼 */}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 'auto',
                        backgroundColor: 'grey.100',
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                            boxShadow: 'none',
                        },
                    }}
                >
                    장바구니 담기
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;