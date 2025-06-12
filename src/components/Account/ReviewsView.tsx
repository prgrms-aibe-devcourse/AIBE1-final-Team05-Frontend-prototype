"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Avatar,
} from "@mui/material"
import { Settings } from "@mui/icons-material"
import type { ReviewsViewProps } from "./index"
import Pagination from "../common/Pagination"
import WrittenReviewsView from "./WrittenReviewsView"

const ReviewsView: React.FC<ReviewsViewProps> = ({ mockOrders, handleOrderAction }) => {
    const [activeTab, setActiveTab] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // 페이지네이션을 위한 주문 슬라이싱
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return mockOrders.slice(startIndex, endIndex)
    }, [mockOrders, currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Box>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: 32, color: "text.primary" }}>
                리뷰 관리
            </Typography>

            <Box style={{ borderBottom: "1px solid #e0e0e0", marginBottom: 24 }}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab label="리뷰 작성" />
                    <Tab label="작성한 리뷰" />
                </Tabs>
            </Box>

            {activeTab === 0 ? (
                <>
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                        <Typography variant="body2" color="text.secondary">
                            작성 가능한 리뷰 {mockOrders.length}건이 있습니다.
                        </Typography>
                        <Box>
                            <Button variant="text" color="primary" size="small">
                                리뷰 운영원칙
                            </Button>
                            <Button variant="text" color="primary" size="small" startIcon={<Settings />}>
                                리뷰 설정
                            </Button>
                        </Box>
                    </Box>

                    {paginatedOrders.map((order) => (
                        <Paper key={order.id} style={{ marginBottom: 24, padding: 24 }}>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {order.products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell style={{ width: 120 }}>
                                                    <Avatar src={product.image} variant="rounded" style={{ width: 100, height: 100 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="h6" style={{ fontWeight: 600, marginBottom: 8 }}>
                                                        {product.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {order.deliveryDate ? `${order.deliveryDate.split("(")[0]} 배송` : "배송 완료"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right" style={{ width: 200 }}>
                                                    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            style={{ marginBottom: 8 }}
                                                            onClick={() => handleOrderAction("review", order)}
                                                        >
                                                            리뷰 작성하기
                                                        </Button>
                                                        <Button variant="text" color="primary" size="small">
                                                            숨기기
                                                        </Button>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    ))}

                    {/* 페이지네이션 */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={mockOrders.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <WrittenReviewsView />
            )}
        </Box>
    )
}

export default ReviewsView