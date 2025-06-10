// src/components/OrderDetail.tsx

import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    IconButton, // IconButton 임포트 추가
} from '@mui/material';
import { ChevronRight, MoreVert } from '@mui/icons-material'; // MoreVert 임포트 추가

// 공통 타입 정의 파일에서 Order 및 Product 인터페이스 임포트
import { Order } from '../types'; // 경로를 프로젝트 구조에 맞게 조정하세요. (예: '../../types')

interface OrderDetailProps {
    selectedOrder: Order | null;
    setDetailView: (view: string | null) => void;
    // handleOrderAction 함수도 필요하다면 props로 전달받을 수 있습니다.
    handleOrderAction: (action: string, order: Order) => void; // handleOrderAction 추가
}

const OrderDetail: React.FC<OrderDetailProps> = ({ selectedOrder, setDetailView, handleOrderAction }) => {
    if (!selectedOrder) {
        return <Typography>주문 정보를 불러오는 중입니다...</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
                주문상세
            </Typography>

            <Typography variant="h6" sx={{ mb: 1 }}>
                {selectedOrder.date}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                주문번호: {selectedOrder.orderNumber}
            </Typography>

            {/* 여기부터 변경된 부분 */}
            <TableContainer component={Paper} sx={{ mb: 4, border: '1px solid rgba(224, 224, 224, 1)' }}> {/* Paper 대신 TableContainer 사용, 전체 테두리 추가 */}
                <Table sx={{ minWidth: 650, borderCollapse: 'separate' }}>
                    <TableBody>
                        <TableRow>
                            {/* 좌측 셀: 배송 상태, 상품 정보, 장바구니 담기 버튼 */}
                            <TableCell sx={{ verticalAlign: 'top', width: '70%', borderBottom: 'none', pr: 3 }}> {/* pr:0 으로 우측 padding 제거 */}
                                {/* 배송 상태 섹션 */}
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#111111' }}>
                                            {selectedOrder.status}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: selectedOrder.statusColor === "success" ? "#008C00" : "text.secondary" }}>
                                            {selectedOrder.deliveryDate} 도착
                                        </Typography>
                                    </Box>
                                    <IconButton size="small">
                                        <MoreVert />
                                    </IconButton>
                                </Box>

                                {/* 상품 정보 반복 */}
                                {selectedOrder.products.map((product) => (
                                    <Box key={product.id} sx={{ display: "flex", alignItems: "flex-start", gap: 3, mb: 3 }}>
                                        <Avatar src={product.image} variant="rounded" sx={{ width: 80, height: 80 }} />
                                        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: '80px' }}>
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
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} >
                                                <Button variant="outlined" size="small">
                                                    장바구니 담기
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </TableCell>

                            {/* 우측 셀: 액션 버튼들 (세로선 포함) */}
                            <TableCell
                                sx={{
                                    verticalAlign: 'middle',
                                    width: '30%',
                                    borderLeft: '1px solid rgba(224, 224, 224, 1)', // 세로선 추가
                                    paddingLeft: 3, // 선과 버튼 사이의 간격 조정
                                    borderBottom: 'none' // TableCell 기본 하단 선 제거
                                }}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    {/* handleOrderAction은 이제 props로 받아옵니다 */}
                                    <Button variant="outlined" size="small" onClick={() => handleOrderAction("shipping", selectedOrder)}>
                                        배송조회
                                    </Button>
                                    <Button variant="outlined" size="small" onClick={() => handleOrderAction("return", selectedOrder)}>
                                        교환, 반품 신청
                                    </Button>
                                    <Button variant="outlined" size="small" onClick={() => handleOrderAction("review", selectedOrder)}>
                                        리뷰 작성하기
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* 변경된 부분 끝 */}

            {/* 받는사람 정보 */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                받는사람 정보
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 120 }}>받는사람</TableCell>
                            <TableCell>홍길동</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>연락처</TableCell>
                            <TableCell>010-1234-5678</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>받는주소</TableCell>
                            <TableCell>(06627) 서울특별시 서초구 반포대로 45 4층</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5" }}>배송요청사항</TableCell>
                            <TableCell>세대 : 기타 (택배함)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 결제 정보 */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                결제 정보
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, bgcolor: "#f5f5f5", width: 120 }}>결제수단</TableCell>
                            <TableCell sx={{ textAlign: "right" }}>
                                <Box>
                                    <Typography variant="body2">총 상품가격: {selectedOrder.total.toLocaleString()} 원</Typography>
                                    <Typography variant="body2">할인금액: {selectedOrder.total.toLocaleString()} 원</Typography> {/* 예시 */}
                                    <Typography variant="body2">배송비: 0 원</Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        총 결제금액: 0 원 {/* 이 부분도 실제 계산된 값으로 */}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 결제영수증 정보 */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                결제영수증 정보
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    해당 주문건에 대해 거래명세서 확인이 가능합니다.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="outlined" size="small">
                        거래명세서
                    </Button>
                </Box>
            </Paper>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                <Button variant="outlined"
                        startIcon={<ChevronRight sx={{ transform: "rotate(180deg)" }} />}
                        onClick={() => setDetailView(null)}
                >
                    주문목록 돌아가기
                </Button>
                <Button variant="outlined" color="error">
                    주문내역 삭제
                </Button>
            </Box>
        </Box>
    );
};

export default OrderDetail;