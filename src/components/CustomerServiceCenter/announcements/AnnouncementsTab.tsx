import type React from "react"
import { Box, InputAdornment, TextField, Typography, Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AnnouncementItem from "./AnnouncementItem"

// 공지사항 타입 정의
interface Announcement {
    id: number
    category: string
    categoryColor: string
    textColor: string
    title: string
    content: string
    date: string
    views: number
}

const AnnouncementsTab: React.FC = () => {
    // 공지사항 데이터
    const announcements: Announcement[] = [
        {
            id: 1,
            category: "제품",
            categoryColor: "#ffe5c7",
            textColor: "#8a5318",
            title: "신제품 출시 안내",
            content: "새로운 수제 간식을 만나보세요!",
            date: "2024-01-15",
            views: 1200,
        },
        {
            id: 2,
            category: "정기배송",
            categoryColor: "#c7eaff",
            textColor: "#185f8a",
            title: "정기배송 업데이트",
            content: "정기배송 플랜에 중요한 변경 사항이 있습니다.",
            date: "2024-02-20",
            views: 850,
        },
        {
            id: 3,
            category: "배송",
            categoryColor: "#d1f7c4",
            textColor: "#2a7e14",
            title: "배송 지연 안내",
            content: "배송 지연 가능성에 대한 안내입니다.",
            date: "2024-03-10",
            views: 1500,
        },
        {
            id: 4,
            category: "계정",
            categoryColor: "#f7c4f6",
            textColor: "#7e147d",
            title: "계정 보안 안내",
            content: "계정을 안전하게 보호하기 위한 팁입니다.",
            date: "2024-04-05",
            views: 900,
        },
        {
            id: 5,
            category: "일반",
            categoryColor: "#e0e0e0",
            textColor: "#575757",
            title: "일반 공지사항",
            content: "팀에서 전해드리는 일반 업데이트입니다.",
            date: "2024-05-01",
            views: 1100,
        },
    ]

    return (
        <Box sx={{ pt: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box sx={{ position: "relative", width: { xs: "100%", md: "66.666667%" }, mb: { xs: 2, md: 0 } }}>
                    <TextField
                        fullWidth
                        placeholder="공지사항 검색"
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
                <Typography variant="body2" sx={{ color: "#9c7349" }}>
                    총{" "}
                    <Box component="span" sx={{ fontWeight: 600, color: "#1c140d" }}>
                        5
                    </Box>
                    개
                </Typography>
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
                    최신순
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
                    오래된순
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
                    조회순
                </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 6 }}>
                {announcements.map((announcement) => (
                    <AnnouncementItem key={announcement.id} announcement={announcement} />
                ))}
            </Box>
        </Box>
    )
}

export default AnnouncementsTab
