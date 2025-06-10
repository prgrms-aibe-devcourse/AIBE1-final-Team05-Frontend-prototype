import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Link,
    Chip,
} from '@mui/material';
import { WorkshopCardProps } from '../types';

const WorkshopCard = ({ workshop, onClick }: WorkshopCardProps) => {
    const handleCardClick = () => {
        if (onClick) {
            onClick(workshop);
        }
    };

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        handleCardClick();
    };

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
            <CardMedia
                component="img"
                height="192"
                image={workshop.image}
                alt={workshop.name}
                sx={{ objectFit: 'cover' }}
            />

            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        lineHeight: 1.3,
                        mb: 1,
                        color: 'text.primary',
                    }}
                >
                    {workshop.name}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        mb: 2,
                    }}
                >
                    {workshop.description}
                </Typography>

                {/* 전문 분야 태그 */}
                {workshop.specialties && workshop.specialties.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {workshop.specialties.slice(0, 3).map((specialty, index) => (
                            <Chip
                                key={index}
                                label={specialty}
                                size="small"
                                variant="outlined"
                                sx={{
                                    fontSize: '0.7rem',
                                    height: '24px',
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* 평점 및 위치 정보 */}
                <Box sx={{ mb: 2 }}>
                    {workshop.rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <span className="material-icons" style={{ fontSize: '16px', color: '#ffc107' }}>
                star
              </span>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                                {workshop.rating} ({workshop.reviewCount}개 리뷰)
                            </Typography>
                        </Box>
                    )}
                    {workshop.location && (
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                            📍 {workshop.location} · {workshop.established}년 설립
                        </Typography>
                    )}
                </Box>

                <Link
                    href="#"
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'primary.main',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            color: 'primary.dark',
                        },
                    }}
                    onClick={handleLinkClick}
                >
                    공방 보러가기
                    <Box sx={{ ml: 0.5, display: 'flex', alignItems: 'center' }}>
            <span className="material-icons" style={{ fontSize: '12px' }}>
              arrow_forward_ios
            </span>
                    </Box>
                </Link>
            </CardContent>
        </Card>
    );
};

export default WorkshopCard;