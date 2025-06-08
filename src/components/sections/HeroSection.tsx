//components/sections/HeroSection.tsx
import { Container, Box, Typography, Button } from '@mui/material';

interface HeroSectionProps {
    onShopNowClick?: () => void;
}

export const HeroSection = ({ onShopNowClick }: HeroSectionProps) => {
    return (
        <Box
            sx={{
                minHeight: { xs: 'calc(100vh - 120px)', sm: '560px' },
                background: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=600&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                px: 2,
                py: { xs: 8, sm: 16 },
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h1"
                    sx={{
                        color: 'white',
                        fontWeight: 900,
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                        lineHeight: 1.1,
                        mb: 3,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                    }}
                >
                    우리 아이만을 위한
                    <br />
                    특별한 수제 간식
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'white',
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        lineHeight: 1.6,
                        mb: 4,
                        opacity: 0.95,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                    }}
                >
                    정성껏 만든 영양 가득한 수제 간식으로
                    <br />
                    사랑하는 반려동물에게 행복을 선물하세요.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    endIcon={<span className="material-icons">arrow_forward</span>}
                    onClick={onShopNowClick}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        fontWeight: 700,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(232, 152, 48, 0.4)',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                            boxShadow: '0 12px 32px rgba(232, 152, 48, 0.5)',
                            transform: 'translateY(-2px)',
                        },
                    }}
                >
                    지금 쇼핑하기
                </Button>
            </Container>
        </Box>
    );
};