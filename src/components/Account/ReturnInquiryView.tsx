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
    TableHead,
    TableRow,
} from "@mui/material"
import { ChevronRight } from "@mui/icons-material"

interface ReturnInquiryViewProps {
    returnTab: number
    setReturnTab: (tab: number) => void
    setDetailView: (view: string | null) => void
}

const ReturnInquiryView: React.FC<ReturnInquiryViewProps> = ({ returnTab, setReturnTab, setDetailView }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "text.primary" }}>
                취소/반품/교환 내역
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs value={returnTab} onChange={(_e, newValue) => setReturnTab(newValue)}>
                    <Tab label="취소/반품/교환" />
                    <Tab label="무통장환불" />
                </Tabs>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`• 취소/반품/교환 신청한 내역을 확인할 수 있습니다.`}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {`• 하단 상품목록에 없는 상품은 1:1문의 또는 고객센터(1577-7011)로 문의주세요.`}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box />
                    <Button variant="text" color="primary" size="small" endIcon={<ChevronRight />}>
                        {"취소/반품 안내"}
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                            <TableCell colSpan={4}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    취소접수일: 2022/7/23 | 주문일: 2022/7/23 | 주문번호: 29000146282236
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    셀리본 프리미엄 롤 포킹 헤어브러쉬
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    셀리본 프리미엄 토모 롤 포킹 헤어브러쉬, 1호, 1개
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">1개</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    8,260 원
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">취소완료</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="outlined" size="small" onClick={() => setDetailView("cancel-detail")}>
                                    취소상세
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ReturnInquiryView