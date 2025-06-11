export type SocialProvider = 'google' | 'kakao' | 'naver';
export type UserRole = 'buyer' | 'seller';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profileImage?: string;
    provider: SocialProvider;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface SocialLoginRequest {
    provider: SocialProvider;
    accessToken: string;
}

export interface SocialLoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RoleSelectionRequest {
    userId: string;
    role: UserRole;
}

export interface RoleSelectionResponse {
    success: boolean;
    user: User;
}

// 컴포넌트 Props 타입들
export interface SocialLoginButtonProps {
    provider: SocialProvider;
    onLogin: (provider: SocialProvider) => void;
    disabled?: boolean;
}

export interface RoleSelectorProps {
    selectedRole: UserRole | null;
    onRoleSelect: (role: UserRole) => void;
}

export interface LoginFormProps {
    onSocialLogin: (provider: SocialProvider) => void;
    loading?: boolean;
}

// API 응답 타입들
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface LoginError {
    code: string;
    message: string;
    details?: any;
}