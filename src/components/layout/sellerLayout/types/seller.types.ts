// Common 컴포넌트에서 사용하는 기본 인터페이스들을 재사용
export interface UserInfo {
    name: string;
    email: string;
    profileImage?: string;
}

export interface Notification {
    id: string;
    type: 'order' | 'delivery' | 'inquiry' | 'system';
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}

// SellerInfo는 UserInfo를 확장
export interface SellerInfo extends UserInfo {
    id: string;
    shopName: string;
    shopDescription?: string;
    joinDate: string;
}

// SellerHeader Props 타입
export interface SellerHeaderProps {
    sellerInfo: SellerInfo;
    notifications: Notification[];
    onNotificationClick?: (notification: Notification) => void;
    onAnnouncementClick?: () => void;
    onFaqClick?: () => void;
    onInquiryClick?: () => void;
    onProfileEdit?: () => void;
    onSellerInfo?: () => void;
    onSettings?: () => void;
    onLogout?: () => void;
}