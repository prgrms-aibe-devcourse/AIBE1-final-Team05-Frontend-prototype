"use client"

import type React from "react"
import { Box, Typography, Card, CardContent, Grid, Chip, Divider, Paper } from "@mui/material"
import PetsIcon from "@mui/icons-material/Pets"
import CompareIcon from "@mui/icons-material/Compare"
import RecommendIcon from "@mui/icons-material/Recommend"
import type { CartItem } from "../types/cart.types"
import type { Pet } from "../../Account/index"

interface ComparisonResultProps {
    selectedProducts: {
        product1: CartItem | null
        product2: CartItem | null
    }
    pets: Pet[]
    category: "강아지" | "고양이" | null
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({
                                                               selectedProducts,
                                                               pets,
                                                               category
                                                           }) => {
    const { product1, product2 } = selectedProducts

    if (!product1 || !product2 || !category) {
        return (
            <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" sx={{ color: "#d32f2f" }}>
                    비교할 제품 정보가 부족합니다
                </Typography>
            </Box>
        )
    }

    // 임시 비교 분석 결과 생성
    const generateComparisonAnalysis = () => {
        const analysisTexts = {
            "강아지": {
                nutrition: "두 제품 모두 강아지에게 필요한 고품질 단백질을 제공합니다. 닭고기 기반 제품은 소화가 쉽고 알레르기 반응이 적으며, 연어 기반 제품은 오메가-3가 풍부하여 피모 건강에 도움이 됩니다.",
                suitability: "활동적인 강아지에게는 닭고기 제품이, 피부 트러블이 있는 강아지에게는 연어 제품이 더 적합할 수 있습니다.",
                recommendation: "반려견의 활동량과 건강 상태를 고려하여 선택하세요."
            },
            "고양이": {
                nutrition: "고양이는 육식동물이므로 두 제품 모두 높은 단백질 함량을 제공합니다. 연어는 타우린이 풍부하여 심장 건강에 도움이 되며, 닭고기는 소화가 잘 되어 민감한 위장을 가진 고양이에게 적합합니다.",
                suitability: "실내 고양이에게는 연어 제품이, 활동적인 고양이에게는 닭고기 제품이 더 좋을 수 있습니다.",
                recommendation: "고양이의 나이와 활동 패턴을 고려하여 결정하세요."
            }
        }

        return analysisTexts[category]
    }

    const analysis = generateComparisonAnalysis()

    // 등록된 펫 정보에 따른 개인화된 추천
    const getPersonalizedRecommendation = () => {
        if (pets.length === 0) {
            return "등록된 반려동물 정보가 없어 일반적인 추천을 제공합니다."
        }

        const pet = pets[0] // 첫 번째 펫 정보 사용
        let recommendation = `${pet.name}(${pet.breed}, ${pet.age}세)를 위한 추천: `

        if (pet.hasAllergies) {
            recommendation += "알레르기가 있으므로 성분을 신중히 확인하시고, "
        }

        if (pet.healthCondition.includes("민감") || pet.hasAllergies) {
            recommendation += `${product1.name}이 더 적합할 수 있습니다.`
        } else {
            recommendation += `${product2.name}을 추천합니다.`
        }

        if (pet.specialRequests) {
            recommendation += ` 특별 요청사항(${pet.specialRequests})을 고려하여 선택하세요.`
        }

        return recommendation
    }

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3, color: "#1b150e", fontWeight: 600 }}>
                AI 제품 비교 분석 결과
            </Typography>

            {/* 등록된 펫 정보 */}
            {pets.length > 0 && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: "#f9f6f2", border: "1px solid #e7ddd0" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <PetsIcon sx={{ color: "#e89830" }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            등록된 {category} 정보
                        </Typography>
                    </Box>
                    {pets.map((pet) => (
                        <Box key={pet.id} sx={{ mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {pet.name} ({pet.breed}, {pet.age}세, {pet.gender === "male" ? "수컷" : "암컷"})
                            </Typography>
                            {pet.hasAllergies && (
                                <Chip label="알레르기 보유" size="small" color="warning" sx={{ mr: 1, mt: 0.5 }} />
                            )}
                            {pet.healthCondition && (
                                <Typography variant="caption" sx={{ color: "#57493a", display: "block" }}>
                                    건강상태: {pet.healthCondition}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Paper>
            )}

            {/* 선택된 제품 비교 */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <Card sx={{ border: "2px solid #e89830" }}>
                        <CardContent>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#e89830" }}>
                                제품 1
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                <Box
                                    component="img"
                                    src={product1.image}
                                    alt={product1.name}
                                    sx={{ width: 60, height: 60, borderRadius: 1, objectFit: "cover" }}
                                />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {product1.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#57493a", display: "block" }}>
                                        {product1.option}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#e89830" }}>
                                        {product1.price.toLocaleString()}원
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ border: "2px solid #6b5b95" }}>
                        <CardContent>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: "#6b5b95" }}>
                                제품 2
                            </Typography>
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                <Box
                                    component="img"
                                    src={product2.image}
                                    alt={product2.name}
                                    sx={{ width: 60, height: 60, borderRadius: 1, objectFit: "cover" }}
                                />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {product2.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#57493a", display: "block" }}>
                                        {product2.option}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#6b5b95" }}>
                                        {product2.price.toLocaleString()}원
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* 비교 분석 */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <CompareIcon sx={{ color: "#e89830" }} />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            영양성분 및 특징 분석
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {analysis.nutrition}
                    </Typography>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {analysis.suitability}
                    </Typography>
                </CardContent>
            </Card>

            {/* 가격 비교 */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        가격 비교
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f9f6f2", borderRadius: 1 }}>
                                <Typography variant="body2" sx={{ color: "#57493a" }}>
                                    제품 1
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#e89830" }}>
                                    {product1.price.toLocaleString()}원
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f5f3ff", borderRadius: 1 }}>
                                <Typography variant="body2" sx={{ color: "#57493a" }}>
                                    제품 2
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: "#6b5b95" }}>
                                    {product2.price.toLocaleString()}원
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: "#e8f5e8", borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                            {product1.price < product2.price
                                ? `제품 1이 ${(product2.price - product1.price).toLocaleString()}원 더 저렴합니다`
                                : product1.price > product2.price
                                    ? `제품 2가 ${(product1.price - product2.price).toLocaleString()}원 더 저렴합니다`
                                    : "두 제품의 가격이 동일합니다"
                            }
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* 개인화된 추천 */}
            <Card sx={{ bgcolor: "#fff8f0", border: "2px solid #e89830" }}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <RecommendIcon sx={{ color: "#e89830" }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#e89830" }}>
                            AI 추천 결과
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {getPersonalizedRecommendation()}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#d18727" }}>
                        💡 {analysis.recommendation}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ComparisonResult