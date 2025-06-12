import { Container, Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface RoleSelectionContainerProps {
    children: ReactNode;
}

const RoleSelectionContainer = ({ children }: RoleSelectionContainerProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                px: 2,
            }}
        >
            <Container maxWidth="md">
                {/* 헤더 섹션 */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    {/* 로고 */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #e89830 0%, #f2b260 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 24px rgba(232, 152, 48, 0.3)',
                            }}
                        >
              <span className="material-icons" style={{ fontSize: '40px', color: 'white' }}>
                person_add
              </span>
                        </Box>
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            color: 'text.primary',
                            mb: 2,
                            fontSize: { xs: '1.75rem', sm: '2.5rem' },
                        }}
                    >
                        사용자 유형 선택
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '1.125rem',
                            mb: 2,
                        }}
                    >
                        Pet's Delight에서 어떤 역할로 활동하고 싶으신가요?
                    </Typography>

                    <Box
                        sx={{
                            width: 60,
                            height: 4,
                            backgroundColor: 'primary.main',
                            borderRadius: 2,
                            mx: 'auto',
                        }}
                    />
                </Box>

                {children}
            </Container>
        </Box>
    );
};

export default RoleSelectionContainer;