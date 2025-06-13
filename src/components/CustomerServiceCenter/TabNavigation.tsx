"use client"

import type React from "react"
import { Box, Button } from "@mui/material"
import type { TabType } from "./index"

interface TabNavigationProps {
    activeTab: TabType
    onTabChange: (tab: TabType) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <Box
            sx={{
                display: "flex",
                borderBottom: "1px solid #e8dbce",
                gap: 3,
                pb: 0.5,
            }}
        >
            <Button
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid",
                    borderBottomColor: activeTab === "announcements" ? "#f38b24" : "transparent",
                    color: activeTab === "announcements" ? "#f38b24" : "#9c7349",
                    pb: 1.5,
                    pt: 2,
                    minWidth: "auto",
                    "&:hover": {
                        color: "#f38b24",
                        borderBottomColor: activeTab === "announcements" ? "#f38b24" : "rgba(243, 139, 36, 0.5)",
                        backgroundColor: "transparent",
                    },
                }}
                onClick={() => onTabChange("announcements")}
            >
                <Box component="p" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
                    공지사항
                </Box>
            </Button>
            <Button
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid",
                    borderBottomColor: activeTab === "faq" ? "#f38b24" : "transparent",
                    color: activeTab === "faq" ? "#f38b24" : "#9c7349",
                    pb: 1.5,
                    pt: 2,
                    minWidth: "auto",
                    "&:hover": {
                        color: "#f38b24",
                        borderBottomColor: activeTab === "faq" ? "#f38b24" : "rgba(243, 139, 36, 0.5)",
                        backgroundColor: "transparent",
                    },
                }}
                onClick={() => onTabChange("faq")}
            >
                <Box component="p" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
                    FAQ
                </Box>
            </Button>
            <Button
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "3px solid",
                    borderBottomColor: activeTab === "inquiries" ? "#f38b24" : "transparent",
                    color: activeTab === "inquiries" ? "#f38b24" : "#9c7349",
                    pb: 1.5,
                    pt: 2,
                    minWidth: "auto",
                    "&:hover": {
                        color: "#f38b24",
                        borderBottomColor: activeTab === "inquiries" ? "#f38b24" : "rgba(243, 139, 36, 0.5)",
                        backgroundColor: "transparent",
                    },
                }}
                onClick={() => onTabChange("inquiries")}
            >
                <Box component="p" sx={{ fontSize: "0.875rem", fontWeight: "bold" }}>
                    1:1 문의
                </Box>
            </Button>
        </Box>
    )
}

export default TabNavigation