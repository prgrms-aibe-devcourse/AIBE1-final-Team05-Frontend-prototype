export interface SellerInfo {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    shopName: string;
    shopDescription?: string;
    joinDate: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    type: 'order' | 'delivery' | 'inquiry' | 'system';
}

// SellerHeader Props 타입도 여기로
export interface SellerHeaderProps {
    sellerInfo: SellerInfo;
    notifications: Notification[];
    onNotificationClick?: (notification: Notification) => void;
    onAnnouncementClick?: () => void;
    onFaqClick?: () => void;
    onInquiryClick?: () => void;
}