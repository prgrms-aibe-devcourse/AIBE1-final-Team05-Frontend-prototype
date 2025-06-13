"use client"

import React, {useMemo, useState} from "react"
import { Box, Typography, Paper, TextField, Chip, Button, Alert, Stepper, Step, StepLabel } from "@mui/material"
import { Search } from "@mui/icons-material"
import type { OrdersViewProps } from "./index"
import OrderItem from "./OrderItem"
import CustomStepIcon from "./CustomStepIcon"
import ArrowConnector from "./ArrowConnector"
import Pagination from "../common/Pagination"
import {extendedMockOrders} from "@/data/mock-data"


const OrdersView: React.FC<OrdersViewProps> = ({
                                                   searchQuery,
                                                   setSearchQuery,
                                                   selectedPeriod,
                                                   setSelectedPeriod,
                                                   handleOrderAction,
                                               }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const shippingSteps = ["결제 완료", "상품 준비중", "배송 준비 완료", "배송중", "배송 완료"]

    const descriptions = [
        "주문 결제가\n완료되었습니다.",
        "판매자가 발송할\n상품을 준비중입니다.",
        "상품 준비가 완료되어\n택배를 예정입니다.",
        "상품이 고객님께\n배송중입니다.",
        "상품이 주문자에게\n전달 완료되었습니다.",
    ]

    // 검색 및 기간 필터링
    const filteredOrders = useMemo(() => {
        let filtered = extendedMockOrders

        // 검색 필터
        if (searchQuery.trim()) {
            filtered = filtered.filter((order) =>
                order.products.some((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())),
            )
        }

        // 기간 필터
        if (selectedPeriod !== "최근 6개월") {
            filtered = filtered.filter((order) => order.date.includes(selectedPeriod))
        }

        return filtered
    }, [searchQuery, selectedPeriod])

    // 페이지네이션을 위한 주문 슬라이싱
    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredOrders.slice(startIndex, endIndex)
    }, [filteredOrders, currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Box>
            <Typography variant="h4" style={{ fontWeight: "bold", marginBottom: 32, color: "text.primary" }}>
                주문/배송 조회
            </Typography>

            <Paper style={{ padding: 24, marginBottom: 32, backgroundColor: "#fef3e2" }}>
                <Box style={{ display: "flex", gap: 16, alignItems: "end", marginBottom: 24 }}>
                    <TextField
                        fullWidth
                        placeholder="주문한 상품을 검색할 수 있어요!"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                        slotProps={{
                        input: {
                            endAdornment: <Search color="action" />
                        }
                    }}

                    />
                </Box>
                <Box style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["최근 6개월", "2025", "2024", "2023", "2022", "2021", "2020"].map((period) => (
                        <Chip
                            key={period}
                            label={period}
                            color={selectedPeriod === period ? "primary" : "default"}
                            variant={selectedPeriod === period ? "filled" : "outlined"}
                            onClick={() => setSelectedPeriod(period)}
                            size="small"
                        />
                    ))}
                </Box>
            </Paper>

            {/* 페이지네이션된 주문 목록 */}
            <Box style={{ marginBottom: 32 }}>
                {paginatedOrders.map((order) => (
                    <OrderItem key={order.id} order={order} handleOrderAction={handleOrderAction} />
                ))}
            </Box>

            {/* 페이지네이션 */}
            <Box style={{ marginBottom: 32 }}>
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredOrders.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </Box>

            <Paper style={{ padding: 24, marginBottom: 32 }}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
                        배송상품 주문상태 안내
                    </Typography>
                    <Button variant="text" color="primary" size="small">
                        {"자세한 내용 더보기 >"}
                    </Button>
                </Box>

                <Stepper activeStep={-1} alternativeLabel connector={<ArrowConnector />} style={{ marginBottom: 32 }}>
                    {shippingSteps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                slots={{
                                    stepIcon: CustomStepIcon,
                                }}
                                slotProps={{
                                    stepIcon: {
                                        icon: index + 1,
                                    },
                                }}
                            >
                                <Typography variant="body2" style={{ fontWeight: 600 }}>
                                    {label}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    style={{ textAlign: "center", whiteSpace: "pre-line" }}
                                >
                                    {descriptions[index]}
                                </Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            <Paper style={{ padding: 24 }}>
                <Alert severity="error" style={{ marginBottom: 24 }}>
                    <Typography variant="body2" style={{ fontWeight: 600 }}>
                        취소/반품/교환 신청전 확인해주세요!
                    </Typography>
                </Alert>

                <Box style={{ marginBottom: 24 }}>
                    <Typography variant="subtitle2" style={{ fontWeight: 600, marginBottom: 8 }}>
                        취소
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: 8 }}>
                        • 취소수수료를 확인하여 2일 이내(주말,공휴일 제외) 처리결과를 안내해드립니다.(공휴 경우 기준 마감시간 오후
                        4시)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • 주문 상품은 사용 전날 오후 6시까지 취소 신청 시 취소수수료가 발생되지 않습니다.
                    </Typography>
                </Box>

                <Box style={{ marginBottom: 24 }}>
                    <Typography variant="subtitle2" style={{ fontWeight: 600, marginBottom: 8 }}>
                        반품
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: 8 }}>
                        • 상품 수령 후 7일 이내 신청하여 주세요.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: 8 }}>
                        • 상품의 불량된 이유에는 택배 완료 후, 반품 상품을 회수합니다.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • 절차상품/주문제작/해외배송/신선식품 상품 등은 고객변심에서만 반품 신청이 가능합니다.{" "}
                        <Button variant="text" size="small" color="primary">
                            1:1문의하기 &gt;
                        </Button>
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" style={{ fontWeight: 600, marginBottom: 8 }}>
                        교환
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • 상품의 교환 신청은 고객센터로 문의하여 주세요.{" "}
                        <Button variant="text" size="small" color="primary">
                            1:1문의하기 &gt;
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default OrdersView