export type SortOption = '최신순' | '인기순' | '낮은가격순' | '높은평점순';

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string; // 기존 메인 이미지
    images?: string[]; // 추가: 상세 이미지 배열
    category: string;
    brand?: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    isFavorite?: boolean;
    tags?: string[];
    description?: string;
    // 상세 페이지를 위한 추가 속성들
    detailedDescription?: string;
    ingredients?: string[];
    nutritionInfo?: {
        protein?: string;
        fat?: string;
        fiber?: string;
        moisture?: string;
        calories?: string;
    };
    weight?: string;
    storage?: string;
    manufacturingDate?: string;
    expirationDate?: string;
}

export interface ProductCardProps {
    product: Product;
    onClick?: (product: Product) => void;
}

export interface ProductGridProps {
    products: Product[];
    onProductClick?: (product: Product) => void;
    loading?: boolean;
    className?: string;
}

export interface ProductSortButtonsProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
    className?: string;
}

export interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}