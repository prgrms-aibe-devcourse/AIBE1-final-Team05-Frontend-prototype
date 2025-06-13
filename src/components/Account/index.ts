export interface Address {
    id: string
    label: string
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

export interface Pet {
    id: string
    name: string
    category: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

export type NewPet = Omit<Pet, "id">

export interface PetDialogProps {
    open: boolean
    onClose: () => void
    editingPet: Pet | null
    newPet: NewPet
    setNewPet: (pet: NewPet) => void
    onSubmit: () => void
}

export interface AddressesViewProps {

    addresses: Address[]
    handleEditAddress: (address: Address) => void
    handleDeleteAddress: (id: string) => void
    setAddressDialogOpen: (open: boolean) => void
}


export interface Product {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export interface Order {
    id: string
    orderNumber: string
    date: string
    status: string
    statusColor: "success" | "warning" | "error"
    deliveryDate: string
    total: number
    products: Product[]
}

export interface Coupon {
    id: string
    title: string
    description: string
    discountType: "percentage" | "fixed"
    discountValue: number
    expiryDate: string
    status: "available" | "expired" | "used"
    minOrderAmount?: number
    category: string
    isExpiringSoon?: boolean
}

export type CouponCategory = "all" | "available" | "expiring" | "used-expired"

export interface ReturnInquiryViewProps {
    returnTab: number
    setReturnTab: (tab: number) => void
    setDetailView: (view: string | null) => void
}

export interface ReturnOrder {
    id: string
    cancelDate: string
    orderDate: string
    orderNumber: string
    products: {
        id: string
        name: string
        detail: string
        quantity: string
        price: string
        status: string
    }[]
}

export interface OrdersViewProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    selectedPeriod: string
    setSelectedPeriod: (period: string) => void
    mockOrders: Order[]
    handleOrderAction: (action: string, order: Order) => void
}

export interface ReviewsViewProps {
    mockOrders: Order[]
    handleOrderAction: (action: string, order: Order) => void
}

export interface WrittenReview {
    id: string
    productName: string
    productImage: string
    rating: number
    reviewDate: string
    reviewText: string
    summary?: string
    isEditable: boolean
}