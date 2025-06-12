export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    brand?: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    isFavorite?: boolean;
    isDiscount?: boolean; // 새로 추가된 할인 표시 속성
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
}

// 상품 카테고리 타입
export type ProductCategory = 'dog' | 'cat' | 'allergy-free' | 'dental';

// 상품 필터 타입
export interface ProductFilters {
    category?: ProductCategory;
    priceRange?: {
        min: number;
        max: number;
    };
    brand?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    isDiscount?: boolean;
    rating?: number;
}