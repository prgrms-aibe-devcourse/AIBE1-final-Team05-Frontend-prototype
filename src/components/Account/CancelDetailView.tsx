"use client"

import type React from "react"
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material"
import { ChevronRight } from "@mui/icons-material"

interface CancelDetailViewProps {
    setDetailView: (view: string | null) => void
}

const CancelDetailView: React.FC<CancelDetailViewProps> = ({ setDetailView }) => {
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
                취소/반품/교환/환불내역 상세
            </Typography>

            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    주문일 : 2022/7/23 | 주문번호 : 29000146282236
                </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src="/placeholder.svg?height=80&width=80" variant="rounded" sx={{ width: 80, height: 80 }} />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                                            셀리본 프리미엄 롤 포킹 헤어브러쉬
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            셀리본 프리미엄 토모 롤 포킹 헤어브러쉬, 1호, 1개
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography variant="body2">1개</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    8,260 원
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    취소완료
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                상세정보
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>취소접수일자</TableCell>
                            <TableCell>2022/7/23</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>취소접수번호</TableCell>
                            <TableCell>596931508</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>취소완료일</TableCell>
                            <TableCell>2022/7/23</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                취소 사유
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>취소 사유</TableCell>
                            <TableCell>상품을 주가하여 재주문</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    환불안내
                </Typography>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    취소영수증 확인
                </Typography>
            </Box>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>상품금액</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>8,260원</TableCell>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 150 }}>환불 수단</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>국민은행 8,260원</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>배송비</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>0원</TableCell>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>환불 완료</TableCell>
                            <TableCell sx={{ textAlign: "right", color: "error.main", fontWeight: 600 }}>8,260원</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>반품비</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>0원</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="contained" size="large" sx={{ minWidth: 120 }} onClick={() => setDetailView(null)}>
                    목록
                </Button>
            </Box>
        </Box>
    )
}

export default CancelDetailView