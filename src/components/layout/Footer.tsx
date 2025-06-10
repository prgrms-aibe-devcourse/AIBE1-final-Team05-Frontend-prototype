import { Box, Typography, Container, Grid, Link, Button } from '@mui/material';

const Footer = () => {
    const footerLinks = {
        quickLinks: [
            { label: '상품 전체보기', href: '#' },
            { label: '자주 묻는 질문', href: '#' },
            { label: '공방 입점 문의', href: '#' },
            { label: '이용약관', href: '#' },
            { label: '개인정보처리방침', href: '#' },
        ]
    };

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'secondary.main',
                color: 'grey.100',
                pt: { xs: 6, sm: 8 },
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    {/* 브랜드 섹션 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                mb: 2
                            }}
                        >
                            CatDogEats
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.6,
                                fontSize: '0.875rem'
                            }}
                        >
                            사랑하는 반려동물을 위한 건강하고 맛있는 수제 간식을 만듭니다.
                        </Typography>
                    </Grid>

                    {/* 바로가기 섹션 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                mb: 2
                            }}
                        >
                            바로가기
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {footerLinks.quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* 고객센터 섹션 */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: 'white',
                                mb: 2
                            }}
                        >
                            고객센터
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 0.5 }}
                            >
                                전화: 070-1234-5678
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', fontSize: '0.875rem', mb: 0.5 }}
                            >
                                이메일: help@petsdelight.com
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
                            >
                                운영시간: 평일 10:00 - 17:00 (점심시간 12:00 - 13:00)
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                px: 2,
                                py: 1,
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                        >
                            판매자 등록하기
                        </Button>
                    </Grid>
                </Grid>

                {/* 하단 정보 */}
                <Box
                    sx={{
                        borderTop: '1px solid',
                        borderTopColor: 'secondary.light',
                        py: 3,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            lineHeight: 1.6
                        }}
                    >
                        상호: 펫츠딜라이트 | 대표: 김펫츠 | 사업자등록번호: 123-45-67890
                        <br />
                        통신판매업신고번호: 제2024-서울강남-0000호 | 주소: 서울특별시 강남구 테헤란로 123, 4층
                        <br />
                        © 2024 Pet's Delight. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;