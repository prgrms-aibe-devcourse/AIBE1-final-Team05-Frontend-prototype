"use client"

import type React from "react"
import { useState } from "react"
import { Box, Container, Typography } from "@mui/material"
import ChatInquirySection from "../../components/CustomerServiceCenter/ChatInquirySection"
import TabNavigation from "../../components/CustomerServiceCenter/TabNavigation"
import AnnouncementsTab from "../../components/CustomerServiceCenter/announcements/AnnouncementsTab"
import FAQTab from "../../components/CustomerServiceCenter/faqs/FAQTab"
import InquiriesTab from "../../components/CustomerServiceCenter/inquiries/InquiriesTab"
import FloatingChatButton from "../../components/CustomerServiceCenter/FloatingChatButton"

// 탭 타입 정의
export type TabType = "announcements" | "faq" | "inquiries"

const CustomerServicePage: React.FC = () => {
    // 현재 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState<TabType>("announcements")

    // 탭 변경 핸들러
    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab)
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "#fcfaf8",
                overflow: "hidden",
            }}
        >
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    px: { xs: 2, md: 3 },
                }}
            >
                <Box sx={{ py: { xs: 4, md: 6 }, textAlign: "center" }}>
                    <Typography variant="body1" sx={{ mt: 1, fontSize: { xs: "1.125rem", md: "1.25rem" }, color: "#9c7349" }}>
                        CatDogEats가 도와드릴게요
                    </Typography>
                </Box>

                <ChatInquirySection />

                <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

                {activeTab === "announcements" && <AnnouncementsTab />}
                {activeTab === "faq" && <FAQTab />}
                {activeTab === "inquiries" && <InquiriesTab />}
            </Container>

            <FloatingChatButton />
        </Box>
    )
}

export default CustomerServicePage
