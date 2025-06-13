import type { CustomerInquiry, Product, SidebarItem } from "../types/customer"

// 사이드바 메뉴 항목
export const sidebarItems: SidebarItem[] = [
    { id: 1, label: "상품관리", icon: "inventory" },
    { id: 2, label: "대시보드", icon: "analytics" },
    { id: 3, label: "주문/배송", icon: "local_shipping" },
    { id: 4, label: "정산관리", icon: "account_balance_wallet" },
    { id: 5, label: "고객관리", icon: "people", active: true },
    { id: 6, label: "판매자 정보", icon: "store" },
]

// 고객 문의 데이터
export const customerInquiries: CustomerInquiry[] = [
    {
        id: 1,
        name: "김민지",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj",
        lastMessage: "안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?",
        unreadCount: 1,
        isOnline: true,
        messages: [
            { id: 1, text: "안녕하세요! 강아지 간식을 주문했는데요", sender: "customer", time: "14:20" },
            { id: 2, text: "안녕하세요! 주문 확인했습니다. 어떤 제품을 주문하셨나요?", sender: "admin", time: "14:21" },
            { id: 3, text: "닭가슴살 간식 2팩이요", sender: "customer", time: "14:22" },
            { id: 4, text: "네, 확인했습니다. 내일 오전 중 배송 시작 예정이에요!", sender: "admin", time: "14:23" },
            { id: 5, text: "안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?", sender: "customer", time: "15:30" },
        ],
    },
    {
        id: 2,
        name: "박지훈",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_",
        lastMessage: "강아지 간식 추천 감사합니다!",
        unreadCount: 0,
        isOnline: false,
        messages: [
            { id: 1, text: "혹시 소화가 잘 되는 강아지 간식 추천해주실 수 있나요?", sender: "customer", time: "13:10" },
            { id: 2, text: "물론이죠! 연어 간식이나 고구마 간식을 추천드려요", sender: "admin", time: "13:15" },
            { id: 3, text: "강아지 간식 추천 감사합니다!", sender: "customer", time: "13:20" },
        ],
    },
    {
        id: 3,
        name: "최수현",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCgJD_UB0jy-pWBhRgJxKyp6DWcLjpJGO3Xp17IKuUooeBYAiMI0x_ntEEUtw8_gUXckjrnYdT_VGvaLQEeGW2jixySuctAvRwRzJFoe4mv_7H0LPeTxBt13gNdRbwYi5ZjQIfs-o2nCg4svX07HUraengL8D_3g3hcZJuhAXzpMElX0NojBPvuw9nwCOy0U7vbt3_t_3V6uDjfB01YzLXMAYfIF0lLTcbWpq1Q2F67iteDeHcqw4V5F7VXyL11x_UZZ7Kjhye7xDB-",
        lastMessage: "고양이 간식 문의드립니다.",
        unreadCount: 3,
        isOnline: true,
        messages: [
            { id: 1, text: "고양이가 참치를 좋아하는데 참치 간식 있나요?", sender: "customer", time: "12:30" },
            { id: 2, text: "고양이 간식 문의드립니다.", sender: "customer", time: "14:45" },
            { id: 3, text: "혹시 답변 가능하신가요?", sender: "customer", time: "15:20" },
        ],
    },
    {
        id: 4,
        name: "이준호",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBGP-PWT_bfOxCp3Zl4pHDwAoa5wMXmDR0_jmgKkwm7R3082O5zjA1J3Jv4pjY0h0GvfdG2ndUKO8rVTvzXrBDslpfKe4aiVQT4xYqKhIS81kAA_aqzDy5vq2a_4wBdMuWwzVpWwHnxEGuC1Kf-TVll2UnceXHRKj7zDFYkUL57mK08qZHnWGun9bwGSrq_9fwFd6unVlZKdNLOSyjHyOL6KDlw8rbRIBnRxfMYEOZO4iMl-8cujm7Mdy_3exeBJOpj4piy1_Pbej0x",
        lastMessage: "주문 취소 요청합니다.",
        unreadCount: 0,
        isOnline: false,
        messages: [
            { id: 1, text: "주문 취소 요청합니다.", sender: "customer", time: "11:30" },
            { id: 2, text: "어떤 주문을 취소하고 싶으신가요?", sender: "admin", time: "11:35" },
            { id: 3, text: "어제 주문한 강아지 사료요", sender: "customer", time: "11:40" },
        ],
    },
    {
        id: 5,
        name: "정하은",
        avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDxlncJFbwPaUoEabiwVBtX1ipxf6gjjZQdKZY-k7KDw9ofcDdH-aDNQ_GIRcesO0dXlDZcBeGxDd_GfOnmCdXK6g6AE45uIyo5Ist-XEA41iz74EkdBfBC1Y7BhF3znJYDLUB6T2w6mhidBoGPirWs07vsux_cRnHhNg54t033KBZOHJytZN9ajnyfUwJURCmn8d2Fx8nuVpkBRID9YxnyBxxcLEfu1wH18UalKI_pLUZqGnWBJI89KYv34nHht04PIayOYyOu1qTF",
        lastMessage: "간식 알레르기 성분 문의",
        unreadCount: 1,
        isOnline: true,
        messages: [
            { id: 1, text: "안녕하세요, 강아지가 알레르기가 있어서요", sender: "customer", time: "16:10" },
            { id: 2, text: "간식 알레르기 성분 문의", sender: "customer", time: "16:15" },
        ],
    },
]

// 상품 리뷰 데이터
export const productReviews: Product[] = [
    {
        id: 1,
        name: "프리미엄 닭가슴살 간식",
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=80&h=80&fit=crop",
        averageRating: 5.0,
        totalReviews: 1,
        reviews: [
            {
                id: 1,
                customerName: "김민지",
                customerAvatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj",
                rating: 5,
                reviewText:
                    "우리 강아지가 정말 좋아해요! 품질도 좋고 포장도 깔끔하게 되어있어서 만족합니다. 다음에도 주문할 예정이에요.",
                reviewDate: "2024.06.08",
                images: [
                    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop",
                ],
                helpful: 12,
            },
        ],
    },
    {
        id: 2,
        name: "고양이 참치 간식",
        image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=80&h=80&fit=crop",
        averageRating: 4.0,
        totalReviews: 1,
        reviews: [
            {
                id: 2,
                customerName: "박지훈",
                customerAvatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_",
                rating: 4,
                reviewText: "고양이가 맛있게 먹네요. 다만 양이 조금 적은 것 같아요.",
                reviewDate: "2024.06.07",
                images: [],
                helpful: 8,
            },
        ],
    },
]
