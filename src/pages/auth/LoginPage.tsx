import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LoginForm,
    LoginContainer
} from '@/components/Auth';
import { SocialProvider } from '@/components/Auth/types';
import { ROUTES } from '@/components/Auth/constants';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSocialLogin = (provider: SocialProvider) => {
        setIsLoading(true);
        console.log(`${provider} 로그인 시도`);

        setTimeout(() => {
            setIsLoading(false);
            navigate(ROUTES.ROLE_SELECTION);
        }, 1500);
    };

    return (
        <LoginContainer>
            <LoginForm
                onSocialLogin={handleSocialLogin}
                loading={isLoading}
            />
        </LoginContainer>
    );
};

export default LoginPage;