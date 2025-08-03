package com.team5.catdogeats.carts.service.impl;

import com.team5.catdogeats.auth.dto.UserPrincipal;
import com.team5.catdogeats.carts.dto.response.RecommendationResponse;
import com.team5.catdogeats.carts.repository.CartRecommendationRepository;
import com.team5.catdogeats.carts.service.CartRecommendationService;
import com.team5.catdogeats.global.annotation.JpaTransactional;
import com.team5.catdogeats.pets.domain.enums.PetCategory;
import com.team5.catdogeats.products.domain.Products;
import com.team5.catdogeats.users.domain.Users;
import com.team5.catdogeats.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartRecommendationServiceImpl implements CartRecommendationService {

    private final CartRecommendationRepository cartRecommendationRepository;
    private final UserRepository userRepository;

    @Override
    @JpaTransactional(readOnly = true)
    public List<RecommendationResponse> getCartBasedRecommendations(UserPrincipal userPrincipal) {
        log.info("장바구니 기반 추천 상품 조회 시작 - provider: {}, providerId: {}",
                userPrincipal.provider(), userPrincipal.providerId());

        try {
            // 1. 사용자 검증
            Users user = userRepository.findByProviderAndProviderId(
                            userPrincipal.provider(), userPrincipal.providerId())
                    .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

            // 2. 장바구니 상품 분석
            List<String> cartProductIds = cartRecommendationRepository.findCartProductIdsByUserId(user.getId());

            if (cartProductIds.isEmpty()) {
                log.info("빈 장바구니 - 전체 인기상품 추천");
                return getPopularProductsForEmptyCart();
            }

            // 3. 장바구니 상품들의 카테고리 분석
            List<PetCategory> cartCategories = cartRecommendationRepository.findCategoriesByProductIds(cartProductIds);
            Set<PetCategory> uniqueCategories = new HashSet<>(cartCategories);

            log.info("장바구니 카테고리 분석 결과: {}", uniqueCategories);

            // 4. 추천 전략 결정
            if (uniqueCategories.size() == 1) {
                // 단일 카테고리 → 해당 카테고리 인기상품
                PetCategory targetCategory = uniqueCategories.iterator().next();
                log.info("단일 카테고리 추천 - category: {}", targetCategory);
                return getCategoryBasedRecommendations(targetCategory, cartProductIds);
            } else {
                // 혼합 카테고리 또는 카테고리 없음 → 전체 인기상품
                log.info("혼합 카테고리 또는 기타 - 전체 인기상품 추천");
                return getPopularProductsWithExclusion(cartProductIds);
            }

        } catch (Exception e) {
            log.error("장바구니 기반 추천 상품 조회 실패 - provider: {}, providerId: {}",
                    userPrincipal.provider(), userPrincipal.providerId(), e);
            throw e;
        }
    }

    /**
     * 특정 카테고리 기반 추천 상품 조회
     */
    private List<RecommendationResponse> getCategoryBasedRecommendations(PetCategory petCategory, List<String> excludeProductIds) {
        Pageable pageable = PageRequest.of(0, 4);

        try {
            List<Products> recommendedProducts = cartRecommendationRepository
                    .findTopPopularProductsByCategoryExcluding(petCategory, excludeProductIds, pageable);

            if (recommendedProducts.isEmpty()) {
                log.warn("카테고리별 추천 상품이 없음 - category: {}, 전체 인기상품으로 대체", petCategory);
                return getPopularProductsWithExclusion(excludeProductIds);
            }

            return recommendedProducts.stream()
                    .map(this::convertToRecommendationResponse)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("카테고리별 추천 상품 조회 실패 - category: {}, 전체 인기상품으로 대체", petCategory, e);
            return getPopularProductsWithExclusion(excludeProductIds);
        }
    }

    /**
     * 전체 인기 상품 조회 (제외 상품 있음)
     */
    private List<RecommendationResponse> getPopularProductsWithExclusion(List<String> excludeProductIds) {
        Pageable pageable = PageRequest.of(0, 4);

        try {
            List<Products> popularProducts = cartRecommendationRepository
                    .findTopPopularProductsExcluding(excludeProductIds, pageable);

            if (popularProducts.isEmpty()) {
                log.warn("제외 조건 적용 인기 상품이 없음 - 전체 인기상품으로 대체");
                return getPopularProductsForEmptyCart();
            }

            return popularProducts.stream()
                    .map(this::convertToRecommendationResponse)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("제외 조건 적용 인기상품 조회 실패", e);
            return getPopularProductsForEmptyCart();
        }
    }

    /**
     * 전체 인기 상품 조회 (빈 장바구니용)
     */
    private List<RecommendationResponse> getPopularProductsForEmptyCart() {
        Pageable pageable = PageRequest.of(0, 4);

        try {
            List<Products> popularProducts = cartRecommendationRepository.findTopPopularProductsAll(pageable);

            if (popularProducts.isEmpty()) {
                log.warn("추천할 인기 상품이 전혀 없음");
                return Collections.emptyList();
            }

            return popularProducts.stream()
                    .map(this::convertToRecommendationResponse)
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.error("전체 인기상품 조회 실패", e);
            return Collections.emptyList();
        }
    }

    /**
     * Products 엔티티를 RecommendationResponse로 변환
     */
    private RecommendationResponse convertToRecommendationResponse(Products product) {
        // 상품별 총 구매 수량 조회
        Long purchaseCount = cartRecommendationRepository.getTotalPurchaseCountByProductId(product.getId());

        // 상품의 첫 번째 이미지 URL 조회
        List<String> imageUrls = cartRecommendationRepository.findFirstImageUrlByProductId(product.getId());
        String thumbnailImage = imageUrls.isEmpty() ? null : imageUrls.get(0);

        // 판매자명 조회 (Sellers 엔티티의 vendorName)
        String vendorName = product.getSeller() != null ? product.getSeller().getVendorName() : "Unknown";

        return RecommendationResponse.builder()
                .productId(product.getId())
                .productNumber(product.getProductNumber())
                .title(product.getTitle())
                .price(product.getPrice())
                .petCategory(product.getPetCategory())
                .purchaseCount(purchaseCount != null ? purchaseCount : 0L)
                .thumbnailImage(thumbnailImage)
                .vendorName(vendorName)
                .build();
    }
}