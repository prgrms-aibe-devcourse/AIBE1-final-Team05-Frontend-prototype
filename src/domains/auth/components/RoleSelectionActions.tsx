import { Box, Button, Typography } from '@mui/material';
import { UserRole } from '../types';

interface RoleSelectionActionsProps {
    selectedRole: UserRole | null;
    isLoading: boolean;
    onContinue: () => void;
}

const RoleSelectionActions = ({
                                  selectedRole,
                                  isLoading,
                                  onContinue
                              }: RoleSelectionActionsProps) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Button
                variant="contained"
                size="large"
                disabled={!selectedRole || isLoading}
                onClick={onContinue}
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
    );
};

export default RoleSelectionActions;