// src/types/product.ts

/** 포장 옵션 (드롭다운용) */
export interface PackagingOption {
  value: string;
  label: string;
}

/** 제조사 정보 */
export interface ProductMaker {
  name: string;
  description: string;
  image: string;
}

/** 상품 정보 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  ingredients: string;
  nutritionalInfo: string;
  allergenInfo: string;
  maker: ProductMaker;
  suitableFor: string;
  packaging: PackagingOption[];
}
