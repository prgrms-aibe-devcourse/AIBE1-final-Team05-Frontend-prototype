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
        <Paper style={{ marginBottom: 16 }}>
            <Box style={{ padding: 24 }}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
                        {order.date} 주문
                    </Typography>
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        endIcon={<ChevronRight />}
                        onClick={() => handleOrderAction("detail", order)}
                    >
                        주문 상세보기
                    </Button>
                </Box>
                <Divider style={{ marginBottom: 16 }} />

                <TableContainer>
                    <Table style={{ minWidth: 650, borderCollapse: "separate" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ verticalAlign: "top", width: "70%", borderBottom: "none" }}>
                                    <Box
                                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}
                                    >
                                        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <Typography variant="h6" style={{ fontWeight: 600, color: "#111111" }}>
                                                배송완료
                                            </Typography>
                                            <Typography variant="body2" style={{ color: "#008C00" }}>
                                                {order.deliveryDate} 도착
                                            </Typography>
                                        </Box>
                                        <IconButton size="small">
                                            <MoreVert />
                                        </IconButton>
                                    </Box>

                                    {order.products.map((product, index) => (
                                        <Box key={product.id}>
                                            <Box style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 24 }}>
                                                <Avatar
                                                    src={product.image}
                                                    variant="rounded"
                                                    style={{ width: 80, height: 80, backgroundColor: "#f5f5f5" }}
                                                />
                                                <Box
                                                    style={{
                                                        flexGrow: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        minHeight: "80px",
                                                    }}
                                                >
                                                    <Box>
                                                        <Box style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                                            <Typography variant="body1" style={{ fontWeight: 500 }}>
                                                                {product.name}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {product.price > 0 ? `${product.price.toLocaleString()}원` : "0원"} {product.quantity}개
                                                        </Typography>
                                                    </Box>
                                                    <Box style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            style={{
                                                                borderColor: "#ff9800",
                                                                color: "#ff9800",
                                                            }}
                                                        >
                                                            장바구니 담기
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {index < order.products.length - 1 && <Divider style={{ marginBottom: 16 }} />}
                                        </Box>
                                    ))}
                                </TableCell>

                                <TableCell
                                    style={{
                                        verticalAlign: "middle",
                                        width: "30%",
                                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                                        paddingLeft: 24,
                                        borderBottom: "none",
                                    }}
                                >
                                    <Box style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleOrderAction("shipping", order)}
                                            style={{
                                                borderColor: "#ff9800",
                                                color: "#ff9800",
                                                padding: "8px 16px",
                                            }}
                                        >
                                            배송조회
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleOrderAction("return", order)}
                                            style={{
                                                borderColor: "#ff9800",
                                                color: "#ff9800",
                                                padding: "8px 16px",
                                            }}
                                        >
                                            교환, 반품 신청
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleOrderAction("review", order)}
                                            style={{
                                                borderColor: "#ff9800",
                                                color: "#ff9800",
                                                padding: "8px 16px",
                                            }}
                                        >
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
