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
    Popover,
    Grid,
    IconButton,
    Divider,
    Pagination,
    Stack,
    TableFooter
} from '@mui/material';
import { useState, useMemo } from 'react';
import { SettlementTableProps, SettlementFilters } from '../settlement';

// 날짜 유틸리티 함수들
const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};

const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

const isDateInRange = (date: Date, startDate: Date | null, endDate: Date | null): boolean => {
    if (!startDate && !endDate) return true;
    if (startDate && date < startDate) return false;
    if (endDate && date > endDate) return false;
    return true;
};

// 달력 컴포넌트
interface DateRangePickerProps {
    startDate: string;
    endDate: string;
    onDateChange: (startDate: string, endDate: string) => void;
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const DateRangePicker = ({
                             startDate,
                             endDate,
                             onDateChange,
                             open,
                             anchorEl,
                             onClose
                         }: DateRangePickerProps) => {
    const theme = useTheme();
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days: Date[] = [];
        const currentDate = new Date(startDate);

        while (days.length < 42) { // 6주 표시
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return days;
    };

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isCurrentMonth = (date: Date): boolean => {
        return date.getMonth() === currentMonth.getMonth() &&
            date.getFullYear() === currentMonth.getFullYear();
    };

    const isSelected = (date: Date): boolean => {
        const dateStr = formatDate(date);
        return dateStr === tempStartDate || dateStr === tempEndDate;
    };

    const isInRange = (date: Date): boolean => {
        if (!tempStartDate || !tempEndDate) return false;
        const start = parseDate(tempStartDate);
        const end = parseDate(tempEndDate);
        if (!start || !end) return false;
        return date >= start && date <= end;
    };

    const handleDateClick = (date: Date) => {
        const dateStr = formatDate(date);

        if (!tempStartDate || (tempStartDate && tempEndDate)) {
            setTempStartDate(dateStr);
            setTempEndDate('');
        } else if (tempStartDate && !tempEndDate) {
            const start = parseDate(tempStartDate);
            if (start && date >= start) {
                setTempEndDate(dateStr);
            } else {
                setTempStartDate(dateStr);
                setTempEndDate('');
            }
        }
    };

    const handleApply = () => {
        onDateChange(tempStartDate, tempEndDate);
        onClose();
    };

    const handleReset = () => {
        setTempStartDate('');
        setTempEndDate('');
    };

    const handleQuickSelect = (days: number) => {
        const end = new Date();
        const start = addDays(end, -days);
        setTempStartDate(formatDate(start));
        setTempEndDate(formatDate(end));
    };

    const navigateMonth = (direction: number) => {
        setCurrentMonth(addMonths(currentMonth, direction));
    };

    const daysInMonth = getDaysInMonth(currentMonth);
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            PaperProps={{
                sx: {
                    p: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    minWidth: 320,
                    maxWidth: 400
                }
            }}
        >
            <Box>
                {/* 빠른 선택 버튼들 */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        빠른 선택
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {[
                            { label: '오늘', days: 0 },
                            { label: '7일', days: 7 },
                            { label: '30일', days: 30 },
                            { label: '90일', days: 90 }
                        ].map((item) => (
                            <Button
                                key={item.label}
                                size="small"
                                variant="outlined"
                                onClick={() => handleQuickSelect(item.days)}
                                sx={{
                                    minWidth: 'auto',
                                    px: 2,
                                    py: 0.5,
                                    fontSize: '0.75rem',
                                    borderColor: theme.palette.grey[300],
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* 월 네비게이션 */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <IconButton
                        onClick={() => navigateMonth(-1)}
                        size="small"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        <span className="material-icons">chevron_left</span>
                    </IconButton>

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                    </Typography>

                    <IconButton
                        onClick={() => navigateMonth(1)}
                        size="small"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        <span className="material-icons">chevron_right</span>
                    </IconButton>
                </Box>

                {/* 요일 헤더 */}
                <Grid container spacing={0} sx={{ mb: 1 }}>
                    {weekDays.map((day) => (
                        <Grid size={12/7} key={day}>
                            <Box sx={{
                                textAlign: 'center',
                                py: 1,
                                color: theme.palette.text.secondary,
                                fontSize: '0.75rem',
                                fontWeight: 600
                            }}>
                                {day}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* 날짜 그리드 */}
                <Grid container spacing={0}>
                    {daysInMonth.map((date, index) => {
                        const isCurrentMonthDate = isCurrentMonth(date);
                        const isTodayDate = isToday(date);
                        const isSelectedDate = isSelected(date);
                        const isInRangeDate = isInRange(date);

                        return (
                            <Grid size={12/7} key={index}>
                                <Button
                                    onClick={() => handleDateClick(date)}
                                    sx={{
                                        width: '100%',
                                        height: 36,
                                        minWidth: 'auto',
                                        p: 0,
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                        fontWeight: isSelectedDate ? 600 : 400,
                                        color: !isCurrentMonthDate
                                            ? theme.palette.text.disabled
                                            : isSelectedDate
                                                ? 'white'
                                                : isTodayDate
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.primary,
                                        backgroundColor: isSelectedDate
                                            ? theme.palette.primary.main
                                            : isInRangeDate
                                                ? 'rgba(232, 152, 48, 0.1)'
                                                : 'transparent',
                                        border: isTodayDate && !isSelectedDate
                                            ? `1px solid ${theme.palette.primary.main}`
                                            : 'none',
                                        '&:hover': {
                                            backgroundColor: isSelectedDate
                                                ? theme.palette.primary.dark
                                                : 'rgba(232, 152, 48, 0.1)'
                                        }
                                    }}
                                >
                                    {date.getDate()}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* 선택된 날짜 표시 */}
                {(tempStartDate || tempEndDate) && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: theme.palette.grey[100], borderRadius: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            선택된 기간
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {tempStartDate || '시작일'} ~ {tempEndDate || '종료일'}
                        </Typography>
                    </Box>
                )}

                {/* 액션 버튼들 */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    mt: 3,
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleReset}
                        sx={{
                            borderColor: theme.palette.grey[300],
                            color: theme.palette.text.secondary
                        }}
                    >
                        초기화
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleApply}
                        disabled={!tempStartDate}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark
                            }
                        }}
                    >
                        적용
                    </Button>
                </Box>
            </Box>
        </Popover>
    );
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
    const rowsPerPage = 10; // 고정값

    const handleFilterChange = (filterKey: keyof SettlementFilters) =>
        (event: SelectChangeEvent) => {
            onFiltersChange({
                [filterKey]: event.target.value
            });
            // 필터 변경 시 첫 페이지로 이동
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
        // 날짜 필터 변경 시 첫 페이지로 이동
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const getDateRangeLabel = (): string => {
        if (!startDate && !endDate) return '기간 선택';
        if (startDate && endDate) {
            // 날짜 형식을 더 간결하게 표시 (YYYY-MM-DD → MM/DD)
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

    // 총 정산 금액 계산 (필터링된 전체 데이터 기준)
    const totalSettlementAmount = filteredData.reduce((sum, item) => sum + item.settlementAmount, 0);

    // 현재 페이지 정산 금액 계산
    const currentPageSettlementAmount = currentPageData.reduce((sum, item) => sum + item.settlementAmount, 0);

    // 상태별 Chip 색상 및 스타일 함수
    const getStatusChipProps = (status: '대기중' | '처리중' | '정산완료') => {
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
                {/* 기간 선택 필터 */}
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

            {/* 결과 요약 - 페이지 크기 선택 제거 */}
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
                                주문일
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
                                        sx={{
                                            color: theme.palette.text.secondary
                                        }}
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

                    {/* 테이블 푸터 - 현재 페이지 요약 */}
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

            {/* 이번달 정산내역 및 영수증 섹션 */}
            <Box sx={{ mb: 3 }}>
                {/* 이번달 정산 요약 - 필터와 무관하게 항상 이번달 데이터만 표시 */}
                <Box sx={{
                    backgroundColor: 'rgba(232, 152, 48, 0.08)',
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid rgba(232, 152, 48, 0.2)`,
                    mb: 2
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                            calendar_month
                        </span>
                        이번달 정산 현황 ({new Date().getMonth() + 1}월)
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {/* 이번달 총 정산금액 - 필터 무관하게 원본 데이터 사용 */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    이번달 총 정산금액
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.primary.main
                                    }}
                                >
                                    ₩{(() => {
                                    const currentMonth = new Date().getMonth();
                                    const currentYear = new Date().getFullYear();
                                    // 원본 data 사용 (필터 적용 안됨)
                                    const thisMonthData = data.filter(item => {
                                        const itemDate = new Date(item.orderDate);
                                        return itemDate.getMonth() === currentMonth &&
                                            itemDate.getFullYear() === currentYear;
                                    });
                                    return thisMonthData.reduce((sum, item) => sum + item.settlementAmount, 0).toLocaleString();
                                })()}
                                </Typography>
                            </Box>

                            {/* 이번달 정산완료 금액 - 필터 무관하게 원본 데이터 사용 */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    정산완료 금액
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#48bb78'
                                    }}
                                >
                                    ₩{(() => {
                                    const currentMonth = new Date().getMonth();
                                    const currentYear = new Date().getFullYear();
                                    // 원본 data 사용 (필터 적용 안됨)
                                    const thisMonthCompletedData = data.filter(item => {
                                        const itemDate = new Date(item.orderDate);
                                        return itemDate.getMonth() === currentMonth &&
                                            itemDate.getFullYear() === currentYear &&
                                            item.status === '정산완료';
                                    });
                                    return thisMonthCompletedData.reduce((sum, item) => sum + item.settlementAmount, 0).toLocaleString();
                                })()}
                                </Typography>
                            </Box>

                            {/* 이번달 대기중/처리중 금액 - 필터 무관하게 원본 데이터 사용 */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    대기중/처리중 금액
                                </Typography>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        color: '#ed8936'
                                    }}
                                >
                                    ₩{(() => {
                                    const currentMonth = new Date().getMonth();
                                    const currentYear = new Date().getFullYear();
                                    // 원본 data 사용 (필터 적용 안됨)
                                    const thisMonthPendingData = data.filter(item => {
                                        const itemDate = new Date(item.orderDate);
                                        return itemDate.getMonth() === currentMonth &&
                                            itemDate.getFullYear() === currentYear &&
                                            (item.status === '대기중' || item.status === '처리중');
                                    });
                                    return thisMonthPendingData.reduce((sum, item) => sum + item.settlementAmount, 0).toLocaleString();
                                })()}
                                </Typography>
                            </Box>
                        </Box>

                        {/* 이번달 정산내역 영수증 다운로드 버튼 */}
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                console.log('이번달 정산내역 영수증 다운로드');
                                const currentMonth = new Date().getMonth();
                                const currentYear = new Date().getFullYear();
                                const thisMonthData = data.filter(item => {
                                    const itemDate = new Date(item.orderDate);
                                    return itemDate.getMonth() === currentMonth &&
                                        itemDate.getFullYear() === currentYear;
                                });
                                console.log(`${currentYear}년 ${currentMonth + 1}월 정산내역:`, thisMonthData);
                            }}
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
                                }
                            }}
                            startIcon={
                                <span className="material-icons" style={{ fontSize: '18px' }}>
                                    receipt
                                </span>
                            }
                        >
                            이번달 정산내역 영수증
                        </Button>
                    </Box>
                </Box>

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
                    gap: 2
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
                        {(startDate || endDate) ? (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem'
                                }}
                            >
                                선택기간: {startDate || '시작일'} ~ {endDate || '종료일'} ({totalItems}건)
                            </Typography>
                        ) : (
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem'
                                }}
                            >
                                전체 {totalItems}건의 정산 내역
                            </Typography>
                        )}
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
            </Box>
        </Box>
    );
};

export default SettlementTable;