// 타입 정의
export interface CustomerMessage {
    id: number
    text: string
    sender: "customer" | "admin"
    time: string
}

export interface CustomerInquiry {
    id: number
    name: string
    avatar: string
    lastMessage: string
    unreadCount: number
    isOnline: boolean
    messages: CustomerMessage[]
}

export interface ProductReview {
    id: number
    customerName: string
    customerAvatar: string
    rating: number
    reviewText: string
    reviewDate: string
    images: string[]
    helpful: number
}

export interface Product {
    id: number
    name: string
    image: string
    averageRating: number
    totalReviews: number
    reviews: ProductReview[]
}

export interface SidebarItem {
    id: number
    label: string
    icon: string
    active?: boolean
}

export interface ReviewStats {
    totalReviews: number
    averageRating: number
    ratingCounts: {
        [key: number]: number
    }
}
