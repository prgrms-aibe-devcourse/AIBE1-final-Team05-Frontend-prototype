// src/components/SellerDashboard/Dashboard/SellerDashboardData.tsx

// 타입 정의
export interface DemandForecastItem {
  product: string;
  currentStock: number;
  predictedDemand: number;
  recommendedOrder: number;
  confidence: number;
  trend: "급증" | "증가" | "안정" | "감소";
  status: "긴급 재주문" | "재주문 필요" | "충분";
}

// AI 수요 예측 데이터
export const demandForecastData: DemandForecastItem[] = [
  {
    product: "프리미엄 강아지 사료",
    currentStock: 45,
    predictedDemand: 180,
    recommendedOrder: 135,
    confidence: 92,
    trend: "증가",
    status: "재주문 필요",
  },
  {
    product: "고양이 간식 세트",
    currentStock: 78,
    predictedDemand: 65,
    recommendedOrder: 0,
    confidence: 88,
    trend: "안정",
    status: "충분",
  },
  {
    product: "펫 장난감 모음",
    currentStock: 23,
    predictedDemand: 95,
    recommendedOrder: 72,
    confidence: 85,
    trend: "증가",
    status: "재주문 필요",
  },
  {
    product: "건강 보조제",
    currentStock: 12,
    predictedDemand: 150,
    recommendedOrder: 138,
    confidence: 94,
    trend: "급증",
    status: "긴급 재주문",
  },
];

// 헬퍼 함수들
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "긴급 재주문":
      return "#EB5757";
    case "재주문 필요":
      return "#F2994A";
    case "충분":
      return "#6FCF97";
    default:
      return "#A59A8E";
  }
};