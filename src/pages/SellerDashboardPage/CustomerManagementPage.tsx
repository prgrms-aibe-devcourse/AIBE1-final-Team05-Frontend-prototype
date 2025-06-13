"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Container,
    useTheme,
    useMediaQuery,
    type SelectChangeEvent,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import type { CustomerInquiry } from "../../types/customer"
import CustomerInquiryList from "../../components/customer/CustomerInquiryList"
import ChatWindow from "../../components/customer/ChatWindow"
import ProductReviewList from "../../components/customer/ProductReviewList"
import { customerInquiries, productReviews } from "../../data/customerData"

const CustomerManagementPage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [activeTab, setActiveTab] = useState(0)
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerInquiry | null>(null)
    const [reviewFilter, setReviewFilter] = useState("all")
    const [reviewSort, setReviewSort] = useState("latest")

    // 탭 변경 핸들러
    const switchToTab = (tabIndex: number) => {
        setActiveTab(tabIndex)
        setSelectedCustomer(null)
    }

    const handleCustomerClick = (customer: CustomerInquiry) => {
        setSelectedCustomer(customer)
    }

    const handleBackToList = () => {
        setSelectedCustomer(null)
    }

    const handleFilterChange = (event: SelectChangeEvent) => {
        setReviewFilter(event.target.value)
    }

    const handleSortChange = (event: SelectChangeEvent) => {
        setReviewSort(event.target.value)
    }

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
            {/* 탭 헤더 */}
            <Paper elevation={1} sx={{ borderRadius: 0, mb: 2 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 2 }}>
                        {selectedCustomer && isMobile && (
                            <IconButton onClick={handleBackToList}>
                                <ArrowBack />
                            </IconButton>
                        )}
                        <Typography variant="h4" fontWeight="bold">
                            {selectedCustomer && isMobile ? selectedCustomer.name : "고객 관리"}
                        </Typography>
                    </Box>
                    {(!selectedCustomer || !isMobile) && (
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            {/* 커스텀 탭 UI */}
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Box
                                    onClick={() => switchToTab(0)}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        cursor: "pointer",
                                        borderBottom: activeTab === 0 ? `2px solid ${theme.palette.primary.main}` : "none",
                                        color: activeTab === 0 ? theme.palette.primary.main : "inherit",
                                        fontWeight: activeTab === 0 ? "bold" : "normal",
                                    }}
                                >
                                    고객 문의
                                </Box>
                                <Box
                                    onClick={() => switchToTab(1)}
                                    sx={{
                                        py: 2,
                                        px: 3,
                                        cursor: "pointer",
                                        borderBottom: activeTab === 1 ? `2px solid ${theme.palette.primary.main}` : "none",
                                        color: activeTab === 1 ? theme.palette.primary.main : "inherit",
                                        fontWeight: activeTab === 1 ? "bold" : "normal",
                                    }}
                                >
                                    상품 리뷰
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Container>
            </Paper>

            {/* 콘텐츠 영역 */}
            <Container maxWidth="lg">
                <Box sx={{ minHeight: "calc(100vh - 200px)" }}>
                    {/* 모바일에서 채팅창이 열린 경우 */}
                    {selectedCustomer && isMobile && (
                        <Box sx={{ height: "100%" }}>
                            <ChatWindow selectedCustomer={selectedCustomer} onBackToList={handleBackToList} isMobile={isMobile} />
                        </Box>
                    )}

                    {/* 데스크톱에서 고객 문의 탭 (분할 화면) */}
                    {activeTab === 0 && (
                        <Box sx={{ display: "flex", height: "100%" }}>
                            {/* 고객 목록 */}
                            <Box
                                sx={{
                                    width: selectedCustomer ? "33%" : "100%",
                                    minWidth: 320,
                                    p: 3,
                                    overflowY: "auto",
                                    borderRight: selectedCustomer ? "1px solid #e0e0e0" : "none",
                                }}
                            >
                                <CustomerInquiryList
                                    customerInquiries={customerInquiries}
                                    selectedCustomer={selectedCustomer}
                                    onCustomerClick={handleCustomerClick}
                                />
                            </Box>

                            {/* 채팅창 */}
                            {selectedCustomer && !isMobile && (
                                <Box sx={{ flexGrow: 1 }}>
                                    <ChatWindow selectedCustomer={selectedCustomer} onBackToList={handleBackToList} isMobile={isMobile} />
                                </Box>
                            )}
                        </Box>
                    )}

                    {/* 상품 리뷰 탭 */}
                    {activeTab === 1 && (
                        <Box sx={{ p: 3, height: "100%", overflow: "auto" }}>
                            <ProductReviewList
                                productReviews={productReviews}
                                reviewFilter={reviewFilter}
                                reviewSort={reviewSort}
                                onFilterChange={handleFilterChange}
                                onSortChange={handleSortChange}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    )
}

export default CustomerManagementPage
