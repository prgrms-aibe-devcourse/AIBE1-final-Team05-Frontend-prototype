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
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
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
    statusColor: string
    deliveryDate: string
    products: Product[]
    total: number
}