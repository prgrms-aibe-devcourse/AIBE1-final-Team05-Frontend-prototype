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