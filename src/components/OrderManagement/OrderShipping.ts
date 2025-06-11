// src/types/OrderShipping.ts

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  productName: string;
  quantity: number;
  amount: number;
  shippingStatus: ShippingStatus;
  customerPhone?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  shippingCompany?: string;
  notes?: string;
  isDirect?: boolean; // 업체 직접 배송 여부
}

export interface OrderSummary {
  paymentCompleted: number;
  preparing: number;
  readyToShip: number;
  shipping: number;
  delivered: number;
}

export interface UrgentTasks {
  delayRequests: number;
  longTermUndelivered: number;
}

export type ShippingStatus =
  | "payment_completed" // 결제완료
  | "preparing" // 상품준비중
  | "ready_to_ship" // 배송지시
  | "shipping" // 배송중
  | "delivered" // 배송완료
  | "pending_confirmation"; // 확인 대기

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
  shippingStatus: ShippingStatus | "all";
  searchCondition: SearchCondition;
  searchKeyword: string;
  directShippingOnly: boolean;
}

export const SHIPPING_STATUS_LABELS = {
  payment_completed: "결제완료",
  preparing: "상품준비중",
  ready_to_ship: "배송지시",
  shipping: "배송중",
  delivered: "배송완료",
  pending_confirmation: "확인 대기",
  all: "전체",
} as const;

export const SEARCH_CONDITIONS = [
  { value: "customer_name", label: "주문자명" },
  { value: "order_number", label: "주문번호" },
  { value: "product_name", label: "상품명" },
  { value: "recipient_name", label: "수취인명" },
] as const;

export const DATE_RANGES = [
  { value: "today", label: "오늘" },
  { value: "7days", label: "7일" },
  { value: "30days", label: "30일" },
] as const;
