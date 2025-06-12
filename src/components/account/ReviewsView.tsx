"use client"

import type React from "react"
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
import type { Order } from "./index"

interface ReviewsViewProps {
    mockOrders: Order[]
    handleOrderAction: (action: string, order: Order) => void
}

const ReviewsView: React.FC<ReviewsViewProps> = ({ mockOrders, handleOrderAction }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
                리뷰 관리
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs value={0}>
                    <Tab label="리뷰 작성" />
                    <Tab label="작성한 리뷰" />
                </Tabs>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    작성 가능한 리뷰 1건이 있습니다.
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

            {mockOrders.map((order) => (
                <Paper key={order.id} sx={{ mb: 3, p: 3 }}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {order.products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell sx={{ width: 120 }}>
                                            <Avatar src={product.image} variant="rounded" sx={{ width: 100, height: 100 }} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {order.deliveryDate ? `${order.deliveryDate.split("(")[0]} 배송` : "배송 완료"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right" sx={{ width: 200 }}>
                                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    sx={{ mb: 1 }}
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
        </Box>
    )
}

export default ReviewsView