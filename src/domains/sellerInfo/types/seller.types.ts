export interface SellerProfile {
    id: string;
    name: string;
    profileImage: string;
    rating: number;
    reviewCount: number;
    salesCount: number;
    establishedYear: number;
    tags: string[];
    operatingHours: string;
    shippingInfo: string;
    location: string;
    isVerified: boolean;
    isSafetyChecked: boolean;
    description?: string;
}

export interface SellerProduct {
    id: string;
    sellerId: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    isLiked: boolean;
    isOutOfStock: boolean;
    discountPercentage?: number;
}

export interface SimilarSeller {
    id: string;
    name: string;
    profileImage: string;
    description: string;
    speciality: string;
}

export interface SellerProductsResponse {
    products: SellerProduct[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

export type ProductSortType = 'latest' | 'popular' | 'price_low' | 'rating_high';