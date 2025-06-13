// src/components/OrderManagement/types/order.types.ts

export interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  customerName: string;
  productName: string;
  quantity: number;
  amount: number;
  shippingStatus: ShippingStatus | "order_cancelled" | "delay_requested";
  customerPhone?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  shippingCompany?: string;
  notes?: string;
  isDirect?: boolean;
  delayReason?: string; // 출고 지연 사유
}

export interface OrderSummary {
  paymentCompleted: number;
  preparing: number; // 상품준비중 + 출고지연중 합산
  readyToShip: number;
  shipping: number; // 운송장 등록
  inTransit: number; // 배송중 (신규 추가)
  delivered: number;
}

export interface UrgentTasks {
  delayRequests: number;
  longTermUndelivered: number;
}

export type ShippingStatus =
  | "payment_completed" // 주문확인
  | "preparing" // 상품준비중
  | "ready_to_ship" // 배송지시
  | "shipping" // 운송장 등록
  | "in_transit" // 배송중 (신규 추가)
  | "delivered"; // 배송완료

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
  shippingStatus:
    | ShippingStatus
    | "all"
    | "order_cancelled"
    | "delay_requested";
  searchCondition: SearchCondition;
  searchKeyword: string;
  directShippingOnly: boolean;
}

export const SHIPPING_STATUS_LABELS = {
  payment_completed: "주문확인",
  preparing: "상품준비중",
  ready_to_ship: "배송지시",
  shipping: "운송장 등록",
  in_transit: "배송중", // 신규 추가
  delivered: "배송완료",
  delay_requested: "출고지연중", // 신규 추가
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
