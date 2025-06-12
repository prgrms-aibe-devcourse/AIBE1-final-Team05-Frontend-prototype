// src/data/mockProducts.ts

import { Product } from "@/components/ProductList/Product.ts";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "유기농 치킨 & 블루베리 강아지 훈련 간식",
    brand: "퍼피스낵스 컴퍼니",
    price: 9990,
    originalPrice: 12990,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHCEQCFst_KLCuqSgTj7SfU6bff1J19kjOHI7b7uB1NZmTngnb4ap2HspucWEXyJjXPxP3x_d9OQ7DTJQsUxzeHZIa9TJw_SvyRE32prhsSqQ8qwXY9BX80BU_fVdeMIne--cMeR1v-7tPWNxBut_T7mXMx3TP776FI_U3-PvdUFY5t5amqaskpP9yrRqqPAMxggEYwJnfXirq8xIa6rHRof-dqy1xlJSN18p70BYLBEe0HDnoJiKAGmZof1ZsgllA8wQoPO2n2DUx",
    rating: 4.5,
    reviewCount: 123,
    isNew: true,
    shippingInfo: "내일 도착",
    category: "훈련용 간식",
    petType: "강아지",
    ingredients: ["닭고기", "채소"],
    healthBenefits: [],
    isFavorite: false,
  },
  {
    id: "2",
    name: "야생 연어 & 고구마 껌",
    brand: "최고급 펫푸드",
    price: 14500,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2_fE1vjbzHULOxlqCdvdccoKuzu4LMk1rFx_hNl4LMVxJki7pH9CBUrTYiJ9URO2G9lBahG88RRKPsen1TdT5EsNEcPkFDZbw8uxg50oUxMgDB9SizepIIQU3w9K9tyF7k5z__d8wMhRmjQvJQo9pNTXFgLsIqsnFHs4WGAzq1DLEZPcVFmCIbrg6xuoOlFkGMP_vKP3toU58LlccB42jQDvGGd-2sV7Mti0E_Z7LXapjJELeXlEhW8XntrwqU0xf4SeCcYG_bgkS",
    rating: 3.5,
    reviewCount: 210,
    shippingInfo: "내일 도착",
    category: "건강 간식",
    petType: "강아지",
    ingredients: ["생선", "채소"],
    healthBenefits: ["치아 건강"],
    isFavorite: false,
  },
  {
    id: "3",
    name: "든든한 소고기 & 당근 스틱",
    brand: "농장 신선 간식",
    price: 11000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2OL3S-xrkqFkFrEw7aWED_SH9ym7aSAyvoVhaZcnrJSbXBIjdMNPjvPibxhT32g0PuO07Zp5dEy8IXamCRkZ8UwPvBptNkp2wxtswRkIVTcYuixCl7Nx6wtH0BGFCnc8ch7IT2nsF_ISJGZ4dUbJs-00S7DqvulgaRxi4ovAvotcWzB-GsixaVBpugX2a1qkKIsn35ulGBE1xFyTlFsxDh5LZzw8xiNQVZjfq_BcbTow1JmzjqhU9AtqYNO8hfaYIpuQ9cQFbvqCn",
    rating: 4.0,
    reviewCount: 85,
    isOutOfStock: true,
    restockDate: "2주 후 입고 예정",
    shippingInfo: "",
    category: "건강 간식",
    petType: "강아지",
    ingredients: ["소고기", "채소"],
    healthBenefits: [],
    isFavorite: false,
  },
  {
    id: "4",
    name: "바삭한 사과 & 시나몬 비스킷",
    brand: "더 바커리 샵",
    price: 8500,
    originalPrice: 10000,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCf0VSjjcYw0rU6BgkAkOvXO52TGf23oBZ4825Umk-gBt6q2MKUOUisXxd8ypAj5XBzQqr8KW0KeDZzUDCbr_P4iWjozz3OW5kq01OOuJIHcfAPlBktsuCzbBiRlUUEHUPq9wak8ZNltEBzJT341ekORWxdmdobnuXUFDrkKw9rhdLZAxGar0IbZRTfN4uY-dFoEwvdg6HXPAGVenKt8rRGm4AN40t01Jr3PhATIbotGwmS0KNOdKj9qLQw6DuhVB7DBMjAVDhjyiAj",
    rating: 5.0,
    reviewCount: 300,
    isBestseller: true,
    shippingInfo: "내일 도착",
    category: "수제 간식",
    petType: "강아지",
    ingredients: ["채소"],
    healthBenefits: [],
    isFavorite: true,
  },
  {
    id: "5",
    name: "무곡물 오리 & 호박 간식",
    brand: "건강한 발바닥 주방",
    price: 13250,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZWhtaSDBb4hCmxOn968Np4IbQxd_V7nuvsrLqAVHvjBgVKXpELwuxbMG3zLQGjBqwLdqxyhh3WQnQZkK3we58YpJ_mKQOEC0ETbTZaV1PQuCHBUD6e6424NfR_WM25gUyMQ3XXASSmPUL9DbgZEk7EC0RvQx3kSNFFQI5FTkeDQ-FY1pWDKKvQpo8xAnUFhOfdIVh6PqkZdvNe6uTjvio1IQB5xjLd-hZIcIrwcrXDbhZu4lYVazqbQRTba_H_s9ojiBGyfrnR36C",
    rating: 3.5,
    reviewCount: 150,
    shippingInfo: "2일 내 도착",
    category: "무첨가 간식",
    petType: "강아지",
    ingredients: ["생선", "채소"],
    healthBenefits: [],
    isFavorite: false,
  },
];

export const getTotalProductCount = (): number => {
  return 1234; // 전체 상품 수 (실제로는 API에서 가져올 값)
};
