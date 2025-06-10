import React from 'react';
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
} from '@mui/material';
import { ChevronRight, MoreVert } from '@mui/icons-material';
import {Order} from '../types';

// OrderItem 컴포넌트의 props 인터페이스
interface OrderItemProps {
    order: Order;
    handleOrderAction: (action: string, order: Order) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, handleOrderAction }) => {
    return (
        <Paper sx={{ mb: 2 }}> {/* key는 map 함수에서 사용되므로 여기서는 제거 */}
            <Box sx={{ p: 3 }}>
                {/* 주문 날짜 및 주문 상세보기 버튼 */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{order.date} 주문</Typography>
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

                {/* 주문 상세 내용을 테이블로 구성 */}
                <TableContainer>
                    <Table sx={{ minWidth: 650, borderCollapse: 'separate' }}> {/* borderCollapse: 'separate' 추가하여 borderLeft가 잘 보이도록 */}
                        <TableBody>
                            <TableRow>
                                {/* 좌측 셀: 배송 상태, 상품 정보, 장바구니 담기 버튼 */}
                                <TableCell sx={{ verticalAlign: 'top', width: '70%', borderBottom: 'none' }}> {/* borderBottom: 'none' 추가 */}
                                    {/* 배송 상태 섹션 (HTML 스니펫의 sc-ki5ja7-0 bQVZKC 부분) */}
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#111111' }}>배송완료</Typography>
                                            <Typography variant="body2" sx={{ color: '#008C00' }}>{order.deliveryDate} 도착</Typography>
                                        </Box>
                                        <IconButton size="small">
                                            <MoreVert /> {/* HTML 스니펫의 세 점 버튼 */}
                                        </IconButton>
                                    </Box>

                                    {/* 상품 정보 */}
                                    {order.products.map((product) => (
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
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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
    );
};

export default OrderItem;