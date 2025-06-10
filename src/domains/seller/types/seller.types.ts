// 정산 관련 타입들
export interface SettlementItem {
    id: string;
    productName: string;
    orderAmount: number;
    commission: number;
    settlementAmount: number;
    status: '대기중' | '정산완료';
    orderDate: string;
    paymentDate?: string;
    deliveryDate?: string;
    confirmDate?: string;
    settlementDate?: string;
}

export interface SettlementFilters {
    paymentFilter: string;
    deliveryFilter: string;
    confirmFilter: string;
    settlementFilter: string;
    periodFilter: string;
    // 날짜 범위 필터 추가
    startDate?: string;
    endDate?: string;
}

// 매출 관련 타입들
export interface SalesData {
    month: string;
    amount: number;
}

export interface SalesRecommendation {
    id: string;
    productName: string;
    description: string;
    amount: number;
    rank?: number;
}

// 알림 관련 타입들
export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    type: 'order' | 'delivery' | 'inquiry' | 'system';
}

// 판매자 정보 타입
export interface SellerInfo {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    shopName: string;
    shopDescription?: string;
    joinDate: string;
}

// 탭 관련 타입들
export interface DashboardTab {
    id: number;
    label: string;
    icon: string;
    path?: string;
}

// 컴포넌트 Props 타입들
export interface SettlementTabProps {
    settlementData?: SettlementItem[];
    salesData?: SalesData[];
    salesRecommendations?: SalesRecommendation[];
}

export interface SellerHeaderProps {
    sellerInfo: SellerInfo;
    notifications: Notification[];
    onNotificationClick?: (notification: Notification) => void;
    onAnnouncementClick?: () => void;
    onFaqClick?: () => void;
    onInquiryClick?: () => void;
}

export interface SettlementTableProps {
    data: SettlementItem[];
    filters: SettlementFilters;
    onFiltersChange: (filters: Partial<SettlementFilters>) => void;
    onSettlementRequest: () => void;
    // 페이지네이션 관련 props (선택사항 - API 연동 시 추가)
    totalCount?: number;
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    loading?: boolean;
}

export interface SalesChartProps {
    data: SalesData[];
    title?: string;
}

export interface SalesRankingProps {
    data: SalesRecommendation[];
    title?: string;
    onDownloadReport?: () => void;
}

// 날짜 범위 피커 컴포넌트 Props
export interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onDateChange: (startDate: string, endDate: string) => void;
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

// API 응답 타입들
export interface SettlementResponse {
    success: boolean;
    data: SettlementItem[];
    total: number;
    totalAmount: number;
}

export interface SalesResponse {
    success: boolean;
    data: SalesData[];
    totalSales: number;
    growthRate: number;
}

export interface NotificationResponse {
    success: boolean;
    data: Notification[];
    unreadCount: number;
}