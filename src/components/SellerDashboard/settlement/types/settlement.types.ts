export interface SettlementItem {
    id: string;
    productName: string;
    orderAmount: number;
    commission: number;
    settlementAmount: number;
    status: '대기중' | '처리중' | '정산완료';
    orderDate: string;
    paymentDate?: string;
    deliveryDate?: string;
    confirmDate?: string;
    settlementDate?: string;
}

export interface SettlementFilters {
    paymentFilter: string;
    settlementFilter: string;
    periodFilter: string;
    startDate?: string;
    endDate?: string;
}

export interface SalesData {
    month: string;
    amount: number;
}

// 새로 추가된 타입들
export interface YearlyMonthData {
    year: number;
    monthlyData: { month: string; amount: number; }[];
}

export interface ProductSalesData {
    productName: string;
    amount: number;
    percentage: number;
    color: string;
    totalSales?: number;
    salesCount: number; // ? 제거하여 필수 속성으로 변경
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

// 확장된 SalesChart Props
export interface EnhancedSalesChartProps extends SalesChartProps {
    yearlyData?: YearlyMonthData[];
    productData?: ProductSalesData[];
    selectedYear?: number;
    onYearChange?: (year: number) => void;
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

export interface YearlySalesResponse {
    success: boolean;
    data: YearlyMonthData[];
    currentYear: number;
    availableYears: number[];
}

export interface ProductSalesResponse {
    success: boolean;
    data: ProductSalesData[];
    totalProducts: number;
    totalAmount: number;
}