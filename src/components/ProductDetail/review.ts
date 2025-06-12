// src/types/review.ts

/** 리뷰어 정보 */
export interface Reviewer {
  name: string;
  avatar: string;
  petInfo: string; // 예: "Golden Retriever, 2 years"
}

/** 개별 리뷰 */
export interface Review {
  id: string;
  reviewer: Reviewer;
  rating: number;
  content: string;
  date: string;
  image?: string; // 선택적 첨부 이미지
  likes: number;
  dislikes: number;
}

/** 리뷰 통계 */
export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
