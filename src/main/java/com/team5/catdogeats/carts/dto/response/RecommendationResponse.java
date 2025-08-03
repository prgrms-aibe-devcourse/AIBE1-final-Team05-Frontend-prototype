package com.team5.catdogeats.carts.dto.response;

import com.team5.catdogeats.pets.domain.enums.PetCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 장바구니 추천 상품 응답 DTO
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {
    private String productId;
    private Long productNumber;
    private String title;
    private Long price;
    private PetCategory petCategory;
    private Long purchaseCount;
    private String thumbnailImage;
    private String vendorName;
}