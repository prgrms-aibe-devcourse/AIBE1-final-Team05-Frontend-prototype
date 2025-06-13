"use client"

import { useState, useMemo } from "react"
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Button,
    Paper,
    TableCell,
    TableRow, TableBody,
    TableHead,
    Table,
    TableContainer,
} from "@mui/material"
import { ChevronRight } from "@mui/icons-material"

import { ReturnInquiryViewProps} from "@/components/Account/index"
import { mockReturnOrders } from "@/data/mock-data"
import Pagination from "../common/Pagination"
import React from "react"


const ReturnInquiryView: React.FC<ReturnInquiryViewProps> = ({ returnTab, setReturnTab, setDetailView }) => {
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return mockReturnOrders.slice(startIndex, endIndex)
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" mb={4} color="text.primary">
                취소/환불 내역
            </Typography>

            <Box style={{ borderBottom: "1px solid #e0e0e0", marginBottom: 24 }}>
                <Tabs value={returnTab} onChange={(_e, newValue) => setReturnTab(newValue)}>
                    <Tab label="취소/환불" />
                </Tabs>
            </Box>

            <Box mb={3}>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    • 취소/반품/교환 신청한 내역을 확인할 수 있습니다.
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    • 하단 상품목록에 없는 상품은 1:1문의 또는 고객센터(1577-7011)로 문의주세요.
                </Typography>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box />
                    <Button variant="text" color="primary" size="small" endIcon={<ChevronRight />}>
                        취소/반품 안내
                    </Button>
                </Box>
            </Box>

            {/* 주문별 테이블 목록 */}
            <Box mb={4}>
                {paginatedOrders.map((order) => (
                    <TableContainer component={Paper} key={order.id} style={{ marginBottom: 16 }}>
                        <Table>
                            {/* 주문 헤더 */}
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                                    <TableCell colSpan={4}>
                                        <Typography variant="body2" fontWeight="600">
                                            접수일: {order.cancelDate} | 주문일: {order.orderDate} | 주문번호: {order.orderNumber}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {/* 상품 목록 */}
                            <TableBody>
                                {order.products.map((product, index) => (
                                    <TableRow key={product.id}>
                                        {/* 상품 정보 */}
                                        <TableCell style={{ width: "50%" }}>
                                            <Typography variant="body2" fontWeight="600" mb={0.5}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {product.detail}
                                            </Typography>
                                        </TableCell>

                                        {/* 수량 및 가격 */}
                                        <TableCell align="center" style={{ width: "15%" }}>
                                            <Typography variant="body2">{product.quantity}</Typography>
                                            <Typography variant="body2" fontWeight="600">
                                                {product.price}
                                            </Typography>
                                        </TableCell>

                                        {/* 상태 */}
                                        <TableCell align="center" style={{ width: "15%" }}>
                                            <Typography variant="body2">{product.status}</Typography>
                                        </TableCell>

                                        {/* 취소상세 버튼 - 첫 번째 상품에만 표시하고 rowSpan 사용 */}
                                        {index === 0 && (
                                            <TableCell
                                                align="center"
                                                rowSpan={order.products.length}
                                                style={{
                                                    width: "20%",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => setDetailView("cancel-detail")}
                                                >
                                                    상세보기
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))}
            </Box>

            {/* 페이지네이션 */}
            <Pagination
                currentPage={currentPage}
                totalItems={mockReturnOrders.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </Box>
    )
}

export default ReturnInquiryView
