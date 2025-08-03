package com.team5.catdogeats.carts.repository;

import com.team5.catdogeats.pets.domain.enums.PetCategory;
import com.team5.catdogeats.products.domain.Products;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRecommendationRepository extends JpaRepository<Products, String> {

    /**
     * 특정 사용자의 장바구니에 담긴 상품 ID 목록 조회
     * 경로: CartItems -> Carts -> Buyers -> Users
     */
    @Query("""
        SELECT ci.product.id 
        FROM CartItems ci 
        WHERE ci.carts.buyers.user.id = :userId
        """)
    List<String> findCartProductIdsByUserId(@Param("userId") String userId);

    /**
     * 상품 ID 목록으로 해당 상품들의 펫 카테고리 조회
     * 중복 제거하여 유니크한 카테고리만 반환
     */
    @Query("""
        SELECT DISTINCT p.petCategory 
        FROM Products p 
        WHERE p.id IN :productIds 
        AND p.petCategory IS NOT NULL
        """)
    List<PetCategory> findCategoriesByProductIds(@Param("productIds") List<String> productIds);

    /**
     * 특정 카테고리 인기 상품 조회 (제외 상품 있을 때)
     * 주문 완료/배송 완료 기준으로 구매 횟수 순 정렬
     * OrderItems.products 필드명 사용 (엔티티 확인됨)
     */
    @Query("""
        SELECT p FROM Products p
        LEFT JOIN OrderItems oi ON oi.products = p
        LEFT JOIN oi.orders o
        WHERE p.petCategory = :petCategory
          AND (o.orderStatus IN ('PAYMENT_COMPLETED', 'PREPARING', 'READY_FOR_SHIPMENT', 'IN_DELIVERY', 'DELIVERED') OR o IS NULL)
          AND p.id NOT IN :excludeProductIds
        GROUP BY p
        ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, p.id ASC
        """)
    List<Products> findTopPopularProductsByCategoryExcluding(
            @Param("petCategory") PetCategory petCategory,
            @Param("excludeProductIds") List<String> excludeProductIds,
            Pageable pageable
    );

    /**
     * 특정 카테고리 인기 상품 조회 (제외 상품 없을 때)
     * 주문 완료/배송 완료 기준으로 구매 횟수 순 정렬
     */
    @Query("""
        SELECT p FROM Products p
        LEFT JOIN OrderItems oi ON oi.products = p
        LEFT JOIN oi.orders o
        WHERE p.petCategory = :petCategory
          AND (o.orderStatus IN ('PAYMENT_COMPLETED', 'PREPARING', 'READY_FOR_SHIPMENT', 'IN_DELIVERY', 'DELIVERED') OR o IS NULL)
        GROUP BY p
        ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, p.id ASC
        """)
    List<Products> findTopPopularProductsByCategory(
            @Param("petCategory") PetCategory petCategory,
            Pageable pageable
    );

    /**
     * 전체 인기 상품 조회 (제외 상품 있을 때)
     * 주문 완료/배송 완료 기준으로 구매 횟수 순 정렬
     */
    @Query("""
        SELECT p FROM Products p
        LEFT JOIN OrderItems oi ON oi.products = p
        LEFT JOIN oi.orders o
        WHERE (o.orderStatus IN ('PAYMENT_COMPLETED', 'PREPARING', 'READY_FOR_SHIPMENT', 'IN_DELIVERY', 'DELIVERED') OR o IS NULL)
          AND p.id NOT IN :excludeProductIds
        GROUP BY p
        ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, p.id ASC
        """)
    List<Products> findTopPopularProductsExcluding(
            @Param("excludeProductIds") List<String> excludeProductIds,
            Pageable pageable
    );

    /**
     * 전체 인기 상품 조회 (제외 상품 없을 때) - 빈 장바구니용
     * 주문 완료/배송 완료 기준으로 구매 횟수 순 정렬
     */
    @Query("""
        SELECT p FROM Products p
        LEFT JOIN OrderItems oi ON oi.products = p
        LEFT JOIN oi.orders o
        WHERE (o.orderStatus IN ('PAYMENT_COMPLETED', 'PREPARING', 'READY_FOR_SHIPMENT', 'IN_DELIVERY', 'DELIVERED') OR o IS NULL)
        GROUP BY p
        ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, p.id ASC
        """)
    List<Products> findTopPopularProductsAll(Pageable pageable);

    /**
     * 상품별 총 구매 수량 조회 (추천 응답용)
     */
    @Query("""
        SELECT COALESCE(SUM(oi.quantity), 0) 
        FROM OrderItems oi 
        JOIN oi.orders o
        WHERE oi.products.id = :productId
        AND o.orderStatus IN ('PAYMENT_COMPLETED', 'PREPARING', 'READY_FOR_SHIPMENT', 'IN_DELIVERY', 'DELIVERED')
        """)
    Long getTotalPurchaseCountByProductId(@Param("productId") String productId);

    /**
     * 상품의 첫 번째 이미지 URL 조회 (썸네일용)
     * ProductsImages -> Images 경로로 조회
     */
    @Query("""
        SELECT i.imageUrl
        FROM ProductsImages pi
        JOIN pi.images i
        WHERE pi.products.id = :productId
        ORDER BY pi.createdAt ASC
        """)
    List<String> findFirstImageUrlByProductId(@Param("productId") String productId);
}