export const SOCIAL_PROVIDERS = {
    GOOGLE: 'google',
    KAKAO: 'kakao',
    NAVER: 'naver',
} as const;

export const USER_ROLES = {
    BUYER: 'buyer',
    SELLER: 'seller',
} as const;

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ROLE_SELECTION: '/role-selection',
    CATEGORIES: '/categories',
    WORKSHOPS: '/workshops',
    SUPPORT: '/support',
    SELLER_DASHBOARD: '/seller-dashboard',
} as const;

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'pets_delight_access_token',
    REFRESH_TOKEN: 'pets_delight_refresh_token',
    USER: 'pets_delight_user',
    SELECTED_ROLE: 'pets_delight_selected_role',
} as const;

// 소셜 로그인 설정
export const SOCIAL_LOGIN_CONFIG = {
    [SOCIAL_PROVIDERS.GOOGLE]: {
        name: 'Google',
        color: '#ffffff',
        textColor: '#1b150e',
        borderColor: '#e7ddd0',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjIwNDMgOC4xNjMzOVYxMi4wNzE0SDE2LjE0MjlDMTUuOTI0NSAxMy4wOTM5IDE1LjI0NDkgMTMuODc3NiAxNC4zMjY1IDE0LjM4NzhMMTcuMzY3MyAxNi42OTM5QzE4Ljg5OCAxNS4zMDYxIDE5Ljc5NTkgMTMuMjY1MyAxOS43OTU5IDEwLjY5MzlDMTkuNzk1OSAxMC4wMjA0IDE5LjczNDcgOS4zNjczNSAxOS42MjI0IDguNzM0N0wxMC4yMDQzIDguMTYzMzlaIiBmaWxsPSIjNDI4NUY0Ii8+CjxwYXRoIGQ9Ik0xMC4yMDQzIDE5LjU5MTlDMTIuOTc5NiAxOS41OTE5IDE1LjMxNjMgMTguNjkzOSAxNy4zNjczIDE2LjY5MzlMMTQuMzI2NSAxNC4zODc4QzEzLjUyMDQgMTQuODg3OCAxMi40Njk0IDEuNjE5NCAxMC4yMDQzIDE1LjE2MzNDOC4zNjczNCAxNS4xNjMzIDYuODE2MzMgMTQuMDMwNiA2LjMyNjUzIDEyLjUzMDZMMy4yMDQwOCAxNC44OThhNy44NzU1IDcuODc1NSAwIDAwMTAuMjA0MyAxOS41OTE5WiIgZmlsbD0iIzM0QTg1MyIvPgo8cGF0aCBkPSJNNi4zMjY1MyAxMi41MzA2QzYuMDQwODIgMTEuNjk0IDYuMDQwODIgMTAuODI2NSA2LjMyNjUzIDkuOTg5NzlWNy42NTMwNkgzLjIwNDA4QzIuMjAzMDYgOS42NTMwNiAyLjIwMzA2IDEyLjMwNjEgMy4yMDQwOCAxNC44OThMNi4zMjY1MyAxMi41MzA2WiIgZmlsbD0iI0ZCQkMwNCIvPgo8cGF0aCBkPSJNMTAuMjA0MyA0LjgzNjczQzEyLjI2NTMgNC43NzU1MSAxNC4yNjUzIDUuNTU5MjQgMTUuNzk1OSA2Ljk2OTRMMTguNTE4NCA0LjI0Njk0QzE2LjQyODYgMi4yODU3MSAxMy42NTMxIDEuMjQ0OSAxMC4yMDQzIDEuMjg1NzFDNi45Nzk2IDEuMjg1NzEgNC4xODM2NyAzLjI0NDkgMy4yMDQwOCA3LjY1MzA2TDYuMzI2NTMgOS45ODk3OUM2LjgxNjMzIDguNDg5OCA4LjM2NzM0IDQuODM2NzMgMTAuMjA0MyA0LjgzNjczWiIgZmlsbD0iI0VBNDMzNSIvPgo8L3N2Zz4K',
    },
    [SOCIAL_PROVIDERS.KAKAO]: {
        name: 'Kakao',
        color: '#FEE500',
        textColor: '#1b150e',
        borderColor: '#FEE500',
        icon: 'K',
    },
    [SOCIAL_PROVIDERS.NAVER]: {
        name: 'Naver',
        color: '#03C75A',
        textColor: '#ffffff',
        borderColor: '#03C75A',
        icon: 'N',
    },
} as const;

// 역할 정보
export const ROLE_INFO = {
    [USER_ROLES.BUYER]: {
        title: '구매자로 이용하기',
        description: '다양한 브랜드의 수제간식을 둘러보고 구매할 수 있습니다.',
        icon: 'shopping_bag',
        features: [
            '수제간식 구매하기',
            '다양한 브랜드의 간식을 찾을 수 있습니다',
            '우리 아이만의 맞춤형 추천을 받을 수 있습니다'
        ],
        redirectPath: ROUTES.HOME,
    },
    [USER_ROLES.SELLER]: {
        title: '판매자로 이용하기',
        description: '수제간식을 만들어 판매하고 고객들과 소통할 수 있습니다.',
        icon: 'store',
        features: [
            '수제간식 판매하기',
            '나만의 간식을 등록할 수 있습니다',
            '고객들과 직접 소통할 수 있습니다',
            '매출을 통해 자신의 역량을 향상시킬 수 있습니다'
        ],
        redirectPath: ROUTES.SELLER_DASHBOARD,
    },
} as const;