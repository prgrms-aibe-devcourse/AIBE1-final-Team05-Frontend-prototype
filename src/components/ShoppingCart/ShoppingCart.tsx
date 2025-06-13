"use client"

import type React from "react"
import { useState } from "react"
import { Box, Breadcrumbs, Grid, Link, Typography } from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import type { CartItem, Coupon, RecommendedProduct } from "./types/cart.types"
import CartItemList from "./CartItemList"
import ProductComparison from "./ProductComparison"
import CouponSelector from "./CouponSelector"
import CartSummary from "./CartSummary"
import RecommendedProducts from "./RecommendedProducts"

const ShoppingCart: React.FC = () => {
    // 상태 관리
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "Chicken Jerky Bites",
            option: "Large Bag",
            price: 12.99,
            quantity: 2,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCQEf71hk9m0w23j83x5tXwCamyvp3ZRQE-Gn6mURnDhwsrZ2iVxIlPzb-cIXTc2Nb06JfuTnZLas9esghplzH7niN5KZna2omsb_5oGsE_F94elQt3t7vR8aDqwuweZnhF8CN6_-2kZDZuGuwEv3eYTWWmPS7H1vyMiLoW-JUCHYCJjh1NTQGyaNWL8p18oXQ1tftvd_-xUXDPuCWj00PDJpf38YtYUsKVDhySccZYlQanbhc4yx2irM_q_q3tMZawnypnNa7SGnI",
            selected: false,
        },
        {
            id: "2",
            name: "Salmon & Sweet Potato Treats",
            option: "Regular",
            price: 9.99,
            quantity: 1,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDc-p_3A9etPWhm2pKuNp8uokcJGVXdaQFWsESe3PIIF1CvVnu_LCynYZaUz7rS-M8Z_VE5yxHvwnUWdwW5bYbT9RDYiOXhCy-_-Hfj8XZHBMYoGRWnX_qquYWlm_c17C1njRiOeISCM-pB0AWCOwn7WO6ztSY7FrxdslQhRTq0_KXd6ld2aLNLogn7HUywuT3PmibMR7ISRDEB2V7fYKy4mdWQuFEHggsy8_20bbvK7obANl4ptmYanm0qrthM7EC40-7ZccpSayY",
            selected: false,
        },
    ])

    // 사용 가능한 쿠폰 목록
    const [availableCoupons] = useState<Coupon[]>([
        {
            id: "WELCOME15",
            name: "신규 회원 15% 할인",
            type: "percentage",
            value: 15,
            minAmount: 20,
            description: "20달러 이상 구매 시 15% 할인",
        },
        {
            id: "SAVE5",
            name: "5달러 즉시 할인",
            type: "fixed",
            value: 5,
            minAmount: 30,
            description: "30달러 이상 구매 시 5달러 할인",
        },
        {
            id: "FIRSTTIME20",
            name: "첫 구매 20% 할인",
            type: "percentage",
            value: 20,
            minAmount: 25,
            description: "25달러 이상 첫 구매 시 20% 할인",
        },
    ])

    const [selectedCoupon, setSelectedCoupon] = useState<string>("")
    const [selectAll, setSelectAll] = useState(false)
    const [comparisonOpen, setComparisonOpen] = useState(false)
    const [comparisonResult, setComparisonResult] = useState<string>("")

    // 추천 상품
    const recommendedProducts: RecommendedProduct[] = [
        {
            id: "rec1",
            name: "Beef & Carrot Chews",
            price: 14.99,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAin29om5OwCRLqHjfWNZuHdAMFXq-xMJdMh64LSS7pa9YFMqpezCqmuwy-IhkaZ0ft6ZTmsgR4yDJdmYsemZ5t3QzkP7APXMlSvZ4yvlfTiD_4B1VrhE-0bae07KnzqZMScfh6z2xLtJ2g8PYSX0tDnFs4y-a2jYZCxH6QVpH4vMjLebxU0ENWERJb93wGr9105HRWJy9Iq3Iw0usGGrp3ds2eVBN3EdFZJ3Lr6MFLwcRQMFPwBupQ5bnyIl_g9asnJuhUzmq5Pzw",
        },
        {
            id: "rec2",
            name: "Interactive Puzzle Toy",
            price: 19.99,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAKiHIP63C4ILgJFvv64KKOmj8o1PGzRRcZ6EojdiwpLGj5vvnwrNE85Ge3RhijiEHUHAcSQmBTKmcBd0rfaqch0WrThp5oTMdskn6Ptonq03HgUT8OpNT9tnqQqyqQh0BkUDlWB0Jp3_-y-V4zdDD8R_XBIs2p5VTlvlOOuzdWt8tkscEgIdej_-6Bg3VHdeUkH2Fb6kUGxWNtHFjVD39x-L45c8X0Y9tBMog87EldpXrJhbzEWIz5m6biR1SxIoj4i0oWz7L2VNU",
        },
        {
            id: "rec3",
            name: "Grain-Free Salmon Recipe",
            price: 29.99,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Ofdjs276QZH3kKvoOjQu2MlW7HEDj4p-QE75-IyviIvCO_ECVzNT8ToyM6vWBi_kCR_bW_M8V4Ay_CTxWxwHkRLdsipI0cENEOLI-3p6rD59OL3P1TKQ0aaQrVHIqbE10aPrC7IJO84ydI5uGrKJQBBhaCk29lQY089wCT1Tt_4RlFu9HWCdI0ITTyzze28XUZXR5JwwixmMdl5U5-4bAtQ0eX76IyADVQmO8ASuvVI1D6YG81L5S-aw_tSpUC2O5BPp9QQRRYU",
        },
        {
            id: "rec4",
            name: "Organic Turkey Pate",
            price: 11.5,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDrIOlKYAPwL8tOlLcZSfZ0sTXCaAJVkCqZ3GuctaAouZ9ELKxz3oDyqR8yzxyvtejrPLjb4DP2wvUmj130lZlTfmdPkPRR9eh_1frX6piUSXIsFAS2q6BCEIu-zOGhmsq_pXaehHcNFK2a8bmEDWQXt7QxSjeGZFfy9EQUbGQK78or5vS7NPmHyePfGPfYqo08ltZNKFVHnEa-J9Ugmsm5nhEBcNWP8NJKTkxjaXeV2BLHFiFVSTk4rEVsCeZX7JEM-_yWZ4dqbtU",
        },
    ]

    // 전체 선택/해제
    const handleSelectAll = () => {
        const newSelectAll = !selectAll
        setSelectAll(newSelectAll)
        setCartItems((items) => items.map((item) => ({ ...item, selected: newSelectAll })))
    }

    // 개별 상품 선택/해제
    const handleItemSelect = (id: string) => {
        setCartItems((items) => {
            const updated = items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
            setSelectAll(updated.every((item) => item.selected))
            return updated
        })
    }

    // 수량 변경
    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    // 상품 삭제
    const handleRemoveItem = (id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    // 선택된 상품 삭제
    const handleRemoveSelected = () => {
        setCartItems((items) => items.filter((item) => !item.selected))
        setSelectAll(false)
    }

    // 가격 계산
    const calculateSubtotal = () => {
        return cartItems.filter((item) => item.selected).reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const calculateDiscount = () => {
        if (!selectedCoupon) return 0

        const coupon = availableCoupons.find((c) => c.id === selectedCoupon)
        const subtotal = calculateSubtotal()

        if (!coupon || subtotal < coupon.minAmount) return 0

        if (coupon.type === "percentage") {
            return subtotal * (coupon.value / 100)
        } else {
            return coupon.value
        }
    }

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount()
    }

    // 쿠폰 적용 가능 여부 확인
    const isCouponApplicable = (coupon: Coupon) => {
        return calculateSubtotal() >= coupon.minAmount
    }

    // 상품 비교 기능
    const handleCompareSelected = () => {
        const selectedItems = cartItems.filter((item) => item.selected)
        if (selectedItems.length < 2) {
            alert("비교를 위해서는 최소 2개 상품을 선택해주세요.")
            return
        }

        // 샘플 비교 결과 (실제로는 LLM API 호출)
        const result = `
선택된 상품들의 비교 분석:

${selectedItems.map((item) => `• ${item.name} (${item.option}) - $${item.price}`).join("\n")}

영양성분 및 특징 분석:
이 제품들은 모두 자연 재료로 만들어진 프리미엄 펫 간식입니다. 
Chicken Jerky Bites는 높은 단백질 함량으로 활동적인 반려동물에게 적합하며, 
Salmon & Sweet Potato Treats는 오메가-3가 풍부하여 피모 건강에 도움을 줍니다.

권장사항:
두 제품 모두 우수한 품질의 간식이므로, 반려동물의 선호도와 건강 상태에 따라 선택하시면 됩니다.
`

        setComparisonResult(result)
        setComparisonOpen(true)
    }

    // 결제 처리
    const handleCheckout = () => {
        const selectedItems = cartItems.filter((item) => item.selected)
        if (selectedItems.length === 0) {
            alert("결제를 진행하려면 최소 1개 상품을 선택해주세요.")
            return
        }
        alert("결제 페이지로 이동합니다...")
    }

    // 쇼핑 계속하기
    const handleContinueShopping = () => {
        // 쇼핑 계속하기 로직
        alert("쇼핑 페이지로 이동합니다...")
    }

    // 선택된 쿠폰 이름 가져오기
    const getSelectedCouponName = () => {
        if (!selectedCoupon) return ""
        const coupon = availableCoupons.find((c) => c.id === selectedCoupon)
        return coupon?.name || ""
    }

    return (
        <Box
            sx={{
                bgcolor: "#fcfaf8",
                minHeight: "100vh",
                p: 3,
                maxWidth: "1200px",
                mx: "auto",
            }}
        >
            {/* 브레드크럼 */}
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
                <Link
                    href="#"
                    color="#97784e"
                    sx={{
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        "&:hover": { color: "#e89830" },
                    }}
                >
                    Shop
                </Link>
                <Typography color="#1b150e" sx={{ fontSize: "0.875rem" }}>
                    장바구니
                </Typography>
            </Breadcrumbs>

            {/* 페이지 제목 */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        color: "#1b150e",
                        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
                        mb: 4,
                    }}
                >
                    장바구니
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* 장바구니 테이블 */}
                <Grid item xs={12} lg={8}>
                    <CartItemList
                        cartItems={cartItems}
                        selectAll={selectAll}
                        onSelectAll={handleSelectAll}
                        onItemSelect={handleItemSelect}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                        onRemoveSelected={handleRemoveSelected}
                        onCompareSelected={handleCompareSelected}
                    />

                    {/* AI 비교 결과 */}
                    <ProductComparison
                        open={comparisonOpen}
                        comparisonResult={comparisonResult}
                        onClose={() => setComparisonOpen(false)}
                    />
                </Grid>

                {/* 주문 요약 및 쿠폰 */}
                <Grid item xs={12} lg={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* 쿠폰 선택 */}
                        <CouponSelector
                            availableCoupons={availableCoupons}
                            selectedCoupon={selectedCoupon}
                            onCouponSelect={setSelectedCoupon}
                            isCouponApplicable={isCouponApplicable}
                            discountAmount={calculateDiscount()}
                        />

                        {/* 주문 요약 */}
                        <CartSummary
                            subtotal={calculateSubtotal()}
                            discount={calculateDiscount()}
                            total={calculateTotal()}
                            selectedCouponName={getSelectedCouponName()}
                            onCheckout={handleCheckout}
                            onContinueShopping={handleContinueShopping}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* 추천 상품 섹션 */}
            <RecommendedProducts products={recommendedProducts} />
        </Box>
    )
}

export default ShoppingCart
