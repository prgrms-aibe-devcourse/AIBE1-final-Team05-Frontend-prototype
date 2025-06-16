"use client"

import type React from "react"
import { useState } from "react"
import {
    Modal,
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Paper,
    IconButton
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import type { CartItem } from "./types/cart.types"
import type { Pet } from "../Account/index" // Account 타입에서 import
import CategorySelection from "./AIComparison/CategorySelection"
import ProductSelection from "./AIComparison/ProductSelection"
import ComparisonResult from "./AIComparison/ComparisonResult"

interface AIComparisonModalProps {
    open: boolean
    onClose: () => void
    cartItems: CartItem[]
    pets: Pet[]
}

const steps = [
    "카테고리 선택",
    "제품 선택",
    "비교 결과"
]

const AIComparisonModal: React.FC<AIComparisonModalProps> = ({
                                                                 open,
                                                                 onClose,
                                                                 cartItems,
                                                                 pets
                                                             }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState<"강아지" | "고양이" | null>(null)
    const [selectedProducts, setSelectedProducts] = useState<{
        product1: CartItem | null
        product2: CartItem | null
    }>({
        product1: null,
        product2: null
    })

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
        setSelectedCategory(null)
        setSelectedProducts({ product1: null, product2: null })
    }

    const handleModalClose = () => {
        handleReset()
        onClose()
    }

    // 선택된 카테고리에 맞는 제품들 필터링
    const filteredProducts = selectedCategory
        ? cartItems.filter(item => item.petType === selectedCategory)
        : []

    // 해당 카테고리의 펫 정보 가져오기
    const categoryPets = selectedCategory
        ? pets.filter(pet =>
            (selectedCategory === "강아지" && pet.category === "dogs") ||
            (selectedCategory === "고양이" && pet.category === "cats")
        )
        : []

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <CategorySelection
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                        cartItems={cartItems}
                    />
                )
            case 1:
                return (
                    <ProductSelection
                        products={filteredProducts}
                        selectedProducts={selectedProducts}
                        onProductSelect={setSelectedProducts}
                    />
                )
            case 2:
                return (
                    <ComparisonResult
                        selectedProducts={selectedProducts}
                        pets={categoryPets}
                        category={selectedCategory}
                    />
                )
            default:
                return null
        }
    }

    const isStepValid = () => {
        switch (activeStep) {
            case 0:
                return selectedCategory !== null
            case 1:
                return selectedProducts.product1 !== null && selectedProducts.product2 !== null
            case 2:
                return true
            default:
                return false
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            aria-labelledby="ai-comparison-modal"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2
            }}
        >
            <Paper
                sx={{
                    width: "90%",
                    maxWidth: 900,
                    maxHeight: "90vh",
                    overflow: "auto",
                    p: 4,
                    position: "relative",
                    borderRadius: 3
                }}
            >
                {/* 헤더 */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", color: "#1b150e" }}>
                        AI 제품 비교 분석
                    </Typography>
                    <IconButton onClick={handleModalClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* 스테퍼 */}
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* 단계별 컨텐츠 */}
                <Box sx={{ minHeight: 400, mb: 3 }}>
                    {getStepContent(activeStep)}
                </Box>

                {/* 네비게이션 버튼 */}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ color: "#57493a" }}
                    >
                        이전
                    </Button>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleModalClose}
                                sx={{
                                    bgcolor: "#e89830",
                                    "&:hover": { bgcolor: "#d18727" }
                                }}
                            >
                                완료
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepValid()}
                                sx={{
                                    bgcolor: "#e89830",
                                    "&:hover": { bgcolor: "#d18727" }
                                }}
                            >
                                다음
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Modal>
    )
}

export default AIComparisonModal