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
    deliveryDate: string // mockOrders 데이터에 따라 string으로 명시했습니다.
    products: Product[] // 위에서 정의한 Product 인터페이스 사용
    total: number
}
