// src/pages/ProductDetailPage/ProductDetailPage.tsx

import React from "react";
import { Box } from "@mui/material";
import ProductDetail from "@/components/ProductDetail";

import { Product } from "@/components/ProductDetail/Product";
import { Review, ReviewStats } from "@/components/ProductDetail/review";

// Mock 데이터 - image 속성 추가 및 완전한 데이터 제공
const mockProduct: Product = {
  id: "1",
  name: "우리 아이 건강 닭가슴살 져키",
  brand: "장인의 손길 공방",
  price: 25000,
  originalPrice: 30000,

  // 👇 중요! image 속성 추가 (ProductImages 컴포넌트에서 사용)
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",

  imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",

  rating: 4.8,
  reviewCount: 125,
  isNew: false,
  isBestseller: true,
  isOutOfStock: false,
  shippingInfo: "당일 배송 가능 (오후 2시 이전 주문시)",
  category: "수제 간식",
  petType: "강아지",
  ingredients: ["닭가슴살 (국내산)", "식물성 글리세린"],
  healthBenefits: ["고단백", "저지방", "무첨가"],
  isFavorite: false,

  // ProductDetail 전용 추가 속성들
  description: "100% 국내산 닭가슴살로 만든 건강하고 맛있는 수제 간식입니다.\n인공 첨가물과 방부제가 전혀 들어가지 않았습니다.",

  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD1LExQScrbn77L0O9UX22Sj7nG2YhS4y3nS6Ok0BuR-v3NiZoqlSHD__OUsGmZ8Vluex-dpWrTlnSP_5evrZlkq_nipQ1s83SbpwWVFnM5Qk4ySOOiWbuLcGbZkdN5JGFSx6YoBErspP3KCOlHTaxj-aeTjjThZKuSDKjIFBD8cAGInCgzqlo_KVFz_nIdHdNmESATwN9a-6Y_6hZ3-NpkFW-DGUlT6vUuso1oufPFEjuD2WB5knop-6IaSbMUBTR8IzAMBmzCIKc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXCrO3ubZJn7HpNI2KjbOdh1walSbjFMNdfV4QqyCIheVcUVGbsoLjEnl3YkpC5Oh-zZ3o8RiyYPTjXMgOR-S4amq7vp-fIRdd77WWvwh0cLf-lH5G5sf4rbrptb55KEQfX-HD509EQyX1uXm6IR-ujmakbIdBUIiipds1j4uGtLEoppfUXNw4cI95qR8ciVYs6jlmrCZQDMy_kZi857gMDAb9RbGelHOknz6nMqv3TCQU589KSBjTqWAs6-iZojM2RwkoQf8_Nnk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAepKpq-eurk_nZ0azm-BKw59WBmLSnqVIqZt_qOR0LCyP7mGh7sEw-zVvkLccE08FcGYxx7xT_XmT1Xkdgvz9wRJSs5sJDg8bBViXTvu9jVGqEm9Oa2tL1AzJ60t2aJ9rsOe1jSq_jUMkDMowdD0awi1kU7JPskVvjXopTplZ7Ath8PEfMA1IuiO54JIp79FOLieSFbUwt1YLM_ROYn5YPG9lYCtC-koG06aeni2mmqfadJZXrPXZDgc0KBBKZSODtLfl-7Zo4q7U",
  ],

  nutritionalInfo: "조단백질 70% 이상, 조지방 5% 이상, 조섬유 2% 이하, 수분 15% 이하",
  allergenInfo: "일반적인 알러지 유발 물질 없음. 견과류를 처리하는 시설에서 생산될 수 있습니다.",

  maker: {
    name: "장인의 손길 공방",
    description: "사랑으로 만드는 수제 간식",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBog2gnA031MIlZbELfbyrC3qNhNoVmVsa4J_QRTCRt2gJLoW9TFAgoOKC1O3tPkPw9e-4fDOcZ9zylZ59X-mJpCgJZGq2U93WNCmrf7Y7ubhSx7Dik5s2m8MrUCm0OH7vvc6w8QprKIIt-nzmXXWEgu3Pl8eoiUCQSIcCyDDMqx5K4HqG0MsFceHRhfLCpSCDdx81wiT4odconNubFi0_grIOITZbAwGvI2UD6jcjrVu8squSGAt9kf4UMNs7YB_SuP1bscuwYNLU",
  },

  suitableFor: "모든 연령 및 견종의 강아지 (2개월 이상)",
  packaging: [
    { value: "basic", label: "기본 포장" },
    { value: "gift", label: "선물 포장" },
  ],

  // 👇 중요! tags 추가 (ProductBasicInfo에서 사용)
  tags: ["국내산", "무첨가", "수제", "건강간식"],

  // 👇 중요! nutritionInfo 추가 (ProductSpecTable에서 사용)
  nutritionInfo: {
    protein: "70% 이상",
    fat: "5% 이상",
    fiber: "2% 이하",
    moisture: "15% 이하"
  },

  weight: "100g"
};

// 확장된 Mock 리뷰 데이터
const mockReviews: Review[] = [
  {
    id: "1",
    reviewer: {
      name: "김민지",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "골든리트리버, 3살",
    },
    rating: 5,
    content: "우리집 댕댕이가 너무 좋아해요! 건강한 간식이라 안심하고 줄 수 있어서 만족스럽습니다. 인공첨가물이 없어서 더욱 믿음이 가네요.",
    date: "2024-05-15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApP_3yp5zNwjzDnSAxIaVV3UbIk-jUR_KCXTp_ePNMaO528Z2oyjezunXdweY1Usc0CHASwaPK-w92PREH-LqWO_lV0mXwXNH5KLQTTtsBcPRos1FrVL0Go6hZGkX3_h0OlRHgeSLTfCERSaVN8Wzz4iMGuCQS95NikSh77JBeOqzowxIye2QKbrz838qA_heIL6hnXjYPz5xYz_qAJGbqnr0mK2DHsyYURHGvyVzKxyusdm5cEAw9ja9Uih6XSi2Ihh7fp1PsaR0",
  },
  {
    id: "2",
    reviewer: {
      name: "박시우",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "비글, 5살",
    },
    rating: 4,
    content: "좋아하긴 하는데 가격이 조금 비싸네요. 품질은 만족해요! 우리 비글이 맛있게 잘 먹습니다.",
    date: "2024-05-10",
  },
  {
    id: "3",
    reviewer: {
      name: "이소연",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "푸들, 2살",
    },
    rating: 5,
    content: "완전 대박이에요! 알레르기 있는 우리 강아지도 문제없이 잘 먹어요. 재주문 예정입니다.",
    date: "2024-05-08",
  },
];

const mockReviewStats: ReviewStats = {
  averageRating: 4.8,
  totalReviews: 125,
  ratingDistribution: {
    "5": 70, // 👈 문자열 키로 수정 (ratingDistribution 타입 맞춤)
    "4": 20,
    "3": 5,
    "2": 3,
    "1": 2,
  },
};

const mockRelatedProducts = [
  {
    id: "2",
    name: "프리미엄 소고기 간식",
    price: 18000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-TQcyyDp6MoPAfHOX7IAUfh1AuGDRRTTgn_Z7cEPseZwcBQh9EIr0zNQ4YFNV8ykN-8Rww-lIymglVVb5XGFizy4CYqRVouf1Po2JfMLSsPQY1MMw7TsRuIq6zdr7EF7kC0JzmKSuGnZj-4yxOwHafxe-QuRhBH5chRo-7_hbx9azWXqd-fRwruCGkJNgjvnDEBW2fDOBGI-DAqaDg3BPRU7KYpTXaZg9qpGc3vHEgBinoE8P1QU4h6N4kH5y-C6-S1YaWfNR5VM",
  },
  {
    id: "3",
    name: "고구마 츄",
    price: 22000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk6OBATxsOOmb6yw3Nh9efbBkaUiptDYnKWLmgmSn6GnvO0_8sA3dz4UXt2ljHcbUil47xuvhUPpLDTf9UEyomy41_hZvJRRo41qCtqd5beAEXzSA4zFMDp5kKHWosIL9OImLrdK4TZSopq0nKMBXDXUjIEak0KSQ17c0Ls0mnxRwcdulxSrjmb4BqaVVo2FnlV83qZ8Np5C7rP6pSsM9kl97xmSPEpC-eEzTL9h0BTez624fN_hpMJDU3erAPBVwJLwiAMrGOLA8",
  },
  {
    id: "4",
    name: "동결건조 연어칩",
    price: 30000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcZUuDQGx3x7O3mvdHqKDygK-OVm_qCHtJb_DjxSz1-pqKGwIDenQlSOrooa24KC2qsOtSoZXxHvuxDu2GEOrkh3JQChe-POY5RULpxTELUDJvuif1u7WrIFx7NnHDkd1FXJXEvV1l39h1zYzTROnp_JVe3ipfhEcky6gT1p5fhRgT_Hd2rjbbo_cc-ccpKB8mUUWD8OtpEmb2Z0SYhyNbF3NXuI1hfkT4qUTiPr4tM-6mKLwBRmv7DT48lLeR88vtYg-TAv2poGY",
  },
  {
    id: "5",
    name: "저염 닭가슴살 스틱",
    price: 20000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",
  },
];

const ProductDetailPage: React.FC = () => {
  return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#fcfaf8" }}>
        <ProductDetail
            product={mockProduct}
            reviews={mockReviews}
            reviewStats={mockReviewStats}
            relatedProducts={mockRelatedProducts}
        />
      </Box>
  );
};

export default ProductDetailPage;