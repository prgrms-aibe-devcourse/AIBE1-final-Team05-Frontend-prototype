import { Box, Typography, Divider } from '@mui/material';
import SocialLoginButton from './SocialLoginButton.tsx';
import { SOCIAL_PROVIDERS } from '@/components/Auth/constants/auth.constants.ts';
import { LoginFormProps, SocialProvider } from '@/components/Auth/types/auth.types.ts';

const LoginForm = ({ onSocialLogin, loading = false }: LoginFormProps) => {
    const socialProviders: SocialProvider[] = [
        SOCIAL_PROVIDERS.GOOGLE,
        SOCIAL_PROVIDERS.KAKAO,
        SOCIAL_PROVIDERS.NAVER,
    ];

    return (
        <Box>
            {/* 로고 및 헤더 */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                            width: 64,
                            height: 64,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #e89830 0%, #f2b260 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(232, 152, 48, 0.3)',
                        }}
                    >
            <span className="material-icons" style={{ fontSize: '32px', color: 'white' }}>
              pets
            </span>
                    </Box>
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: { xs: '1.75rem', sm: '2rem' },
                    }}
                >
                    Pet's Delight에 오신 것을 환영합니다!
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                    }}
                >
                    우리 아이를 위한 특별한 쇼핑을 시작하세요 🐾
                </Typography>
            </Box>

            {/* 소셜 로그인 버튼들 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                {socialProviders.map((provider) => (
                    <SocialLoginButton
                        key={provider}
                        provider={provider}
                        onLogin={onSocialLogin}
                        disabled={loading}
                    />
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* 하단 안내 */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                    }}
                >
                    Pet's Delight는 신선하고 건강한 수제 간식을 제공하여 <br />
                    반려동물의 행복한 순간을 만듭니다.
                </Typography>
            </Box>
        </Box>
    );
};

export default LoginForm;