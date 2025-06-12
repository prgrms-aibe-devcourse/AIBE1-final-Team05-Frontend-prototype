// src/components/ShoppingCart/types/cart.types.ts
export interface CartItem {
    id: string;
    name: string;
    option: string;
    price: number;
    quantity: number;
    image: string;
    selected: boolean;
}

export interface Coupon {
    id: string;
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    minAmount: number;
    description: string;
}

export interface RecommendedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}