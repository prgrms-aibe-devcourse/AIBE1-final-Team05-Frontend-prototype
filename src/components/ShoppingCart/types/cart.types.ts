export interface CartItem {
    id: string
    name: string
    option: string
    price: number
    quantity: number
    image: string
    selected: boolean
    petType: "강아지" | "고양이"  // AI 비교 기능을 위한 필드 추가
}

export interface RecommendedProduct {
    id: string
    name: string
    price: number
    image: string
}

// AI 비교 기능을 위한 새로운 타입들
export interface ComparisonStep {
    step: number
    title: string
    isCompleted: boolean
}

export interface SelectedProducts {
    product1: CartItem | null
    product2: CartItem | null
}

export interface ComparisonResult {
    selectedProducts: SelectedProducts
    petInfo: any // Pet 타입 (Account에서 import)
    analysis: string
    recommendation: string
}