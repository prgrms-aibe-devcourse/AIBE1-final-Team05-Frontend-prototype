"use client"

import type React from "react"
import { Box, Typography, Chip, Button, Divider, Paper } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

interface AnnouncementDetailProps {
    announcement: {
        id: number
        title: string
        content: string
        category: string
        categoryColor: string
        textColor: string
        date: string
        views: number
        importance: "일반" | "중요" | "긴급"
        attachments?: {
            name: string
            url: string
        }[]
    }
    onBack: () => void
}

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ announcement, onBack }) => {
    // 중요도에 따른 색상 설정
    const getImportanceColor = (importance: string) => {
        switch (importance) {
            case "긴급":
                return "#ef4444"
            case "중요":
                return "#f38b24"
            default:
                return "#9c7349"
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4, borderRadius: 2, bgcolor: "white", border: "1px solid #e8dbce" }}>
            {/* 헤더 영역 */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{
                        color: "#9c7349",
                        "&:hover": { bgcolor: "transparent", color: "#f38b24" },
                    }}
                >
                    목록으로 돌아가기
                </Button>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: "#9c7349", fontSize: "0.875rem" }}>
                        <CalendarTodayIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        {announcement.date}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", color: "#9c7349", fontSize: "0.875rem" }}>
                        <VisibilityIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
                        조회수 {announcement.views}
                    </Box>
                </Box>
            </Box>

            {/* 제목 및 카테고리 영역 */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Chip
                        label={announcement.category}
                        size="small"
                        sx={{
                            bgcolor: announcement.categoryColor,
                            color: announcement.textColor,
                            fontSize: "0.75rem",
                            height: 24,
                        }}
                    />
                    <Chip
                        label={announcement.importance}
                        size="small"
                        sx={{
                            bgcolor: "transparent",
                            color: getImportanceColor(announcement.importance),
                            border: `1px solid ${getImportanceColor(announcement.importance)}`,
                            fontSize: "0.75rem",
                            height: 24,
                        }}
                    />
                </Box>
                <Typography variant="h5" fontWeight={600} sx={{ color: "#1c140d" }}>
                    {announcement.title}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: "#e8dbce", my: 3 }} />

            {/* 내용 영역 */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="body1"
                    sx={{
                        color: "#1c140d",
                        whiteSpace: "pre-line",
                        lineHeight: 1.7,
                    }}
                >
                    {announcement.content}
                </Typography>
            </Box>

            {/* 첨부파일 영역 */}
            {announcement.attachments && announcement.attachments.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#1c140d", mb: 1 }}>
                        첨부파일
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {announcement.attachments.map((file, index) => (
                            <Box
                                key={index}
                                component="a"
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    p: 1.5,
                                    bgcolor: "#f4ede7",
                                    borderRadius: 1,
                                    color: "#1c140d",
                                    textDecoration: "none",
                                    "&:hover": {
                                        bgcolor: "#e8dbce",
                                    },
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        display: "inline-block",
                                        width: 24,
                                        height: 24,
                                        bgcolor: "#f38b24",
                                        color: "white",
                                        borderRadius: 0.5,
                                        fontSize: "0.75rem",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        lineHeight: "24px",
                                        mr: 1.5,
                                    }}
                                >
                                    {file.name.split(".").pop()?.toUpperCase()}
                                </Box>
                                <Typography variant="body2" sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {file.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            <Divider sx={{ borderColor: "#e8dbce", my: 3 }} />

            {/* 하단 버튼 영역 */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{
                        borderColor: "#e8dbce",
                        color: "#9c7349",
                        "&:hover": {
                            borderColor: "#d1c5b8",
                            bgcolor: "transparent",
                        },
                        px: 4,
                    }}
                >
                    목록
                </Button>
            </Box>
        </Box>
    )
}

export default AnnouncementDetail
