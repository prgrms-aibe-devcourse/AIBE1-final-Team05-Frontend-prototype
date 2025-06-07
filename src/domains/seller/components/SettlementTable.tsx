import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    useTheme
} from '@mui/material';
import { SettlementTableProps, SettlementFilters } from '../types';

const SettlementTable = ({
                             data,
                             filters,
                             onFiltersChange,
                             onSettlementRequest
                         }: SettlementTableProps) => {
    const theme = useTheme();

    const handleFilterChange = (filterKey: keyof SettlementFilters) =>
        (event: SelectChangeEvent) => {
            onFiltersChange({
                [filterKey]: event.target.value
            });
        };

    // 총 정산 금액 계산
    const totalSettlementAmount = data.reduce((sum, item) => sum + item.settlementAmount, 0);

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: theme.palette.text.primary
                }}
            >
                정산 현황
            </Typography>

            {/* 필터 섹션 */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={filters.paymentFilter}
                        onChange={handleFilterChange('paymentFilter')}
                        displayEmpty
                    >
                        <MenuItem value="전체">결제일</MenuItem>
                        <MenuItem value="오늘">오늘</MenuItem>
                        <MenuItem value="일주일">일주일</MenuItem>
                        <MenuItem value="한달">한달</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={filters.deliveryFilter}
                        onChange={handleFilterChange('deliveryFilter')}
                        displayEmpty
                    >
                        <MenuItem value="배송완료">배송완료</MenuItem>
                        <MenuItem value="배송중">배송중</MenuItem>
                        <MenuItem value="배송준비">배송준비</MenuItem>
                        <MenuItem value="전체">전체</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={filters.confirmFilter}
                        onChange={handleFilterChange('confirmFilter')}
                        displayEmpty
                    >
                        <MenuItem value="구매확정">구매확정</MenuItem>
                        <MenuItem value="구매대기">구매대기</MenuItem>
                        <MenuItem value="전체">전체</MenuItem>
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={filters.settlementFilter}
                        onChange={handleFilterChange('settlementFilter')}
                        displayEmpty
                    >
                        <MenuItem value="정산일">정산일</MenuItem>
                        <MenuItem value="정산대기">정산대기</MenuItem>
                        <MenuItem value="전체">전체</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* 정산 테이블 */}
            <TableContainer
                component={Paper}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: `1px solid ${theme.palette.grey[200]}`
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                주문번호
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                상품명
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                주문금액
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                수수료
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                정산금액
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}>
                                상태
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        '&:nth-of-type(odd)': {
                                            backgroundColor: theme.palette.background.default
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(232, 152, 48, 0.05)'
                                        }
                                    }}
                                >
                                    <TableCell sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 500,
                                        color: theme.palette.text.primary
                                    }}>
                                        {item.id}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 500,
                                        color: theme.palette.text.primary
                                    }}>
                                        {item.productName}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary
                                    }}>
                                        ₩{item.orderAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{
                                        color: theme.palette.text.secondary
                                    }}>
                                        ₩{item.commission.toLocaleString()}
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: theme.palette.primary.main
                                    }}>
                                        ₩{item.settlementAmount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.status}
                                            color={item.status === '정산완료' ? 'success' : 'warning'}
                                            size="small"
                                            sx={{
                                                fontWeight: 500,
                                                minWidth: 70
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary
                                        }}
                                    >
                                        정산 내역이 없습니다.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 총 정산 금액 및 정산 신청 버튼 */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.palette.grey[100],
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.grey[200]}`
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary
                    }}
                >
                    총 정산 금액:
                    <span style={{ color: theme.palette.primary.main, marginLeft: '8px' }}>
                        ₩{totalSettlementAmount.toLocaleString()}
                    </span>
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={onSettlementRequest}
                    disabled={totalSettlementAmount === 0}
                    sx={{
                        borderRadius: 6,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                            transform: 'translateY(-2px)'
                        },
                        '&:disabled': {
                            backgroundColor: theme.palette.grey[200]
                        }
                    }}
                    startIcon={
                        <span className="material-icons" style={{ fontSize: '18px' }}>
                            request_quote
                        </span>
                    }
                >
                    정산 신청하기
                </Button>
            </Box>
        </Box>
    );
};

export default SettlementTable;