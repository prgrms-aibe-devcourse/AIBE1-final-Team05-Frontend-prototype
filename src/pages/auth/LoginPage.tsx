import { Container, Box, Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/domains/auth';
import { SocialProvider } from '@/domains/auth/types';
import { ROUTES } from '@/domains/auth/constants';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = (provider: SocialProvider) => {
        setIsLoading(true);
        // 더미 로그인 처리
        console.log(`${provider} 로그인 시도`);

        // 실제로는 소셜 로그인 처리 후 역할선택 페이지로 이동
        setTimeout(() => {
            setIsLoading(false);
            navigate(ROUTES.ROLE_SELECTION);
        }, 1500);
    };

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
            <Container maxWidth="sm">
                <Card
                    sx={{
                        maxWidth: 480,
                        mx: 'auto',
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: 'grey.200',
                    }}
                >
                    <CardContent sx={{ p: { xs: 4, sm: 6 } }}>
                        <LoginForm
                            onSocialLogin={handleSocialLogin}
                            loading={isLoading}
                        />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginPage;