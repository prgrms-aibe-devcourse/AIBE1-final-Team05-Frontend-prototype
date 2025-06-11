// src/types/Product.ts

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
}

export interface ProductFilters {
  petType: PetType | null;
  productType: ProductType | null;
  ingredients: string[];
  healthBenefits: string[];
  priceRange: [number, number];
  isHandmadeOnly: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type PetType = "강아지" | "고양이" | "새" | "토끼";

export type ProductType = "간식" | "영양제" | "껌";

export type ProductCategory =
  | "훈련용 간식"
  | "건강 간식"
  | "치아 건강"
  | "수제 간식"
  | "무첨가 간식";

export const PET_TYPES: PetType[] = ["강아지", "고양이", "새", "토끼"];

export const PRODUCT_TYPES: ProductType[] = ["간식", "영양제", "껌"];

export const INGREDIENTS = ["닭고기", "소고기", "생선", "채소"];

export const HEALTH_BENEFITS = ["치아 건강", "관절 건강"];

export const SORT_OPTIONS: SortOption[] = [
  { value: "sales", label: "판매량순" },
  { value: "price_low", label: "낮은 가격순" },
  { value: "price_high", label: "높은 가격순" },
  { value: "latest", label: "최신 등록순" },
  { value: "rating", label: "평점 높은순" },
];
