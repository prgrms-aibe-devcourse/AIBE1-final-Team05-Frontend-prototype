// src/pages/ProductDetailPage/ProductDetailPage.tsx
// 상품 상세 페이지 (헤더 + 브레드크럼 + 상세 컴포넌트 조합)

import React from "react";
import { Box } from "@mui/material";
import Footer from "../../components/common/Footer";
import Breadcrumb from "../../components/common/Breadcrumb";
import ProductDetail from "../../components/product/ProductDetail";
import { Product } from "../../types/product";
import { Review, ReviewStats } from "../../types/review";
import { BreadcrumbItem } from "../../types/common";

// Mock 데이터 - 목표 이미지와 동일하게
const mockProduct: Product = {
  id: "1",
  name: "우리 아이 건강 닭가슴살 져키",
  description:
    "100% 국내산 닭가슴살로 만든 건강하고 맛있는 수제 간식입니다. \n인공 첨가물과 방부제가 전혀 들어가지 않았습니다.",
  price: 25000,
  rating: 4.8,
  reviewCount: 125,
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD1LExQScrbn77L0O9UX22Sj7nG2YhS4y3nS6Ok0BuR-v3NiZoqlSHD__OUsGmZ8Vluex-dpWrTlnSP_5evrZlkq_nipQ1s83SbpwWVFnM5Qk4ySOOiWbuLcGbZkdN5JGFSx6YoBErspP3KCOlHTaxj-aeTjjThZKuSDKjIFBD8cAGInCgzqlo_KVFz_nIdHdNmESATwN9a-6Y_6hZ3-NpkFW-DGUlT6vUuso1oufPFEjuD2WB5knop-6IaSbMUBTR8IzAMBmzCIKc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXCrO3ubZJn7HpNI2KjbOdh1walSbjFMNdfV4QqyCIheVcUVGbsoLjEnl3YkpC5Oh-zZ3o8RiyYPTjXMgOR-S4amq7vp-fIRdd77WWvwh0cLf-lH5G5sf4rbrptb55KEQfX-HD509EQyX1uXm6IR-ujmakbIdBUIiipds1j4uGtLEoppfUXNw4cI95qR8ciVYs6jlmrCZQDMy_kZi857gMDAb9RbGelHOknz6nMqv3TCQU589KSBjTqWAs6-iZojM2RwkoQf8_Nnk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAepKpq-eurk_nZ0azm-BKw59WBmLSnqVIqZt_qOR0LCyP7mGh7sEw-zVvkLccE08FcGYxx7xT_XmT1Xkdgvz9wRJSs5sJDg8bBViXTvu9jVGqEm9Oa2tL1AzJ60t2aJ9rsOe1jSq_jUMkDMowdD0awi1kU7JPskVvjXopTplZ7Ath8PEfMA1IuiO54JIp79FOLieSFbUwt1YLM_ROYn5YPG9lYCtC-koG06aeni2mmqfadJZXrPXZDgc0KBBKZSODtLfl-7Zo4q7U",
  ],
  ingredients: "닭가슴살 (국내산), 식물성 글리세린",
  nutritionalInfo:
    "조단백질 70% 이상, 조지방 5% 이상, 조섬유 2% 이하, 수분 15% 이하",
  allergenInfo:
    "일반적인 알러지 유발 물질 없음. 견과류를 처리하는 시설에서 생산될 수 있습니다.",
  maker: {
    name: "장인의 손길 공방",
    description: "사랑으로 만드는 수제 간식",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBog2gnA031MIlZbELfbyrC3qNhNoVmVsa4J_QRTCRt2gJLoW9TFAgoOKC1O3tPkPw9e-4fDOcZ9zylZ59X-mJpCgJZGq2U93WNCmrf7Y7ubhSx7Dik5s2m8MrUCm0OH7vvc6w8QprKIIt-nzmXXWEgu3Pl8eoiUCQSIcCyDDMqx5K4HqG0MsFceHRhfLCpSCDdx81wiT4odconNubFi0_grIOITZbAwGvI2UD6jcjrVu8squSGAt9kf4UMNs7YB_SuP1bscuwYNLU",
  },
  suitableFor: "모든 연령 및 견종의 강아지 (2개월 이상)",
  packaging: [
    { value: "basic", label: "기본 포장" },
    { value: "gift", label: "선물 포장" },
  ],
};

// 확장된 Mock 리뷰 데이터 - 15개로 페이징 테스트 완벽 지원
const mockReviews: Review[] = [
  {
    id: "1",
    reviewer: {
      name: "김민지",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "골든리트리버, 3살",
    },
    rating: 5,
    content:
      "우리집 댕댕이가 너무 좋아해요! 건강한 간식이라 안심하고 줄 수 있어서 만족스럽습니다. 인공첨가물이 없어서 더욱 믿음이 가네요.",
    date: "2024-05-15",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApP_3yp5zNwjzDnSAxIaVV3UbIk-jUR_KCXTp_ePNMaO528Z2oyjezunXdweY1Usc0CHASwaPK-w92PREH-LqWO_lV0mXwXNH5KLQTTtsBcPRos1FrVL0Go6hZGkX3_h0OlRHgeSLTfCERSaVN8Wzz4iMGuCQS95NikSh77JBeOqzowxIye2QKbrz838qA_heIL6hnXjYPz5xYz_qAJGbqnr0mK2DHsyYURHGvyVzKxyusdm5cEAw9ja9Uih6XSi2Ihh7fp1PsaR0",
    likes: 23,
    dislikes: 0,
  },
  {
    id: "2",
    reviewer: {
      name: "박시우",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "비글, 5살",
    },
    rating: 4,
    content:
      "좋아하긴 하는데 가격이 조금 비싸네요. 품질은 만족해요! 우리 비글이 맛있게 잘 먹습니다.",
    date: "2024-05-10",
    likes: 18,
    dislikes: 2,
  },
  {
    id: "3",
    reviewer: {
      name: "이소연",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "푸들, 2살",
    },
    rating: 5,
    content:
      "완전 대박이에요! 알레르기 있는 우리 강아지도 문제없이 잘 먹어요. 재주문 예정입니다.",
    date: "2024-05-08",
    likes: 31,
    dislikes: 0,
  },
  {
    id: "4",
    reviewer: {
      name: "정현수",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "시바견, 4살",
    },
    rating: 4,
    content:
      "포장이 깔끔하고 제품 상태도 좋아요. 배송도 빨랐습니다. 다만 조금 더 저렴했으면 좋겠어요.",
    date: "2024-05-05",
    likes: 12,
    dislikes: 1,
  },
  {
    id: "5",
    reviewer: {
      name: "최은영",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "말티즈, 1살",
    },
    rating: 5,
    content:
      "어린 강아지도 잘 먹을 수 있는 크기와 질감이에요. 국내산이라 더욱 안심되네요. 강력 추천!",
    date: "2024-05-03",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApP_3yp5zNwjzDnSAxIaVV3UbIk-jUR_KCXTp_ePNMaO528Z2oyjezunXdweY1Usc0CHASwaPK-w92PREH-LqWO_lV0mXwXNH5KLQTTtsBcPRos1FrVL0Go6hZGkX3_h0OlRHgeSLTfCERSaVN8Wzz4iMGuCQS95NikSh77JBeOqzowxIye2QKbrz838qA_heIL6hnXjYPz5xYz_qAJGbqnr0mK2DHsyYURHGvyVzKxyusdm5cEAw9ja9Uih6XSi2Ihh7fp1PsaR0",
    likes: 27,
    dislikes: 0,
  },
  {
    id: "6",
    reviewer: {
      name: "윤태호",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "래브라도, 6살",
    },
    rating: 3,
    content:
      "나쁘지 않은데 우리 강아지가 그렇게 열광하지는 않네요. 평범한 수준인 것 같아요.",
    date: "2024-05-01",
    likes: 8,
    dislikes: 4,
  },
  {
    id: "7",
    reviewer: {
      name: "강미라",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "치와와, 7살",
    },
    rating: 4,
    content:
      "작은 강아지도 먹기 좋은 크기네요. 건강한 재료로 만들어져서 노견에게도 안심하고 줄 수 있어요.",
    date: "2024-04-28",
    likes: 15,
    dislikes: 1,
  },
  {
    id: "8",
    reviewer: {
      name: "임진우",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "보더콜리, 3살",
    },
    rating: 5,
    content:
      "훈련할 때 보상용으로 사용하고 있어요. 크기도 적당하고 강아지가 정말 좋아합니다!",
    date: "2024-04-25",
    likes: 22,
    dislikes: 0,
  },
  {
    id: "9",
    reviewer: {
      name: "한서영",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "코커스패니얼, 4살",
    },
    rating: 4,
    content:
      "품질은 좋은데 포장이 조금 아쉬워요. 밀폐가 잘 안되는 것 같아요. 맛은 강아지가 잘 먹네요.",
    date: "2024-04-22",
    likes: 11,
    dislikes: 3,
  },
  {
    id: "10",
    reviewer: {
      name: "오준석",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "진돗개, 5살",
    },
    rating: 5,
    content:
      "우리나라 강아지에게는 역시 국내산이 최고! 진돗개가 매우 좋아해요. 정기주문 할 예정입니다.",
    date: "2024-04-20",
    likes: 35,
    dislikes: 0,
  },
  {
    id: "11",
    reviewer: {
      name: "신혜진",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "요크셔테리어, 2살",
    },
    rating: 2,
    content:
      "기대했는데 우리 강아지가 별로 안 좋아하네요. 그리고 생각보다 딱딱해요. 소형견에게는 좀 어려울 것 같아요.",
    date: "2024-04-18",
    likes: 5,
    dislikes: 8,
  },
  {
    id: "12",
    reviewer: {
      name: "배성민",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "허스키, 3살",
    },
    rating: 4,
    content:
      "대형견도 만족할 만한 크기와 맛이에요. 운동 후 간식으로 주고 있습니다. 재구매 의향 있어요.",
    date: "2024-04-15",
    likes: 19,
    dislikes: 2,
  },
  {
    id: "13",
    reviewer: {
      name: "문지혜",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "포메라니안, 6살",
    },
    rating: 5,
    content:
      "노령견에게도 좋은 간식이에요. 소화도 잘 되고 털도 더 윤기가 나는 것 같아요. 만족합니다!",
    date: "2024-04-12",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApP_3yp5zNwjzDnSAxIaVV3UbIk-jUR_KCXTp_ePNMaO528Z2oyjezunXdweY1Usc0CHASwaPK-w92PREH-LqWO_lV0mXwXNH5KLQTTtsBcPRos1FrVL0Go6hZGkX3_h0OlRHgeSLTfCERSaVN8Wzz4iMGuCQS95NikSh77JBeOqzowxIye2QKbrz838qA_heIL6hnXjYPz5xYz_qAJGbqnr0mK2DHsyYURHGvyVzKxyusdm5cEAw9ja9Uih6XSi2Ihh7fp1PsaR0",
    likes: 24,
    dislikes: 0,
  },
  {
    id: "14",
    reviewer: {
      name: "류상호",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAFgwd4pQa6f7mUfAzrvEHGs19eogQac7kLG0VfgbFgRmI0Dz5cyYE6Cj5mn3f-otNJ83E0DH4Fmu43p5wiQYWrmVVt6_q9FLBZCHLJ-N3p-JBZbs_KIQ-0N68-beLNHPMTSHn_x-s1PObtmurVLte5pBydkc9C03L6A2NHYEvmIhIbrAyi2i-LgP5On-PJY3zeR1k9bRAQI0djLh0O3DmaVM5FI0ctRotx5SVgeiK2z6njd_1AgQG0_pdFz6LFkGIHNo1y8qFLOCo",
      petInfo: "웰시코기, 4살",
    },
    rating: 3,
    content:
      "품질은 괜찮은데 가격 대비해서는 조금 아쉬워요. 다른 제품과 비교해보고 재구매 결정할 것 같아요.",
    date: "2024-04-10",
    likes: 9,
    dislikes: 5,
  },
  {
    id: "15",
    reviewer: {
      name: "조은정",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRwUg21MeP_LH2nehFjoRpyLYOszOpwKvh78rcq31GcAEN_u00ka81tRmeipx-IQqqUmSWEUE2cHwzZgvBKMDmHXo6OTeDXcnXOmlTY_7DVnRD7n3640-NMLWS9wNDQ1OO_ibasG_8JbG4Cw0aTaaP9eEKwr1RavxsIdA7rFcsFlllSS94FOBr0-KSKu0JXQWGQuTALoZqzH0vHn9SaNnNrhldF_PcXkHFvxOSRgbzeMpE6YrJilioVbD8mu08vfh5Vwzzeezhhm4",
      petInfo: "믹스견, 8살",
    },
    rating: 4,
    content:
      "오래된 강아지도 부담없이 먹을 수 있어요. 첨가물이 없어서 안심되고, 배송 포장도 꼼꼼하게 해주셨네요.",
    date: "2024-04-08",
    likes: 16,
    dislikes: 1,
  },
];

const mockReviewStats: ReviewStats = {
  averageRating: 4.8,
  totalReviews: 125,
  ratingDistribution: {
    5: 70,
    4: 20,
    3: 5,
    2: 3,
    1: 2,
  },
};

const mockRelatedProducts = [
  {
    id: "2",
    name: "프리미엄 소고기 간식",
    price: 18000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-TQcyyDp6MoPAfHOX7IAUfh1AuGDRRTTgn_Z7cEPseZwcBQh9EIr0zNQ4YFNV8ykN-8Rww-lIymglVVb5XGFizy4CYqRVouf1Po2JfMLSsPQY1MMw7TsRuIq6zdr7EF7kC0JzmKSuGnZj-4yxOwHafxe-QuRhBH5chRo-7_hbx9azWXqd-fRwruCGkJNgjvnDEBW2fDOBGI-DAqaDg3BPRU7KYpTXaZg9qpGc3vHEgBinoE8P1QU4h6N4kH5y-C6-S1YaWfNR5VM",
  },
  {
    id: "3",
    name: "고구마 츄",
    price: 22000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk6OBATxsOOmb6yw3Nh9efbBkaUiptDYnKWLmgmSn6GnvO0_8sA3dz4UXt2ljHcbUil47xuvhUPpLDTf9UEyomy41_hZvJRRo41qCtqd5beAEXzSA4zFMDp5kKHWosIL9OImLrdK4TZSopq0nKMBXDXUjIEak0KSQ17c0Ls0mnxRwcdulxSrjmb4BqaVVo2FnlV83qZ8Np5C7rP6pSsM9kl97xmSPEpC-eEzTL9h0BTez624fN_hpMJDU3erAPBVwJLwiAMrGOLA8",
  },
  {
    id: "4",
    name: "동결건조 연어칩",
    price: 30000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcZUuDQGx3x7O3mvdHqKDygK-OVm_qCHtJb_DjxSz1-pqKGwIDenQlSOrooa24KC2qsOtSoZXxHvuxDu2GEOrkh3JQChe-POY5RULpxTELUDJvuif1u7WrIFx7NnHDkd1FXJXEvV1l39h1zYzTROnp_JVe3ipfhEcky6gT1p5fhRgT_Hd2rjbbo_cc-ccpKB8mUUWD8OtpEmb2Z0SYhyNbF3NXuI1hfkT4qUTiPr4tM-6mKLwBRmv7DT48lLeR88vtYg-TAv2poGY",
  },
  {
    id: "5",
    name: "저염 닭가슴살 스틱",
    price: 20000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKKRu5fbeV0xTu5bsCxhKosrIOabbjk5QarpnkQbEJj8lnRUy-3BtsUosYvRZiKykdWmWuj1Q6EzNsfJPTm-1oSsAol2vnBhukB0U4RvR7atN-YhCT_3ZbDSZEqKwbYwlU0SJBPSD-kkt3Kiofl_7ZjT5tskvEwDxInhtrfkJrfcNlkF-qvaXf22-6LcFSrCmFWKJMLZNRFQxfumgck0eA29qgYivpLIK9mNTxqK_ZKkhnG5xOx62qaEyAXL-Yw57Malq9DFzHvVs",
  },
];

// 브레드크럼 경로 수정: "홈 / 수제 간식 / 닭가슴살 저키"
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "홈", href: "/" },
  { label: "수제 간식", href: "/treats" },
  { label: "닭가슴살 저키" },
];

const ProductDetailPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fcfaf8" }}>
      <Breadcrumb items={breadcrumbItems} />
      <ProductDetail
        product={mockProduct}
        reviews={mockReviews}
        reviewStats={mockReviewStats}
        relatedProducts={mockRelatedProducts}
      />
      <Footer />
    </Box>
  );
};

export default ProductDetailPage;
