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
    startDate?: string;
    endDate?: string;
}

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

// Props 타입들
export interface SettlementTabProps {
    settlementData?: SettlementItem[];
    salesData?: SalesData[];
    salesRecommendations?: SalesRecommendation[];
}

export interface SettlementTableProps {
    data: SettlementItem[];
    filters: SettlementFilters;
    onFiltersChange: (filters: Partial<SettlementFilters>) => void;
    onSettlementRequest: () => void;
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