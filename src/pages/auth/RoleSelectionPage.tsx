import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import {
    RoleSelector,
    RoleSelectionContainer,
    RoleSelectionActions
} from '@/domains/auth';
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

        setTimeout(() => {
            setIsLoading(false);
            console.log(`역할 선택 완료: ${selectedRole}`);

            const redirectPath = ROLE_INFO[selectedRole].redirectPath;
            navigate(redirectPath);
        }, 1000);
    };

    return (
        <RoleSelectionContainer>
            <Box sx={{ mb: 4 }}>
                <RoleSelector
                    selectedRole={selectedRole}
                    onRoleSelect={handleRoleSelect}
                />
            </Box>

            <RoleSelectionActions
                selectedRole={selectedRole}
                isLoading={isLoading}
                onContinue={handleContinue}
            />
        </RoleSelectionContainer>
    );
};

export default RoleSelectionPage;