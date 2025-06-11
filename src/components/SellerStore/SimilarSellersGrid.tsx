import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid
} from '@mui/material';

// SimilarSeller 타입 정의 (별도 파일에서 import하는 대신 여기서 정의)
export interface SimilarSeller {
    id: string;
    name: string;
    description: string;
    profileImage: string;
}

interface SimilarSellersGridProps {
    sellers: SimilarSeller[];
    onSellerClick: (sellerId: string) => void;
}

const SimilarSellersGrid: React.FC<SimilarSellersGridProps> = ({
                                                                   sellers,
                                                                   onSellerClick,
                                                               }) => {
    const handleSellerClick = (sellerId: string) => {
        onSellerClick(sellerId);
        window.scrollTo(0, 0);
    };

    return (
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {sellers.map((seller) => (
                <Grid
                    key={seller.id}
                    size={{ xs: 6, sm: 6, md: 3, lg: 2.4 }}
                >
                    <Card
                        sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                boxShadow: 4,
                                transform: 'translateY(-2px)',
                            },
                            border: 1,
                            borderColor: 'grey.200',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onClick={() => handleSellerClick(seller.id)}
                    >
                        <CardMedia
                            component="div"
                            sx={{
                                height: 0,
                                paddingTop: '100%', // 1:1 aspect ratio
                                backgroundImage: `url(${seller.profileImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'transform 0.3s ease',
                                borderRadius: 1,
                                m: 1,
                                mb: 0,
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                        />

                        <CardContent
                            sx={{
                                p: { xs: 1.5, sm: 2 },
                                textAlign: 'center',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="body1"
                                component="h3"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    mb: 0.5,
                                    transition: 'color 0.3s ease',
                                    '&:hover': {
                                        color: '#e37d11',
                                    },
                                }}
                            >
                                {seller.name}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: 1.2,
                                }}
                            >
                                {seller.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default SimilarSellersGrid;