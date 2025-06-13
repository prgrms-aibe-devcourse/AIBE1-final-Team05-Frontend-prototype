"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Button } from "@mui/material"
import InquiryHistory from "./InquiryHistory"
import InquiryForm from "./InquiryForm"

type InquiryTabType = "history" | "new"

const InquiriesTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InquiryTabType>("history")

    const handleTabChange = (tab: InquiryTabType) => {
        setActiveTab(tab)
    }

    return (
        <Box sx={{ pt: 3, pb: 4 }}>
            <Typography variant="h5" fontWeight={600} sx={{ color: "#1c140d", mb: 3 }}>
                1:1 문의
            </Typography>

            <Box sx={{ display: "flex", borderBottom: "1px solid #e8dbce", mb: 3 }}>
                <Button
                    sx={{
                        flex: 1,
                        pb: 1.5,
                        pt: 1,
                        borderBottom: "2px solid",
                        borderBottomColor: activeTab === "history" ? "#f38b24" : "transparent",
                        color: activeTab === "history" ? "#f38b24" : "#9c7349",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        borderRadius: 0,
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                    onClick={() => handleTabChange("history")}
                >
                    문의 내역
                </Button>
                <Button
                    sx={{
                        flex: 1,
                        pb: 1.5,
                        pt: 1,
                        borderBottom: "2px solid",
                        borderBottomColor: activeTab === "new" ? "#f38b24" : "transparent",
                        color: activeTab === "new" ? "#f38b24" : "#9c7349",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        borderRadius: 0,
                        "&:hover": {
                            backgroundColor: "transparent",
                            color: "#f38b24",
                            borderBottomColor: activeTab === "new" ? "#f38b24" : "rgba(243, 139, 36, 0.5)",
                        },
                    }}
                    onClick={() => handleTabChange("new")}
                >
                    문의글 작성
                </Button>
            </Box>

            {activeTab === "history" && <InquiryHistory />}
            {activeTab === "new" && <InquiryForm />}
        </Box>
    )
}

export default InquiriesTab
