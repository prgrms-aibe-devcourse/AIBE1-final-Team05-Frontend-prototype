import type React from "react"
import { Box, Typography, Divider } from "@mui/material"
import type { Inquiry } from "./InquiryHistory"

interface InquiryDetailProps {
    inquiry: Inquiry
}

const InquiryDetail: React.FC<InquiryDetailProps> = ({ inquiry }) => {
    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: "#1c140d" }}>
                    {inquiry.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#9c7349" }}>
                    {inquiry.date}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: "#e8dbce" }} />

            <Box>
                <Typography variant="body2" fontWeight="medium" sx={{ color: "#1c140d", mb: 0.5 }}>
                    문의 내용:
                </Typography>
                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "rgba(243, 244, 246, 0.5)",
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ color: "#6b7280", whiteSpace: "pre-line" }}>
                        {inquiry.content}
                    </Typography>
                </Box>
            </Box>

            {inquiry.attachments && inquiry.attachments.length > 0 && (
                <Box>
                    <Typography variant="body2" fontWeight="medium" sx={{ color: "#1c140d", mb: 0.5 }}>
                        첨부 파일:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {inquiry.attachments.map((attachment, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={attachment}
                                alt="첨부된 제품 사진"
                                sx={{
                                    borderRadius: 1,
                                    border: "1px solid rgba(229, 231, 235, 1)",
                                    maxWidth: "100%",
                                    height: "auto",
                                    maxHeight: "200px", // 이미지 최대 높이 제한
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Divider sx={{ borderColor: "#e8dbce" }} />

            <Box>
                <Typography variant="body2" fontWeight="medium" sx={{ color: "#1c140d", mb: 0.5 }}>
                    답변:
                </Typography>
                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: inquiry.status === "pending" ? "rgba(254, 226, 226, 0.5)" : "rgba(220, 252, 231, 0.5)",
                        borderRadius: 1,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: inquiry.status === "pending" ? "#ef4444" : "#6b7280",
                            whiteSpace: "pre-line",
                        }}
                    >
                        {inquiry.answer}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default InquiryDetail