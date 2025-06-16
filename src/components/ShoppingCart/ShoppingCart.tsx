"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Breadcrumbs, Container, Typography, Link, Button, Modal } from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import type { CartItem, RecommendedProduct } from "./types/cart.types"
import type { Pet } from "../Account/index" // Account 타입에서 import
import CartItemList from "./CartItemList"
import EmptyCart from "./EmptyCart"
import OrderSummary from "./OrderSummary"
import RecommendedProducts from "./RecommendedProducts"
import AIComparisonModal from "./AIComparisonModal"

interface ShoppingCartProps {
    pets?: Pet[] // props로 전달받는 펫 정보
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ pets = [] }) => {
    const navigate = useNavigate() // React Router 네비게이션 훅 추가
    // 상태 관리 (CartItem에 petType 필드 추가)
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "닭고기 육포 간식",
            option: "대용량",
            price: 12990,
            quantity: 2,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCQEf71hk9m0w23j83x5tXwCamyvp3ZRQE-Gn6mURnDhwsrZ2iVxIlPzb-cIXTc2Nb06JfuTnZLas9esghplzH7niN5KZna2omsb_5oGsE_F94elQt3t7vR8aDqwuweZnhF8CN6_-2kZDZuGuwEv3eYTWWmPS7H1vyMiLoW-JUCHYCJjh1NTQGyaNWL8p18oXQ1tftvd_-xUXDPuCWj00PDJpf38YtYUsKVDhySccZYlQanbhc4yx2irM_q_q3tMZawnypnNa7SGnI",
            selected: false,
            petType: "강아지" // 추가된 필드
        },
        {
            id: "2",
            name: "연어 & 고구마 트릿",
            option: "일반",
            price: 9990,
            quantity: 1,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDc-p_3A9etPWhm2pKuNp8uokcJGVXdaQFWsESe3PIIF1CvVnu_LCynYZaUz7rS-M8Z_VE5yxHvwnUWdwW5bYbT9RDYiOXhCy-_-Hfj8XZHBMYoGRWnX_qquYWlm_c17C1njRiOeISCM-pB0AWCOwn7WO6ztSY7FrxdslQhRTq0_KXd6ld2aLNLogn7HUywuT3PmibMR7ISRDEB2V7fYKy4mdWQuFEHggsy8_20bbvK7obANl4ptmYanm0qrthM7EC40-7ZccpSayY",
            selected: false,
            petType: "고양이" // 추가된 필드
        },
        {
            id: "3",
            name: "소고기 저키 스틱",
            option: "중형견용",
            price: 15990,
            quantity: 1,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAin29om5OwCRLqHjfWNZuHdAMFXq-xMJdMh64LSS7pa9YFMqpezCqmuwy-IhkaZ0ft6ZTmsgR4yDJdmYsemZ5t3QzkP7APXMlSvZ4yvlfTiD_4B1VrhE-0bae07KnzqZMScfh6z2xLtJ2g8PYSX0tDnFs4y-a2jYZCxH6QVpH4vMjLebxU0ENWERJb93wGr9105HRWJy9Iq3Iw0usGGrp3ds2eVBN3EdFZJ3Lr6MFLwcRQMFPwBupQ5bnyIl_g9asnJuhUzmq5Pzw",
            selected: false,
            petType: "강아지" // 추가된 필드
        },
        {
            id: "4",
            name: "참치 크런치 볼",
            option: "소형",
            price: 8990,
            quantity: 2,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDrIOlKYAPwL8tOlLcZSfZ0sTXCaAJVkCqZ3GuctaAouZ9ELKxz3oDyqR8yzxyvtejrPLjb4DP2wvUmj130lZlTfmdPkPRR9eh_1frX6piUSXIsFAS2q6BCEIu-zOGhmsq_pXaehHcNFK2a8bmEDWQXt7QxSjeGZFfy9EQUbGQK78or5vS7NPmHyePfGPfYqo08ltZNKFVHnEa-J9Ugmsm5nhEBcNWP8NJKTkxjaXeV2BLHFiFVSTk4rEVsCeZX7JEM-_yWZ4dqbtU",
            selected: false,
            petType: "고양이" // 추가된 필드
        }
    ])

    const [comparisonOpen, setComparisonOpen] = useState<boolean>(false)
    const [selectAll, setSelectAll] = useState<boolean>(false)

    // 임시 펫 데이터 (props로 전달받지 않은 경우 사용)
    const defaultPets: Pet[] = [
        {
            id: "1",
            name: "뽀삐",
            category: "dogs",
            breed: "골든리트리버",
            age: "3",
            gender: "female",
            hasAllergies: true,
            healthCondition: "건강함, 관절 주의",
            specialRequests: "작은 크기로 잘라서 주세요"
        },
        {
            id: "2",
            name: "나비",
            category: "cats",
            breed: "페르시안",
            age: "5",
            gender: "female",
            hasAllergies: false,
            healthCondition: "털빠짐 주의",
            specialRequests: "부드러운 식감 선호"
        }
    ]

    const userPets = pets.length > 0 ? pets : defaultPets

    // 추천 상품
    const recommendedProducts: RecommendedProduct[] = [
        {
            id: "rec1",
            name: "소고기 & 당근 츄",
            price: 14990,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAin29om5OwCRLqHjfWNZuHdAMFXq-xMJdMh64LSS7pa9YFMqpezCqmuwy-IhkaZ0ft6ZTmsgR4yDJdmYsemZ5t3QzkP7APXMlSvZ4yvlfTiD_4B1VrhE-0bae07KnzqZMScfh6z2xLtJ2g8PYSX0tDnFs4y-a2jYZCxH6QVpH4vMjLebxU0ENWERJb93wGr9105HRWJy9Iq3Iw0usGGrp3ds2eVBN3EdFZJ3Lr6MFLwcRQMFPwBupQ5bnyIl_g9asnJuhUzmq5Pzw",
        },
        {
            id: "rec2",
            name: "인터랙티브 퍼즐 토이",
            price: 19990,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAKiHIP63C4ILgJFvv64KKOmj8o1PGzRRcZ6EojdiwpLGj5vvnwrNE85Ge3RhijiEHUHAcSQmBTKmcBd0rfaqch0WrThp5oTMdskn6Ptonq03HgUT8OpNT9tnqQqyqQh0BkUDlWB0Jp3_-y-V4zdDD8R_XBIs2p5VTlvlOOuzdWt8tkscEgIdej_-6Bg3VHdeUkH2Fb6kUGxWNtHFjVD39x-L45c8X0Y9tBMog87EldpXrJhbzEWIz5m6biR1SxIoj4i0oWz7L2VNU",
        },
        {
            id: "rec3",
            name: "그레인프리 연어 레시피",
            price: 29990,
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC_Ofdjs276QZH3kKvoOjQu2MlW7HEDj4p-QE75-IyviIvCO_ECVzNT8ToyM6vWBi_kCR_bW_M8V4Ay_CTxWxwHkRLdsipI0cENEOLI-3p6rD59OL3P1TKQ0aaQrVHIqbE10aPrC7IJO84ydI5uGrKJQBBhaCk29lQY089wCT1Tt_4RlFu9HWCdI0ITTyzze28XUZXR5JwwixmMdl5U5-4bAtQ0eX76IyADVQmO8ASuvVI1D6YG81L5S-aw_tSpUC2O5BPp9QQRRYU",
        },
        {
            id: "rec4",
            name: "유기농 칠면조 파테",
            price: 11500,
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
            setSelectAll(updated.every((item) => item.selected) && updated.length > 0)
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
        setCartItems((items) => {
            const updated = items.filter((item) => item.id !== id)
            setSelectAll(updated.every((item) => item.selected) && updated.length > 0)
            return updated
        })
    }

    // 선택된 상품 삭제
    const handleRemoveSelected = () => {
        setCartItems((items) => {
            const updated = items.filter((item) => !item.selected)
            setSelectAll(false)
            return updated
        })
    }

    // AI 상품 비교 기능 (업데이트된 버전)
    const handleCompareSelected = () => {
        // AI 비교 모달 열기 (제품 선택 제한 없음)
        setComparisonOpen(true)
    }

    // 가격 계산
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    // 결제 처리
    const handleCheckout = () => {
        navigate("/orderpayment") // 주문 결제 페이지로 이동
    }

    // 쇼핑 계속하기
    const handleContinueShopping = () => {
        navigate("/productsList") // 상품 목록 페이지로 이동
    }

    // 가격 포맷팅 함수
    const formatPrice = (price: number) => {
        return `${price.toLocaleString()}원`
    }

    return (
        <Container maxWidth="lg" sx={{ py: 3, mt: 2 }}>
            {/* 브레드크럼 */}
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
                <Link
                    href="#"
                    color="inherit"
                    sx={{
                        textDecoration: "none",
                        fontSize: "0.875rem",
                        color: "#666",
                    }}
                >
                    쇼핑
                </Link>
                <Typography color="text.primary" sx={{ fontSize: "0.875rem" }}>
                    장바구니
                </Typography>
            </Breadcrumbs>

            {/* 페이지 제목 */}
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    mb: 4,
                    fontFamily: '"Plus Jakarta Sans", "Noto Sans KR", sans-serif',
                }}
            >
                장바구니
            </Typography>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                {/* 장바구니 상품 목록 */}
                <Box sx={{ flex: "1 1 65%" }}>
                    {cartItems.length > 0 ? (
                        <>
                            <CartItemList
                                cartItems={cartItems}
                                selectAll={selectAll}
                                onSelectAll={handleSelectAll}
                                onItemSelect={handleItemSelect}
                                onQuantityChange={handleQuantityChange}
                                onRemoveItem={handleRemoveItem}
                                formatPrice={formatPrice}
                            />

                            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleRemoveSelected}
                                    startIcon={<span>🗑️</span>}
                                    sx={{
                                        borderColor: "#ddd",
                                        color: "#666",
                                        "&:hover": {
                                            borderColor: "#ccc",
                                            backgroundColor: "#f9f9f9",
                                        },
                                    }}
                                >
                                    선택한 제품 삭제
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCompareSelected}
                                    startIcon={<span>🤖</span>}
                                    sx={{
                                        borderColor: "#e89830",
                                        color: "#e89830",
                                        backgroundColor: "#fff",
                                        "&:hover": {
                                            borderColor: "#d18727",
                                            backgroundColor: "#fff8f0",
                                        },
                                    }}
                                >
                                    AI 제품 비교
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <EmptyCart onContinueShopping={handleContinueShopping} />
                    )}
                </Box>

                {/* 주문 요약 */}
                <Box sx={{ flex: "1 1 35%" }}>
                    <OrderSummary
                        total={calculateTotal()}
                        formatPrice={formatPrice}
                        onCheckout={handleCheckout}
                        onContinueShopping={handleContinueShopping}
                    />
                </Box>
            </Box>

            {/* 추천 상품 섹션 */}
            <Box sx={{ mt: 8 }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        mb: 3,
                        fontFamily: '"Plus Jakarta Sans", "Noto Sans KR", sans-serif',
                    }}
                >
                    함께 구매하면 좋은 상품
                </Typography>
                <RecommendedProducts products={recommendedProducts} formatPrice={formatPrice} />
            </Box>

            {/* AI 제품 비교 모달 */}
            <AIComparisonModal
                open={comparisonOpen}
                onClose={() => setComparisonOpen(false)}
                cartItems={cartItems}
                pets={userPets}
            />
        </Container>
    )
}

export default ShoppingCart