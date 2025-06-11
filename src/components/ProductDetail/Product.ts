// src/components/ProductDetail/Product.ts

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string; // 단일 이미지 (기존 호환성)
    image?: string; // ProductImages에서 사용
    images?: string[]; // 다중 이미지 배열
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestseller?: boolean;
    isOutOfStock?: boolean;
    restockDate?: string;
    shippingInfo?: string;
    category?: string;
    petType?: string;
    ingredients?: string | string[]; // 문자열 또는 배열 모두 지원
    healthBenefits?: string[];
    isFavorite?: boolean;

    // ProductDetail 전용 추가 속성들
    description?: string;
    nutritionalInfo?: string;
    allergenInfo?: string;
    maker?: {
        name: string;
        description: string;
        image: string;
    };
    suitableFor?: string;
    packaging?: Array<{
        value: string;
        label: string;
    }>;

    // ProductInfo에서 사용하는 추가 속성들
    tags?: string[];
    nutritionInfo?: {
        protein?: string;
        fat?: string;
        fiber?: string;
        moisture?: string;
    };
    weight?: string;
}

export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}