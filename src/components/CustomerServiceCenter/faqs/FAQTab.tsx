import type React from "react"
import { Box, Typography, TextField, InputAdornment, Button, Chip } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FAQItem from "./FAQItem"

// FAQ 타입 정의
interface FAQ {
    id: number
    question: string
    answer: string
}

const FAQTab: React.FC = () => {
    // FAQ 데이터
    const faqs: FAQ[] = [
        {
            id: 1,
            question: "배송은 얼마나 걸리나요?",
            answer:
                "일반적으로 주문 후 2-3 영업일 이내에 배송됩니다. 제주 및 도서 산간 지역은 추가 시일이 소요될 수 있습니다.",
        },
        {
            id: 2,
            question: "알러지가 있는 반려동물도 먹을 수 있나요?",
            answer:
                "저희 제품은 특정 알러지에 민감한 반려동물을 위해 맞춤형 옵션을 제공합니다. 제품 상세 페이지에서 성분을 확인하시거나, 1:1 문의를 통해 상담해주세요.",
        },
        {
            id: 3,
            question: "환불 규정은 어떻게 되나요?",
            answer:
                "제품 수령 후 7일 이내, 미개봉 상태인 경우 환불이 가능합니다. 자세한 내용은 환불 정책 페이지를 참고해주세요.",
        },
        {
            id: 4,
            question: "수제 간식의 유통기한은 어떻게 되나요?",
            answer:
                "저희 수제 간식은 방부제를 사용하지 않아 유통기한이 짧은 편입니다. 제조일로부터 냉장 보관 시 7일, 냉동 보관 시 1개월입니다. 제품별 상세 정보는 포장지에 표기되어 있습니다.",
        },
        {
            id: 5,
            question: "맞춤 간식은 어떻게 주문하나요?",
            answer:
                "맞춤 간식은 1:1 문의를 통해 반려동물의 정보(나이, 품종, 건강 상태, 알러지 유무 등)를 알려주시면 상담 후 맞춤 제작해 드립니다.",
        },
    ]

    return (
        <Box sx={{ pt: 3 }}>
            <Typography variant="h5" fontWeight={600} sx={{ color: "#1c140d", mb: 3 }}>
                자주 묻는 질문 (FAQ)
            </Typography>

            <Box sx={{ position: "relative", width: "100%", mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="궁금한 점을 검색해보세요"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#9c7349" }} />
                            </InputAdornment>
                        ),
                        sx: {
                            pl: 1,
                            borderRadius: 4,
                            bgcolor: "#fcfaf8",
                            height: 48,
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e8dbce",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e8dbce",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#f38b24",
                                borderWidth: 2,
                            },
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "#9c7349", mr: 1 }}>
                    인기 검색어:
                </Typography>
                <Chip
                    label="#배송"
                    size="small"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        fontSize: "0.75rem",
                        "&:hover": { bgcolor: "#e8dbce" },
                    }}
                    clickable
                />
                <Chip
                    label="#환불"
                    size="small"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        fontSize: "0.75rem",
                        "&:hover": { bgcolor: "#e8dbce" },
                    }}
                    clickable
                />
                <Chip
                    label="#재료"
                    size="small"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        fontSize: "0.75rem",
                        "&:hover": { bgcolor: "#e8dbce" },
                    }}
                    clickable
                />
                <Chip
                    label="#알러지"
                    size="small"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        fontSize: "0.75rem",
                        "&:hover": { bgcolor: "#e8dbce" },
                    }}
                    clickable
                />
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#f38b24",
                        "&:hover": { bgcolor: "#e07b1a" },
                        height: 40,
                        borderRadius: 2,
                        px: 2,
                        fontSize: "0.875rem",
                    }}
                >
                    전체
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        "&:hover": { bgcolor: "#e8dbce" },
                        height: 40,
                        borderRadius: 2,
                        px: 2,
                        fontSize: "0.875rem",
                    }}
                >
                    제품
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        "&:hover": { bgcolor: "#e8dbce" },
                        height: 40,
                        borderRadius: 2,
                        px: 2,
                        fontSize: "0.875rem",
                    }}
                >
                    주문/결제
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        "&:hover": { bgcolor: "#e8dbce" },
                        height: 40,
                        borderRadius: 2,
                        px: 2,
                        fontSize: "0.875rem",
                    }}
                >
                    배송
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#f4ede7",
                        color: "#1c140d",
                        "&:hover": { bgcolor: "#e8dbce" },
                        height: 40,
                        borderRadius: 2,
                        px: 2,
                        fontSize: "0.875rem",
                    }}
                >
                    계정
                </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, pb: 6 }}>
                {faqs.map((faq) => (
                    <FAQItem key={faq.id} faq={faq} />
                ))}
            </Box>
        </Box>
    )
}

export default FAQTab
