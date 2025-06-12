// @/data/workshop.ts
export interface Workshop {
    id: string;
    name: string;
    description: string;
    image: string;
    rating?: number;
    reviewCount?: number;
    specialties?: string[];
    location?: string;
    established?: string;
}

// Workshop 관련 추가 타입들
export interface WorkshopDetail extends Workshop {
    address?: string;
    phoneNumber?: string;
    email?: string;
    operatingHours?: {
        [key: string]: string; // 예: { "월": "09:00-18:00", "화": "09:00-18:00" }
    };
    socialLinks?: {
        instagram?: string;
        facebook?: string;
        website?: string;
    };
    certifications?: string[]; // 인증서나 자격증
    story?: string; // 공방 스토리
    products?: string[]; // 주요 상품 목록
}

export interface WorkshopCardProps {
    workshop: Workshop;
    onClick?: (workshop: Workshop) => void;
}

export interface WorkshopGridProps {
    workshops: Workshop[];
    onWorkshopClick?: (workshop: Workshop) => void;
}

export interface WorkshopListProps {
    workshops: Workshop[];
    onWorkshopClick?: (workshop: Workshop) => void;
    loading?: boolean;
}

// 공방 필터 타입
export interface WorkshopFilters {
    location?: string;
    specialty?: string;
    rating?: number;
    established?: string;
}

// 공방 검색 타입
export interface WorkshopSearchParams {
    query?: string;
    filters?: WorkshopFilters;
    sortBy?: 'rating' | 'reviewCount' | 'name' | 'established';
    sortOrder?: 'asc' | 'desc';
}

// API 응답 타입들
export interface WorkshopResponse {
    success: boolean;
    data: Workshop[];
    total: number;
    page?: number;
    limit?: number;
}

export interface WorkshopDetailResponse {
    success: boolean;
    data: WorkshopDetail;
}