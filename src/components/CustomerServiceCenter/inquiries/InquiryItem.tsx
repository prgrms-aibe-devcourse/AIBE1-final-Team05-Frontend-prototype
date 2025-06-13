"use client"

import type React from "react"
import { Box, Typography } from "@mui/material"
import type { Inquiry } from "./InquiryHistory"

interface InquiryItemProps {
    inquiry: Inquiry
    isSelected: boolean
    onSelect: () => void
}

const InquiryItem: React.FC<InquiryItemProps> = ({ inquiry, isSelected, onSelect }) => {
    return (
        <Box
            sx={{
                p: 2,
                cursor: "pointer",
                "&:hover": { bgcolor: "rgba(255, 243, 199, 0.5)" },
                bgcolor: isSelected ? "#fef3c7" : "transparent",
                borderLeft: "4px solid",
                borderLeftColor: isSelected ? "#f38b24" : "transparent",
                borderBottom: "1px solid #e8dbce",
                // 각 항목의 높이를 고정하여 레이아웃 일관성 유지
                minHeight: "80px",
                display: "flex",
                flexDirection: "column",
                flexShrink: 0, // 항목이 압축되지 않도록 설정
            }}
            onClick={onSelect}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{
                        color: "#1c140d",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "70%",
                    }}
                >
                    {inquiry.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9c7349" }}>
                    {inquiry.date}
                </Typography>
            </Box>
            <Typography
                variant="caption"
                sx={{
                    color: "#9c7349",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mb: 0.5,
                }}
            >
                {inquiry.content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                <Typography
                    variant="caption"
                    fontWeight="semibold"
                    sx={{
                        color: inquiry.status === "pending" ? "#ef4444" : "#16a34a",
                    }}
                >
                    {inquiry.status === "pending" ? "답변 대기중" : "답변 완료"}
                </Typography>

            </Box>
        </Box>
    )
}

export default InquiryItem
