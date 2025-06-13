"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Paper } from "@mui/material"
import InquiryItem from "./InquiryItem"
import InquiryDetail from "./InquiryDetail"

// 문의 타입 정의
export interface Inquiry {
    id: string
    title: string
    content: string
    date: string
    status: "pending" | "completed"
    answer?: string
    attachments?: string[]
}

const InquiryHistory: React.FC = () => {
    // 문의 데이터 - 더 많은 목 데이터 추가
    const inquiries: Inquiry[] = [
        {
            id: "1",
            title: "배송 지연 관련 문의",
            content:
                "안녕하세요. 5월 8일에 주문한 [주문번호 #12345] 상품이 아직 배송 시작도 안 된 것 같아 문의드립니다. 언제쯤 받아볼 수 있을까요?",
            date: "2024-05-10",
            status: "pending",
            answer:
                "고객님, 현재 문의량이 많아 답변이 지연되고 있습니다. 최대한 빠르게 확인 후 안내드리겠습니다. 불편을 드려 죄송합니다.",
        },
        {
            id: "2",
            title: "제품 성분 문의",
            content:
                "저희 강아지가 닭고기 알러지가 있는데, '튼튼간식 연어맛' 제품에 닭고기 성분이 포함되어 있나요? 상세 성분표를 봐도 정확히 모르겠어서 문의드립니다.",
            date: "2024-05-08",
            status: "completed",
            answer:
                "안녕하세요, 고객님. CatDogEats입니다.\n\n문의주신 '튼튼간식 연어맛' 제품에는 닭고기 성분이 포함되어 있지 않습니다. 주 원료는 연어와 함께 곡물, 채소 등으로 구성되어 있습니다. 안심하고 급여하셔도 좋습니다.\n\n더 궁금한 점 있으시면 언제든지 문의해주세요. 감사합니다.",
        },
        {
            id: "3",
            title: "환불 요청",
            content: "실수로 다른 제품을 주문했습니다. [주문번호 #12300] 건 환불 처리 부탁드립니다. 아직 미개봉 상태입니다.",
            date: "2024-05-05",
            status: "completed",
            answer:
                "고객님, 안녕하세요. 환불 요청 확인되었습니다.\n\n미개봉 상태이시라면 환불 가능합니다. 저희쪽으로 제품 반송해주시면 확인 후 카드 결제 취소 또는 계좌 환불 처리 도와드리겠습니다. 반송 주소는 [서울특별시 캣도그구 이츠동 123-456 캣독이츠 빌딩 1층] 입니다. 반송 시 택배비는 고객님 부담인 점 양해 부탁드립니다.\n\n감사합니다.",
            attachments: [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB06k9Th58da_fcbeQQQfZ-t4bqsDN_B8AYd7HGXVNx_wOXWLAAZmZZlFT5bTgcjlrZLQZHpXySjM2GoVV8Xg-nF8UonUvDdt2pjPxSL5FogQoOefPCMbsZ0LhzIhsEgLVOlv6pqQoI47PXS5Fj9Cb_37HSJw2IXPdg0g-oBGsaNJnTN3gq_IdbnpLSO6b5YqI5s298leG8plzFTG7maoyco4uqhD1VMBRr3yFXW1Ha1HuV4ug2ayM0tYTwoIdi1ukX0RswnWjqph4",
            ],
        },
        // 추가 목 데이터
        {
            id: "4",
            title: "정기배송 변경 요청",
            content: "현재 주 1회 배송받고 있는 정기배송을 2주에 1회로 변경하고 싶습니다. 어떻게 변경할 수 있나요?",
            date: "2024-05-03",
            status: "completed",
            answer:
                "안녕하세요, 고객님. 정기배송 주기 변경 요청 확인했습니다.\n\n정기배송 주기는 마이페이지 > 정기배송 관리에서 직접 변경 가능합니다. 또는 저희가 직접 변경해드릴 수도 있습니다. 원하시는 방법으로 알려주시면 도와드리겠습니다.\n\n변경사항은 다음 결제일 이전에 적용됩니다. 추가 문의사항 있으시면 언제든지 알려주세요.",
        },
        {
            id: "5",
            title: "배송지 변경 문의",
            content: "이번 주에 배송 예정인 주문의 배송지를 변경하고 싶습니다. 아직 변경 가능한가요?",
            date: "2024-04-28",
            status: "completed",
            answer:
                "고객님, 안녕하세요. 배송지 변경 문의 주셔서 감사합니다.\n\n현재 주문하신 상품은 이미 배송 준비 중입니다. 배송 단계에 따라 변경이 어려울 수 있으나, 확인 후 최대한 도와드리겠습니다. 변경하실 주소를 알려주시면 바로 확인해보겠습니다.\n\n빠른 답변 드리겠습니다.",
        },
        {
            id: "6",
            title: "결제 오류 발생",
            content: "결제 시도 중 오류가 발생했는데, 카드사에서는 결제가 완료되었다고 합니다. 주문은 어떻게 된 건가요?",
            date: "2024-04-25",
            status: "completed",
            answer:
                "고객님, 불편을 드려 죄송합니다.\n\n확인 결과, 결제는 정상적으로 승인되었으나 주문 시스템에 반영이 지연된 것으로 확인됩니다. 현재는 정상적으로 주문이 등록되어 있으며, 예정대로 배송될 예정입니다.\n\n혹시 마이페이지에서 주문 내역이 확인되지 않으신다면 다시 알려주시기 바랍니다.",
        },
        {
            id: "7",
            title: "신제품 출시 일정 문의",
            content: "인스타그램에서 본 새로운 고양이 간식은 언제쯤 구매 가능한가요?",
            date: "2024-04-20",
            status: "completed",
            answer:
                "안녕하세요, 고객님. 문의 주셔서 감사합니다.\n\n말씀하신 신제품 '고양이 참치 트릿'은 5월 15일부터 정식 판매 예정입니다. 사전 예약은 5월 10일부터 가능하며, 사전 예약 고객님께는 10% 할인 혜택을 드릴 예정입니다.\n\n출시 소식은 공식 SNS 및 이메일로도 안내해 드리겠습니다. 많은 관심 감사합니다.",
        },
        {
            id: "8",
            title: "포인트 소멸 예정 안내 관련",
            content: "포인트 소멸 예정 안내 메일을 받았는데, 언제까지 사용해야 하나요? 그리고 어떻게 사용할 수 있나요?",
            date: "2024-04-15",
            status: "pending",
            answer:
                "고객님, 문의 주셔서 감사합니다. 현재 문의량이 많아 답변이 지연되고 있습니다. 최대한 빠르게 확인 후 안내드리겠습니다.",
        },
        {
            id: "9",
            title: "알러지 반응 문의",
            content:
                "최근 구매한 강아지 간식을 먹인 후 강아지가 구토 증상을 보였습니다. 어떤 성분 때문일까요? 다른 제품을 추천해주실 수 있나요?",
            date: "2024-04-10",
            status: "completed",
            answer:
                "고객님, 반려동물의 건강 상태에 대해 걱정이 많으실 것 같습니다.\n\n말씀하신 증상은 특정 성분에 대한 알러지 반응일 수 있습니다. 구체적인 제품명과 반려동물의 기존 알러지 이력을 알려주시면 더 정확한 안내가 가능합니다.\n\n우선은 해당 제품 급여를 중단하시고, 증상이 심하다면 동물병원 진료를 권해드립니다. 알러지가 의심되는 경우 저희 '저알러지 라인' 제품을 추천드립니다.",
        },
        {
            id: "10",
            title: "회원 정보 수정 방법",
            content: "결혼으로 인해 주소와 성함이 변경되었습니다. 회원 정보는 어디서 수정할 수 있나요?",
            date: "2024-04-05",
            status: "completed",
            answer:
                "안녕하세요, 고객님. 축하드립니다!\n\n회원 정보 수정은 웹사이트 로그인 후 '마이페이지 > 회원정보 관리 > 회원정보 수정' 메뉴에서 가능합니다. 모바일 앱에서도 동일한 경로로 수정 가능합니다.\n\n성함 변경의 경우, 본인 인증이 필요할 수 있으니 참고 부탁드립니다. 추가 도움이 필요하시면 언제든지 문의해주세요.",
        },
    ]

    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

    const handleSelectInquiry = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry)
    }

    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
            {/* 문의 목록 영역 - 고정 높이와 스크롤 적용 */}
            <Box
                component={Paper}
                sx={{
                    width: { xs: "100%", md: "30%" },
                    border: "1px solid #e8dbce",
                    borderRadius: 2,
                    bgcolor: "white",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: { md: "500px" }, // 데스크톱에서 고정 높이 설정
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #e8dbce" }}>
                    <Typography variant="h6" fontWeight={600} sx={{ color: "#1c140d" }}>
                        문의 목록
                    </Typography>
                </Box>

                {/* 스크롤 가능한 문의 목록 컨테이너 */}
                <Box
                    sx={{
                        overflowY: "auto",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#e8dbce",
                            borderRadius: "10px",
                            "&:hover": {
                                backgroundColor: "#d1c5b8",
                            },
                        },
                    }}
                >
                    {inquiries.map((inquiry) => (
                        <InquiryItem
                            key={inquiry.id}
                            inquiry={inquiry}
                            isSelected={selectedInquiry?.id === inquiry.id}
                            onSelect={() => handleSelectInquiry(inquiry)}
                        />
                    ))}
                </Box>
            </Box>

            {/* 상세 내역 영역 - 문의 목록과 완전히 분리 */}
            <Box
                component={Paper}
                sx={{
                    width: { xs: "100%", md: "70%" },
                    border: "1px solid #e8dbce",
                    borderRadius: 2,
                    bgcolor: "white",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    overflow: "auto", // 내용이 많을 경우 스크롤
                    alignSelf: "flex-start", // 상단에 정렬
                    maxHeight: { md: "500px" }, // 데스크톱에서 최대 높이 설정
                }}
            >
                {selectedInquiry ? (
                    <InquiryDetail inquiry={selectedInquiry} />
                ) : (
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography sx={{ color: "#9c7349", py: 5 }}>왼쪽 목록에서 문의 내역을 선택해주세요.</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default InquiryHistory
