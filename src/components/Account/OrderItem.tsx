"use client"

import type React from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    IconButton,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material"
import { ChevronRight, MoreVert } from "@mui/icons-material"
import type { Order } from "./index"

interface OrderItemProps {
    order: Order
    handleOrderAction: (action: string, order: Order) => void
}

const OrderItem: React.FC<OrderItemProps> = ({ order, handleOrderAction }) => {
    return (
        <Paper sx={{ mb: 2 }}>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {order.date} 주문
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        endIcon={<ChevronRight />}
                        onClick={() => handleOrderAction("detail", order)}
                    >
                        {"주문 상세보기"}
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <TableContainer>
                    <Table sx={{ minWidth: 650, borderCollapse: "separate" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ verticalAlign: "top", width: "70%", borderBottom: "none" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111111" }}>
                                                배송완료
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#008C00" }}>
                                                {order.deliveryDate} 도착
                                            </Typography>
                                        </Box>
                                        <IconButton size="small">
                                            <MoreVert />
                                        </IconButton>
                                    </Box>

                                    {order.products.map((product) => (
                                        <Box key={product.id} sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 3 }}>
                                            <Avatar src={product.image} variant="rounded" sx={{ width: 80, height: 80 }} />
                                            <Box
                                                sx={{
                                                    flexGrow: 1,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    height: "80px",
                                                }}
                                            >
                                                <Box>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                            {product.name}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.price > 0 ? `${product.price.toLocaleString()}원` : "0원"} {product.quantity}개
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                                    <Button variant="outlined" size="small">
                                                        장바구니 담기
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        verticalAlign: "middle",
                                        width: "30%",
                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                        paddingLeft: 3,
                                        borderBottom: "none",
                                    }}
                                >
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Button variant="outlined" size="small" onClick={() => handleOrderAction("shipping", order)}>
                                            배송조회
                                        </Button>
                                        <Button variant="outlined" size="small" onClick={() => handleOrderAction("return", order)}>
                                            교환, 반품 신청
                                        </Button>
                                        <Button variant="outlined" size="small" onClick={() => handleOrderAction("review", order)}>
                                            리뷰 작성하기
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    )
}

export default OrderItem
