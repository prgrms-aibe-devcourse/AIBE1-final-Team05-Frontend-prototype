// src/types/ProductManagement.ts

export interface ProductFormData {
  id?: string;
  productName: string;
  category: ProductCategory;
  price: number;
  description: string;
  ingredients: string;
  images: File[];
  stockQuantity: number;
  salesStartDate: string;
  shippingCosts: number;
  leadTime: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  category: ProductCategory;
  currentStock: number;
  minStock: number;
  maxStock: number;
  reservedStock: number;
  availableStock: number;
  lastUpdated: string;
  supplier: string;
  costPrice: number;
  sellPrice: number;
  status: StockStatus;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  date: string;
  userId: string;
  notes?: string;
}

export type ProductCategory =
  | "dog_snacks"
  | "cat_snacks"
  | "chews"
  | "training_treats";

export type StockStatus = "충분" | "부족" | "품절" | "재주문필요";

export type StockMovementType = "입고" | "출고" | "반품" | "폐기" | "조정";

export const PRODUCT_CATEGORIES = [
  { value: "dog_snacks", label: "강아지 간식" },
  { value: "cat_snacks", label: "고양이 간식" },
  { value: "chews", label: "츄르/개껌" },
  { value: "training_treats", label: "훈련용 간식" },
] as const;

export const STOCK_MOVEMENT_TYPES = [
  { value: "입고", label: "입고" },
  { value: "출고", label: "출고" },
  { value: "반품", label: "반품" },
  { value: "폐기", label: "폐기" },
  { value: "조정", label: "재고 조정" },
] as const;
