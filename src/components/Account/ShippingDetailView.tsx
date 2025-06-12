"use client"

import type React from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { ChevronRight, LocalShipping } from "@mui/icons-material"

interface ShippingDetailViewProps {
    setDetailView: (view: string | null) => void
}

const ShippingDetailView: React.FC<ShippingDetailViewProps> = ({ setDetailView }) => {
    return (
        <Box>
            <Button
                startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                onClick={() => setDetailView(null)}
                sx={{ mb: 3 }}
            >
                뒤로가기
            </Button>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                배송조회
            </Typography>

            <Paper sx={{ p: 4, mb: 4, bgcolor: "#f5f5f5", textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    5/29(목) 도착 완료
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    고객님이 주문하신 상품이 배송완료 되었습니다.
                </Typography>
            </Paper>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <LocalShipping />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                배송
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                송장번호: 1029137188374
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                📞 배송업무 중 연락을 받을 수 없습니다.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>받는사람:</strong> 홍길동
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>받는주소:</strong> 서울특별시 서초구 반포대로 45 4층
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>배송요청사항:</strong> 세대: 기타 (택배함)
                        </Typography>
                        <Typography variant="body2" sx={{ color: "success.main", fontWeight: 600 }}>
                            <strong>상품수령방법:</strong> 고객요청
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>시간</strong>
                            </TableCell>
                            <TableCell>
                                <strong>현재위치</strong>
                            </TableCell>
                            <TableCell>
                                <strong>배송상태</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>5월 29, 2025 03:45</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>배송완료</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 02:32</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>배송출발</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 02:04</TableCell>
                            <TableCell>일산5</TableCell>
                            <TableCell>캠프도착</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 29, 2025 00:04</TableCell>
                            <TableCell>고양HUB</TableCell>
                            <TableCell>캠프상차</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>5월 28, 2025 23:58</TableCell>
                            <TableCell>고양HUB</TableCell>
                            <TableCell>집하</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ShippingDetailView