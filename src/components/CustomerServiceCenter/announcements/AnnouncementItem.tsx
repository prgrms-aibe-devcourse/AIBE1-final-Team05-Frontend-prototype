import type React from "react"
import { Box, Typography, Chip } from "@mui/material"

interface AnnouncementProps {
    announcement: {
        id: number
        category: string
        categoryColor: string
        textColor: string
        title: string
        content: string
        date: string
        views: number
    }
}

const AnnouncementItem: React.FC<AnnouncementProps> = ({ announcement }) => {
    return (
        <Box
            sx={{
                bgcolor: "white",
                p: 2,
                borderRadius: 2,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                border: "1px solid #e8dbce",
                "&:hover": {
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    transition: "box-shadow 0.3s ease",
                },
                cursor: "pointer",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
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
                <Typography variant="caption" sx={{ color: "#9c7349" }}>
                    {announcement.date} | 조회수 {announcement.views}
                </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontSize: "1.125rem", fontWeight: 600, color: "#1c140d", mb: 0.5 }}>
                {announcement.title}
            </Typography>
            <Typography
                variant="body2"
                sx={{ color: "#9c7349", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
                {announcement.content}
            </Typography>
        </Box>
    )
}

export default AnnouncementItem
