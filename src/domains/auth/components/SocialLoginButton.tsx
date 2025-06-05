import { Button, Box, Typography } from '@mui/material';
import { SOCIAL_LOGIN_CONFIG } from '../constants/auth.constants';
import { SocialLoginButtonProps } from '../types/auth.types';

const SocialLoginButton = ({ provider, onLogin, disabled = false }: SocialLoginButtonProps) => {
    const config = SOCIAL_LOGIN_CONFIG[provider];

    const renderIcon = () => {
        if (provider === 'google') {
            return (
                <Box
                    component="img"
                    src={config.icon}
                    alt={config.name}
                    sx={{ width: 20, height: 20 }}
                />
            );
        }

        // 카카오, 네이버는 텍스트 아이콘
        return (
            <Box
                sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: provider === 'naver' ? 'white' : '#1b150e',
                    borderRadius: provider === 'naver' ? '2px' : '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        color: provider === 'naver' ? '#03C75A' : '#FEE500',
                        fontSize: '12px',
                        fontWeight: 700
                    }}
                >
                    {config.icon}
                </Typography>
            </Box>
        );
    };

    return (
        <Button
            fullWidth
            variant={provider === 'google' ? 'outlined' : 'contained'}
            size="large"
            disabled={disabled}
            onClick={() => onLogin(provider)}
            sx={{
                py: 2,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: config.color,
                color: config.textColor,
                borderColor: config.borderColor,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: provider === 'google' ? 'grey.50' :
                        provider === 'kakao' ? '#f0dc42' : '#02b351',
                    borderColor: provider === 'google' ? 'grey.400' : config.borderColor,
                    boxShadow: 'none',
                },
                '&:disabled': {
                    opacity: 0.6,
                },
            }}
            startIcon={renderIcon()}
        >
            {config.name} 계정으로 계속하기
        </Button>
    );
};

export default SocialLoginButton;