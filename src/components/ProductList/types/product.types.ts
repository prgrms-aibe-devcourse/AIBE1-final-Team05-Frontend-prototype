// src/components/ProductList/types/product.types.ts

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isOutOfStock?: boolean;
  restockDate?: string;
  shippingInfo: string;
  category: ProductCategory;
  petType: PetType;
  ingredients: string[];
  healthBenefits: string[];
  isFavorite?: boolean;
  hasAllergens?: boolean; // 알러지 유발 성분 포함 여부
}

export interface ProductFilters {
  petType: PetType | null;
  productType: ProductType | null;
  priceRange: [number, number];
  hasAllergens: boolean | null; // null = 전체, true = 유, false = 무
  ratingRange: [number, number]; // [최소 평점, 최대 평점]
}

export interface SortOption {
  value: string;
  label: string;
}

export type PetType = "강아지" | "고양이";

export type ProductType = "전체" | "수제품" | "완제품";

export type ProductCategory =
  | "훈련용 간식"
  | "건강 간식"
  | "치아 건강"
  | "수제 간식"
  | "무첨가 간식";

export const PET_TYPES: PetType[] = ["강아지", "고양이"];

export const PRODUCT_TYPES: ProductType[] = ["전체", "수제품", "완제품"];

export const SORT_OPTIONS: SortOption[] = [
  { value: "sales", label: "판매량순" },
  { value: "price", label: "가격순" },
  { value: "latest", label: "등록순" },
  { value: "rating", label: "평점순" },
];

export const ALLERGEN_OPTIONS = [
  { value: null, label: "전체" },
  { value: false, label: "무" },
  { value: true, label: "유" },
] as const;
