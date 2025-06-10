export type SortOption = '최신순' | '인기순' | '낮은가격순' | '높은평점순';

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    imageUrl?: string; // 두 버전을 모두 지원하기 위해 추가
    category: string;
    brand?: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    isDiscount?: boolean;
    isFavorite?: boolean;
    isOutOfStock?: boolean;
    tags?: string[];
    description?: string;
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