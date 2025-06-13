// src/components/SellerDashboard/settlement/SettlementTable.tsx
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
    useTheme,
    TextField,
    InputAdornment,
    IconButton,
    Pagination,
    Stack,
    TableFooter
} from '@mui/material';
import { useState, useMemo } from 'react';
import { SettlementTableProps, SettlementFilters, SettlementItem } from './types/settlement.types.ts';

// 컴포넌트 임포트
import DateRangePicker from './DateRangePicker';
import SettlementSummary from './SettlementSummary';
import MonthlySettlementStatus from './MonthlySettlementStatus';

// 날짜 유틸리티 함수들
const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

const isDateInRange = (date: Date, startDate: Date | null, endDate: Date | null): boolean => {
    if (!startDate && !endDate) return true;
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
};

const SettlementTable = ({
                             data,
                             filters,
                             onFiltersChange
                         }: SettlementTableProps) => {
    const theme = useTheme();
    const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 페이지네이션 상태 - 10개로 고정
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const handleFilterChange = (filterKey: keyof SettlementFilters) =>
        (event: SelectChangeEvent) => {
            onFiltersChange({
                [filterKey]: event.target.value
            });
            setPage(1);
        };

    const handleDatePickerOpen = (event: React.MouseEvent<HTMLElement>) => {
        setDatePickerAnchor(event.currentTarget);
    };

    const handleDatePickerClose = () => {
        setDatePickerAnchor(null);
    };

    const handleDateRangeChange = (newStartDate: string, newEndDate: string) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        onFiltersChange({
            startDate: newStartDate,
            endDate: newEndDate
        });
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const getDateRangeLabel = (): string => {
        if (!startDate && !endDate) return '기간 선택';
        if (startDate && endDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(startDate)} ~ ${formatShortDate(endDate)}`;
        }
        if (startDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(startDate)} ~`;
        }
        return '기간 선택';
    };

    // 날짜 범위에 따른 데이터 필터링
    const filteredData = useMemo(() => {
        return data.filter(item => {
            if (!startDate && !endDate) return true;
            const itemDate = new Date(item.orderDate);
            const start = startDate ? parseDate(startDate) : null;
            const end = endDate ? parseDate(endDate) : null;
            return isDateInRange(itemDate, start, end);
        });
    }, [data, startDate, endDate]);

    // 페이지네이션 계산
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalItems);
    const currentPageData = filteredData.slice(startIndex, endIndex);

    // 총 정산 금액 계산
    const totalSettlementAmount = filteredData.reduce((sum, item) => sum + item.settlementAmount, 0);
    const currentPageSettlementAmount = currentPageData.reduce((sum, item) => sum + item.settlementAmount, 0);

    // 정산 분석 요약 계산
    const getSettlementSummary = () => {
        const targetData = (startDate || endDate) ? filteredData : data;

        const totalAmount = targetData.reduce((sum, item) => sum + item.settlementAmount, 0);
        const completedAmount = targetData
            .filter(item => item.status === '정산완료')
            .reduce((sum, item) => sum + item.settlementAmount, 0);
        const pendingAmount = targetData
            .filter(item => item.status === '대기중' || item.status === '처리중')
            .reduce((sum, item) => sum + item.settlementAmount, 0);

        const totalCount = targetData.length;
        const completedCount = targetData.filter(item => item.status === '정산완료').length;
        const pendingCount = targetData.filter(item => item.status === '대기중' || item.status === '처리중').length;

        return {
            totalAmount,
            completedAmount,
            pendingAmount,
            totalCount,
            completedCount,
            pendingCount,
            completionRate: totalCount > 0 ? (completedCount / totalCount) * 100 : 0
        };
    };

    const settlementSummary = getSettlementSummary();

    // 상태별 Chip 속성
    const getStatusChipProps = (status: SettlementItem['status']) => {
        switch (status) {
            case '대기중':
                return { color: 'warning' as const, label: '대기중' };
            case '처리중':
                return { color: 'info' as const, label: '처리중' };
            case '정산완료':
                return { color: 'success' as const, label: '정산완료' };
            default:
                return { color: 'default' as const, label: status };
        }
    };

    const handleDownloadThisMonthReport = () => {
        console.log('이번달 정산내역 영수증 다운로드');
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const thisMonthData = data.filter(item => {
            const itemDate = new Date(item.orderDate);
            return itemDate.getMonth() === currentMonth &&
                itemDate.getFullYear() === currentYear;
        });
        console.log(`${currentYear}년 ${currentMonth + 1}월 정산내역:`, thisMonthData);
    };

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
                <TextField
                    size="small"
                    value={getDateRangeLabel()}
                    onClick={handleDatePickerOpen}
                    placeholder="기간 선택"
                    sx={{
                        minWidth: 250,
                        maxWidth: 300,
                        cursor: 'pointer',
                        '& .MuiInputBase-input': {
                            cursor: 'pointer',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }
                    }}
                    InputProps={{
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '18px',
                                        color: theme.palette.text.secondary
                                    }}
                                >
                                    date_range
                                </span>
                            </InputAdornment>
                        ),
                        endAdornment: startDate || endDate ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDateRangeChange('', '');
                                    }}
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    <span className="material-icons" style={{ fontSize: '16px' }}>
                                        close
                                    </span>
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }}
                />

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
                        value={filters.settlementFilter}
                        onChange={handleFilterChange('settlementFilter')}
                        displayEmpty
                    >
                        <MenuItem value="전체">전체 상태</MenuItem>
                        <MenuItem value="대기중">대기중</MenuItem>
                        <MenuItem value="처리중">처리중</MenuItem>
                        <MenuItem value="정산완료">정산완료</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* 날짜 범위 선택 팝오버 */}
            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateRangeChange}
                open={Boolean(datePickerAnchor)}
                anchorEl={datePickerAnchor}
                onClose={handleDatePickerClose}
            />

            {/* 결과 요약 */}
            <Box sx={{ mb: 2 }}>
                {(startDate || endDate) ? (
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                            filter_alt
                        </span>
                        선택한 기간: {getDateRangeLabel()} (총 {totalItems}건)
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        총 {totalItems}건의 정산 내역
                    </Typography>
                )}
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
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                주문번호
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                상품명
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                주문금액
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                수수료
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                정산금액
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                주문일
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                상태
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPageData.length > 0 ? (
                            currentPageData.map((item) => {
                                const chipProps = getStatusChipProps(item.status);
                                return (
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
                                        <TableCell sx={{ color: theme.palette.text.secondary }}>
                                            ₩{item.commission.toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main
                                        }}>
                                            ₩{item.settlementAmount.toLocaleString()}
                                        </TableCell>
                                        <TableCell sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.875rem'
                                        }}>
                                            {item.orderDate}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={chipProps.label}
                                                color={chipProps.color}
                                                size="small"
                                                sx={{
                                                    fontWeight: 500,
                                                    minWidth: 70
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        {(startDate || endDate)
                                            ? '선택한 기간에 정산 내역이 없습니다.'
                                            : '정산 내역이 없습니다.'
                                        }
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    {/* 테이블 푸터 */}
                    {currentPageData.length > 0 && (
                        <TableFooter>
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    sx={{
                                        backgroundColor: theme.palette.grey[50],
                                        borderTop: `1px solid ${theme.palette.grey[200]}`
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        py: 1
                                    }}>
                                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                            {startIndex + 1} - {endIndex}번째 항목 (전체 {totalItems}개 중)
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            현재 페이지 정산금액:
                                            <span style={{ color: theme.palette.primary.main, marginLeft: '8px' }}>
                                                ₩{currentPageSettlementAmount.toLocaleString()}
                                            </span>
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </Table>
            </TableContainer>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                },
                                '& .MuiPaginationItem-page.Mui-selected': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark
                                    }
                                }
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: 'center',
                                color: theme.palette.text.secondary
                            }}
                        >
                            {page} / {totalPages} 페이지
                        </Typography>
                    </Stack>
                </Box>
            )}

            {/* 전체/선택기간 정산 금액 요약 */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.palette.grey[100],
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.grey[200]}`,
                flexWrap: 'wrap',
                gap: 2,
                mb: 3
            }}>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            mb: 0.5
                        }}
                    >
                        {(startDate || endDate) ? '선택 기간 총 정산 금액' : '전체 정산 금액'}:
                        <span style={{ color: theme.palette.primary.main, marginLeft: '8px' }}>
                            ₩{totalSettlementAmount.toLocaleString()}
                        </span>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.875rem'
                        }}
                    >
                        {(startDate || endDate) ? (
                            `선택기간: ${startDate || '시작일'} ~ ${endDate || '종료일'} (${totalItems}건)`
                        ) : (
                            `전체 ${totalItems}건의 정산 내역`
                        )}
                    </Typography>
                </Box>

                {/* 선택기간이 있을 때만 선택기간 영수증 버튼 표시 */}
                {(startDate || endDate) && (
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => {
                            console.log('선택기간 정산내역 영수증 다운로드');
                            console.log('선택기간:', { startDate, endDate });
                            console.log('선택기간 데이터:', filteredData);
                            console.log('선택기간 총 정산금액:', totalSettlementAmount.toLocaleString());
                        }}
                        sx={{
                            borderRadius: 6,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: 'rgba(232, 152, 48, 0.04)',
                                transform: 'translateY(-2px)'
                            }
                        }}
                        startIcon={
                            <span className="material-icons" style={{ fontSize: '18px' }}>
                                description
                            </span>
                        }
                    >
                        선택기간 정산내역 영수증
                    </Button>
                )}
            </Box>

            {/* 이번달 정산 현황 */}
            <MonthlySettlementStatus
                data={data}
                onDownloadReport={handleDownloadThisMonthReport}
            />

            {/* 정산 분석 요약 */}
            <SettlementSummary
                data={settlementSummary}
                dateRangeLabel={(startDate || endDate) ? getDateRangeLabel() : undefined}
            />
        </Box>
    );
};

export default SettlementTable;