// src/components/OrderManagement/types/order.types.ts

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  productName: string;
  quantity: number;
  amount: number;
  shippingStatus: string; // 단순화된 타입
  customerPhone?: string;
  shippingAddress: string; // 필수 필드로 변경 (모든 주문에 주소 포함)
  trackingNumber?: string;
  shippingCompany?: string;
  notes?: string;
  isDirect?: boolean;
  delayReason?: string; // 출고 지연 사유
}

export interface OrderSummary {
  paymentCompleted: number;
  preparing: number; // 상품준비중 + 출고지연중 합산
  readyForDelivery: number; // 배송준비 완료 (기존 readyToShip + shipping 통합)
  inTransit: number; // 배송중
  delivered: number;
}

export interface UrgentTasks {
  delayRequests: number;
  longTermUndelivered: number;
}

export type DateRange = "today" | "7days" | "30days" | "custom";

export type SearchCondition =
  | "customer_name"
  | "order_number"
  | "product_name"
  | "recipient_name";

export interface OrderFilter {
  dateRange: DateRange;
  startDate?: string;
  endDate?: string;
  shippingStatus: string[]; // 단순화된 타입
  searchCondition: SearchCondition;
  searchKeyword: string;
  directShippingOnly: boolean;
}

export const SHIPPING_STATUS_LABELS = {
  payment_completed: "주문확인",
  preparing: "상품준비중",
  ready_for_delivery: "배송준비 완료", // 통합된 새 상태
  in_transit: "배송중",
  delivered: "배송완료",
  delay_requested: "출고지연중",
  order_cancelled: "주문 취소",
} as const;

export const SEARCH_CONDITIONS = [
  { value: "customer_name", label: "주문자명" },
  { value: "order_number", label: "주문번호" },
  { value: "product_name", label: "상품명" },
] as const;

export const DATE_RANGES = [
  { value: "today", label: "오늘" },
  { value: "7days", label: "7일" },
  { value: "30days", label: "30일" },
] as const;
