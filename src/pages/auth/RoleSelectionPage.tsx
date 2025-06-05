import { Container, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleSelector } from '@/domains/auth';
import { UserRole } from '@/domains/auth/types';
import { ROLE_INFO } from '@/domains/auth/constants';

const RoleSelectionPage = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (!selectedRole) return;

        setIsLoading(true);

        // 더미 처리 - 실제로는 역할 정보 저장
        setTimeout(() => {
            setIsLoading(false);
            console.log(`역할 선택 완료: ${selectedRole}`);

            // 선택된 역할에 따라 적절한 페이지로 이동
            const redirectPath = ROLE_INFO[selectedRole].redirectPath;
            navigate(redirectPath);
        }, 1000);
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
            <Container maxWidth="md">
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

                {/* 역할 선택 컴포넌트 */}
                <Box sx={{ mb: 4 }}>
                    <RoleSelector
                        selectedRole={selectedRole}
                        onRoleSelect={handleRoleSelect}
                    />
                </Box>

                {/* 계속하기 버튼 */}
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        disabled={!selectedRole || isLoading}
                        onClick={handleContinue}
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            borderRadius: 3,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                transform: 'translateY(-2px)',
                            },
                            '&:disabled': {
                                backgroundColor: 'grey.300',
                                color: 'grey.500',
                                transform: 'none',
                            },
                        }}
                    >
                        {isLoading ? '처리 중...' : '계속하기'}
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            mt: 2,
                            fontSize: '0.875rem',
                        }}
                    >
                        선택하신 유형은 나중에 설정에서 변경하실 수 있습니다.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default RoleSelectionPage;