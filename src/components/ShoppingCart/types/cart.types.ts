export interface CartItem {
    id: string
    name: string
    option: string
    price: number
    quantity: number
    image: string
    selected: boolean
}

export interface RecommendedProduct {
    id: string
    name: string
    price: number
    image: string
}
