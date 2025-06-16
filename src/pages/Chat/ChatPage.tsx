"use client"

import type React from "react"
import { useState } from "react"
import {
    Box,
    Container,
    useTheme,
    useMediaQuery,
    type SelectChangeEvent,
} from "@mui/material"
import type { CustomerChat } from "@/types/customer"
import CustomerInquiryList from "../../components/customer/CustomerInquiryList"
import ChatWindow from "../../components/customer/ChatWindow"
import ProductReviewList from "../../components/customer/ProductReviewList"
import { customerChat as initialCustomerInquiries, productReviews } from "../../data/customerData"

const CustomerManagementPage: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [activeTab, ] = useState(0)
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerChat | null>(null)
    const [reviewFilter, setReviewFilter] = useState("all")
    const [reviewSort, setReviewSort] = useState("latest")

    // 고객 문의 목록 상태 관리 (삭제 기능을 위해 state로 관리)
    const [customerInquiries, setCustomerInquiries] = useState<CustomerChat[]>(initialCustomerInquiries)

    const handleCustomerClick = (customer: CustomerChat) => {
        setSelectedCustomer(customer)
    }

    const handleBackToList = () => {
        setSelectedCustomer(null)
    }

    // 채팅방 삭제 핸들러
    const handleDeleteChatRoom = (customerId: number) => {
        // 고객 문의 목록에서 해당 고객 제거
        setCustomerInquiries(prev => prev.filter(customer => customer.id !== customerId))
        // 선택된 고객 초기화
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

            {/* 콘텐츠 영역 */}
            <Container maxWidth="lg">
                <Box sx={{ minHeight: "calc(100vh - 200px)" }}>
                    {/* 모바일에서 채팅창이 열린 경우 */}
                    {selectedCustomer && isMobile && (
                        <Box sx={{ height: "100%" }}>
                            <ChatWindow
                                selectedCustomer={selectedCustomer}
                                onBackToList={handleBackToList}
                                onDeleteChatRoom={handleDeleteChatRoom}
                                isMobile={isMobile}
                            />
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
                                    <ChatWindow
                                        selectedCustomer={selectedCustomer}
                                        onBackToList={handleBackToList}
                                        onDeleteChatRoom={handleDeleteChatRoom}
                                        isMobile={isMobile}
                                    />
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