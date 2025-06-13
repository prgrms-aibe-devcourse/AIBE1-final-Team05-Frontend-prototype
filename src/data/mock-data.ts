import type {Coupon, Order, ReturnOrder, WrittenReview} from "@/components/Account";
import type {OrderItem} from "@/components/OrderPayment";

interface PetInfo {
    name: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

interface ShippingInfo {
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

export interface SavedPet extends PetInfo {
    id: string
    avatar?: string
}

export interface SavedAddress extends ShippingInfo {
    id: string
    label: string
}

export const savedPets: SavedPet[] = [
    {
        id: "1",
        name: "Buddy",
        breed: "golden_retriever",
        age: "3",
        gender: "male",
        hasAllergies: false,
        healthCondition: "Neutered, healthy",
        specialRequests: "Prefers smaller pieces",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "2",
        name: "Luna",
        breed: "labrador",
        age: "2",
        gender: "female",
        hasAllergies: true,
        healthCondition: "Allergic to chicken",
        specialRequests: "Extra crunchy texture",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "3",
        name: "Max",
        breed: "poodle",
        age: "5",
        gender: "male",
        hasAllergies: false,
        healthCondition: "Senior dog, joint supplements",
        specialRequests: "Soft treats preferred",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export const savedAddresses: SavedAddress[] = [
    {
        id: "1",
        label: "Home",
        fullName: "John Smith",
        address: "123 Main Street",
        city: "New York",
        postalCode: "10001",
        phoneNumber: "+1 (555) 123-4567",
    },
    {
        id: "2",
        label: "Work",
        fullName: "John Smith",
        address: "456 Business Ave, Suite 200",
        city: "New York",
        postalCode: "10002",
        phoneNumber: "+1 (555) 123-4567",
    },
    {
        id: "3",
        label: "Mom's House",
        fullName: "Mary Smith",
        address: "789 Family Lane",
        city: "Brooklyn",
        postalCode: "11201",
        phoneNumber: "+1 (555) 987-6543",
    },
]

export const mockCoupons: Coupon[] = [
    {
        id: "1",
        title: "카일 환영 10% 할인쿠폰",
        description: "신규 회원 환영 쿠폰",
        discountType: "percentage",
        discountValue: 10,
        expiryDate: "2022-11-16T23:59:00",
        status: "expired",
        category: "기간 만료",
        minOrderAmount: 0,
    },
    {
        id: "2",
        title: "INFCON2024 전용 50% 쿠폰(기한7/3~7/8)",
        description: "인프콘 2024 특별 할인",
        discountType: "percentage",
        discountValue: 50,
        expiryDate: "2024-07-08T23:59:00",
        status: "used",
        category: "기간 만료",
    },
    {
        id: "3",
        title: "메인페이지100원클릭구매상",
        description: "메인페이지 이벤트 쿠폰",
        discountType: "percentage",
        discountValue: 15,
        expiryDate: "2025-05-24T00:24:00",
        status: "used",
        category: "사용 완료",
    },
    {
        id: "4",
        title: "로드맵 3차 김영한스프링입전부 2",
        description: "스프링 강의 할인 쿠폰",
        discountType: "percentage",
        discountValue: 20,
        expiryDate: "2025-06-02T09:14:00",
        status: "expired",
        category: "기간 만료",
    },
    {
        id: "5",
        title: "신규 가입 축하 쿠폰",
        description: "신규 회원 혜택",
        discountType: "percentage",
        discountValue: 15,
        expiryDate: "2025-12-31T23:59:00",
        status: "available",
        category: "사용 가능",
    },
    {
        id: "6",
        title: "여름 특가 할인 쿠폰",
        description: "여름 시즌 특별 할인",
        discountType: "fixed",
        discountValue: 5000,
        expiryDate: "2025-08-31T23:59:00",
        status: "available",
        category: "사용 가능",
        minOrderAmount: 30000,
    },
    {
        id: "7",
        title: "만료 임박 쿠폰",
        description: "곧 만료되는 쿠폰",
        discountType: "percentage",
        discountValue: 25,
        expiryDate: "2025-06-15T23:59:00",
        status: "available",
        category: "만료 임박",
        isExpiringSoon: true,
    },
]

export const mockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "20250528001",
        date: "2025. 5. 28 주문",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "5/29(목) 도착",
        products: [
            {
                id: "1",
                name: "티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라 커리 170g 세트, 1세트",
                price: 0,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 0,
    },
    {
        id: "2",
        orderNumber: "20250307001",
        date: "2025. 3. 7 주문",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "3/8(토) 도착",
        products: [
            {
                id: "2",
                name: "오리통다리 껌",
                price: 28800,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 28800,
    },
]

export const mockReturnOrders: ReturnOrder[] = [
    {
        id: "1",
        cancelDate: "2022/7/23",
        orderDate: "2022/7/23",
        orderNumber: "29000146282236",
        products: [
            {
                id: "1",
                name: "셀리본 프리미엄 롤 포킹 헤어브러쉬",
                detail: "셀리본 프리미엄 토모 롤 포킹 헤어브러쉬, 1호, 1개",
                quantity: "1개",
                price: "8,260 원",
                status: "취소완료",
            },
        ],
    },
    {
        id: "2",
        cancelDate: "2022/5/04",
        orderDate: "2022/5/04",
        orderNumber: "29000137596003",
        products: [
            {
                id: "2",
                name: "곰곰 매쉬드 포테이토(냉동)",
                detail: "곰곰 매쉬드 포테이토(냉동), 1kg, 1개",
                quantity: "1개",
                price: "6,500 원",
                status: "취소완료",
            },
            {
                id: "3",
                name: "하림 자연실록 무항생제 인증 닭다리살 정육 (냉장)",
                detail: "하림 자연실록 무항생제 인증 닭다리살 정육 (냉장), 350g, 2팩",
                quantity: "1개",
                price: "11,990 원",
                status: "취소완료",
            },
        ],
    },
    {
        id: "3",
        cancelDate: "2022/8/15",
        orderDate: "2022/8/14",
        orderNumber: "29000146282237",
        products: [
            {
                id: "4",
                name: "프리미엄 강아지 사료",
                detail: "로얄캐닌 독 푸드, 2kg, 1개",
                quantity: "2개",
                price: "45,000 원",
                status: "반품완료",
            },
        ],
    },
    {
        id: "4",
        cancelDate: "2022/9/10",
        orderDate: "2022/9/8",
        orderNumber: "29000146282238",
        products: [
            {
                id: "5",
                name: "고양이 장난감 세트",
                detail: "캣닢 마우스 토이, 멀티컬러, 5개입",
                quantity: "1개",
                price: "12,500 원",
                status: "교환완료",
            },
        ],
    },
    {
        id: "5",
        cancelDate: "2022/10/5",
        orderDate: "2022/10/3",
        orderNumber: "29000146282239",
        products: [
            {
                id: "6",
                name: "펫 샴푸",
                detail: "순한 펫 샴푸, 500ml, 1개",
                quantity: "3개",
                price: "28,900 원",
                status: "취소완료",
            },
        ],
    },
    {
        id: "6",
        cancelDate: "2022/11/20",
        orderDate: "2022/11/18",
        orderNumber: "29000146282240",
        products: [
            {
                id: "7",
                name: "강아지 목줄",
                detail: "가죽 목줄, 브라운, M사이즈",
                quantity: "1개",
                price: "35,000 원",
                status: "반품완료",
            },
        ],
    },
]

export const extendedMockOrders: Order[] = [
    {
        id: "1",
        orderNumber: "20250528001",
        date: "2025. 5. 28",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "5/29(목)",
        products: [
            {
                id: "1",
                name: "티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라 커리 170g 세트, 1세트",
                price: 28800,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 28800,
    },
    {
        id: "2",
        orderNumber: "20221004001",
        date: "2022. 10. 4",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "10/4(화)",
        products: [
            {
                id: "2",
                name: "질레트 퓨전 프로쉴드 옐로우 면도기 + 여분날, 1세트",
                price: 11630,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "3",
                name: "로켓와우 미팩토리 3단 돼지코팩, 10개입, 1개",
                price: 11890,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 23520,
    },
    {
        id: "3",
        orderNumber: "20220905001",
        date: "2022. 9. 5",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "9/5(월)",
        products: [
            {
                id: "4",
                name: "내츄럴스파이스 페페로치노 홀, 34g, 1개",
                price: 5950,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 5950,
    },
    {
        id: "4",
        orderNumber: "20220815001",
        date: "2022. 8. 15",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "8/16(화)",
        products: [
            {
                id: "5",
                name: "프리미엄 강아지 사료",
                price: 45000,
                quantity: 2,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "6",
                name: "고양이 장난감 세트",
                price: 12500,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "7",
                name: "펫 샴푸",
                price: 28900,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 86400,
    },
    {
        id: "5",
        orderNumber: "20220720001",
        date: "2022. 7. 20",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "7/21(목)",
        products: [
            {
                id: "8",
                name: "강아지 목줄",
                price: 35000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 35000,
    },
    {
        id: "6",
        orderNumber: "20220610001",
        date: "2022. 6. 10",
        status: "배송완료",
        statusColor: "success",
        deliveryDate: "6/11(토)",
        products: [
            {
                id: "9",
                name: "고양이 모래",
                price: 18000,
                quantity: 2,
                image: "/placeholder.svg?height=80&width=80",
            },
            {
                id: "10",
                name: "펫 간식",
                price: 22000,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
            },
        ],
        total: 40000,
    },
]

export const orderItems: OrderItem[] = [
    {
        id: "1",
        name: "Handmade Chicken Treats",
        quantity: 2,
        price: 30.0,
        image: "/placeholder.svg?height=64&width=64",
    },
    {
        id: "2",
        name: "Organic Beef Jerky",
        quantity: 1,
        price: 15.0,
        image: "/placeholder.svg?height=64&width=64",
    },
]

export const mockWrittenReviews: WrittenReview[] = [
    {
        id: "1",
        productName:
            "티아시아가진 치킨 마누카 커리 170g + 게살 푸팟퐁 커리 170g + 비프 마살라 커리 170g + 스파이시 비프 마살라 커리 170g 세트, 1세트",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 4,
        reviewDate: "2025.06.13",
        reviewText: "3분 카레보다 약간 비싸데 큰 차이점은 없어서 조금 아쉽긴했지만 괜찮았습니다",
        isEditable: true,
    },
    {
        id: "2",
        productName: "질레트 퓨전 프로쉴드 옐로우 면도기 + 여분날, 1세트",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 5,
        reviewDate: "2025.05.28",
        reviewText: "면도가 정말 깔끔하게 잘 됩니다. 여분날도 함께 있어서 오래 사용할 수 있을 것 같아요.",
        summary: "면도 깔끔하고 좋아요",
        isEditable: true,
    },
    {
        id: "3",
        productName: "미팩토리 3단 돼지코팩, 10개입, 1개",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 3,
        reviewDate: "2025.05.15",
        reviewText: "효과는 있는 것 같은데 생각보다 자극적이네요. 민감한 피부에는 조금 부담스러울 수 있어요.",
        isEditable: true,
    },
    {
        id: "4",
        productName: "곰곰 매쉬드 포테이토(냉동), 1kg, 1개",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 4,
        reviewDate: "2025.04.20",
        reviewText: "간편하게 해먹기 좋아요. 맛도 괜찮고 양도 충분합니다.",
        summary: "간편하고 맛있어요",
        isEditable: true,
    },
    {
        id: "5",
        productName: "하림 자연실록 무항생제 인증 닭다리살 정육 (냉장), 350g, 2팩",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 5,
        reviewDate: "2025.04.10",
        reviewText: "신선하고 품질이 좋습니다. 요리해서 먹으니 정말 맛있어요.",
        isEditable: true,
    },
    {
        id: "6",
        productName: "프리미엄 강아지 사료, 2kg, 1개",
        productImage: "/placeholder.svg?height=80&width=80",
        rating: 4,
        reviewDate: "2025.03.25",
        reviewText: "우리 강아지가 잘 먹어요. 소화도 잘 되는 것 같습니다.",
        summary: "강아지가 좋아해요",
        isEditable: true,
    },
]