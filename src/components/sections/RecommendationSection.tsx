// 📁 components/sections/RecommendationSection.tsx
import { Container, Box, Typography, Button } from '@mui/material';

interface RecommendationSectionProps {
    onStartRecommendation?: () => void;
}

export const RecommendationSection = ({ onStartRecommendation }: RecommendationSectionProps) => {
    return (
        <Box sx={{ backgroundColor: 'grey.100', py: { xs: 6, sm: 8, lg: 10 } }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        mb: { xs: 4, sm: 6 },
                        color: 'text.primary',
                    }}
                >
                    내 아이 정보로 맞춤 추천
                </Typography>

                <Box
                    sx={{
                        maxWidth: '800px',
                        mx: 'auto',
                        backgroundColor: 'white',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        p: { xs: 3, sm: 4, lg: 5 },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: { xs: 3, sm: 4, lg: 5 },
                    }}
                >
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop"
                        alt="맞춤 추천"
                        sx={{
                            width: { xs: '100%', sm: '33%' },
                            height: 'auto',
                            borderRadius: 2,
                            objectFit: 'cover',
                        }}
                    />
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '0.875rem',
                                mb: 0.5,
                            }}
                        >
                            우리 아이 맞춤형 간식
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                                lineHeight: 1.3,
                                mb: 1,
                                color: 'text.primary',
                            }}
                        >
                            나이, 품종, 알러지 정보로
                            <br />
                            최적의 간식을 찾아보세요.
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
                            간단한 정보 입력으로 우리 아이에게 딱 맞는 간식을 추천받을 수 있습니다.
                        </Typography>
                        <Button
                            variant="contained"
                            endIcon={<span className="material-icons">pets</span>}
                            onClick={onStartRecommendation}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                px: 3,
                                py: 1.25,
                                borderRadius: 3,
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                        >
                            맞춤 추천 시작하기
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};