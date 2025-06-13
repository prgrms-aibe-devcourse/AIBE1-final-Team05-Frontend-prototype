import type React from "react"
import { Box, Typography } from "@mui/material"

const ChatInquirySection: React.FC = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "#f4ede7",
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                mb: 4,
                boxShadow: 1,
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    textAlign: { xs: "center", md: "left" },
                    mb: { xs: 3, md: 0 },
                }}
            >
                <Typography variant="h5" fontWeight="600" sx={{ color: "#1c140d", mb: 1 }}>
                    궁금한 점이 있으신가요?
                </Typography>
                <Typography sx={{ color: "#9c7349", mb: 2 }}>전문 상담사가 친절하게 답변해 드립니다.</Typography>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
                <Box
                    component="img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaQX_JslzVdu9ARpqMG8cWyd2CaDzoPKDcqA9CFslSwl2P_HLN602Xz9U1sBS0us4SHwlxnyyo89dfd0kYMOgoW9RDedwJ88ZiX4kNPBCFxFATVnOPrRgJ_ypcDgZ0-1qlS6mKYGrRBzLAud8DIbLLzxrFdurp6B498OFJ0M99YlOdpi2LHTzBulKj1qYDLNecuQvV3K59d9a-YZSpN9OsHHf-q_FYdypMXMEViyHFLxLmSgmnhidsfS3LE2bFFY0uD3kdZqt79Lc"
                    alt="헤드셋을 쓴 귀여운 반려동물"
                    sx={{ height: { xs: 128, md: 160 } }}
                />
            </Box>
        </Box>
    )
}

export default ChatInquirySection
