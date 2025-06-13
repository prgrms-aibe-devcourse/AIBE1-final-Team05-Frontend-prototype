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
};import {
    Box,
    Typography,
    Card,
    CardContent,
    useTheme,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    Tabs,
    Tab,
    Button,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Popover,
    Grid,
    Divider
} from '@mui/material';
import {ReactNode, useState} from 'react';
import { SalesChartProps } from '../settlement';

// 확장된 Props 타입
interface EnhancedSalesChartProps extends SalesChartProps {
    yearlyData?: YearlyMonthData[];
    productData?: ProductSalesData[];
    selectedYear?: number;
    onYearChange?: (year: number) => void;
}

interface YearlyMonthData {
    year: number;
    monthlyData: { month: string; amount: number; }[];
}

interface ProductSalesData {
    salesCount: ReactNode;
    productName: string;
    amount: number;
    percentage: number;
    color: string;
}

const SalesChart = ({
                                data,
                                title = "매출 분석",
                                yearlyData = [],
                                productData = [],
                                selectedYear = new Date().getFullYear(),
                                onYearChange
                            }: EnhancedSalesChartProps) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [currentYear, setCurrentYear] = useState(selectedYear);

    // 상품별 매출 탭용 독립적인 날짜 상태
    const [productDatePickerAnchor, setProductDatePickerAnchor] = useState<HTMLElement | null>(null);
    const [productStartDate, setProductStartDate] = useState('');
    const [productEndDate, setProductEndDate] = useState('');

    // 사용 가능한 년도 목록 생성
    const availableYears = yearlyData.length > 0
        ? yearlyData.map(item => item.year)
        : [2022, 2023, 2024, 2025];

    // 현재 선택된 년도의 월별 데이터
    const currentYearData = yearlyData.find(item => item.year === currentYear)?.monthlyData || data;

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleYearChange = (event: SelectChangeEvent) => {
        const year = parseInt(event.target.value);
        setCurrentYear(year);
        onYearChange?.(year);
    };

    // 상품별 매출 탭의 날짜 피커 핸들러들
    const handleProductDatePickerOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProductDatePickerAnchor(event.currentTarget);
    };

    const handleProductDatePickerClose = () => {
        setProductDatePickerAnchor(null);
    };

    const handleProductDateRangeChange = (newStartDate: string, newEndDate: string) => {
        setProductStartDate(newStartDate);
        setProductEndDate(newEndDate);
        console.log('상품별 매출 기간 설정:', { startDate: newStartDate, endDate: newEndDate });
        // 여기서 상품별 매출 데이터를 필터링하거나 API 호출 가능
    };

    const getProductDateRangeLabel = (): string => {
        if (!productStartDate && !productEndDate) return '기간 선택';
        if (productStartDate && productEndDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(productStartDate)} ~ ${formatShortDate(productEndDate)}`;
        }
        if (productStartDate) {
            const formatShortDate = (dateStr: string) => {
                const date = new Date(dateStr);
                return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
            };
            return `${formatShortDate(productStartDate)} ~`;
        }
        return '기간 선택';
    };

    // 총 매출액 계산
    const totalSales = currentYearData.reduce((sum, item) => sum + item.amount, 0);

    // 성장률 계산 (마지막 달과 그 전 달 비교)
    const growthRate = currentYearData.length >= 2
        ? ((currentYearData[currentYearData.length - 1].amount - currentYearData[currentYearData.length - 2].amount) / currentYearData[currentYearData.length - 2].amount * 100)
        : 0;

    // 간단한 CSS 차트
    const maxAmount = Math.max(...currentYearData.map(item => item.amount));

    const MonthlyChart = () => (
        <Box sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between', // 균등 분배
            gap: 0.5,
            height: 200,
            px: 2,
            py: 1,
            width: '100%',
            overflowX: 'hidden' // 스크롤 제거
        }}>
            {currentYearData.map((item, index) => {
                const height = maxAmount > 0 ? (item.amount / maxAmount) * 160 : 0;
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1, // 동일한 너비로 분배
                            gap: 0.5,
                            minWidth: 0 // flex shrink 허용
                        }}
                    >
                        <Tooltip title={`${item.month}: ₩${item.amount.toLocaleString()}`}>
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.6rem',
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    lineHeight: 1,
                                    minHeight: '12px'
                                }}
                            >
                                {item.amount > 0 ? (
                                    item.amount > 1000
                                        ? `₩${Math.floor(item.amount/1000)}K`
                                        : `₩${item.amount}`
                                ) : ''}
                            </Typography>
                        </Tooltip>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 28, // 최대 너비 제한
                                height: `${Math.max(height, 5)}px`,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '3px 3px 0 0',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                mx: 'auto', // 중앙 정렬
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    transform: 'scaleY(1.05)'
                                }
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.65rem',
                                color: theme.palette.text.secondary,
                                textAlign: 'center',
                                lineHeight: 1,
                                fontWeight: 500
                            }}
                        >
                            {item.month}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );

    const ProductChart = () => {
        const maxProductAmount = Math.max(...productData.map(item => item.amount));

        return (
            <Box sx={{ height: '100%', overflow: 'hidden' }}>
                {/* 상품별 매출 전용 기간 선택 */}
                <Box sx={{
                    p: 2,
                    pb: 1,
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                            inventory
                        </span>
                        상품별 매출 분석
                    </Typography>

                    <TextField
                        size="small"
                        value={getProductDateRangeLabel()}
                        onClick={handleProductDatePickerOpen}
                        placeholder="기간 선택"
                        sx={{
                            minWidth: 200,
                            maxWidth: 250,
                            cursor: 'pointer',
                            '& .MuiInputBase-input': {
                                cursor: 'pointer',
                                fontSize: '0.875rem'
                            }
                        }}
                        InputProps={{
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span
                                        className="material-icons"
                                        style={{
                                            fontSize: '16px',
                                            color: theme.palette.text.secondary
                                        }}
                                    >
                                        date_range
                                    </span>
                                </InputAdornment>
                            ),
                            endAdornment: productStartDate || productEndDate ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleProductDateRangeChange('', '');
                                        }}
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        <span className="material-icons" style={{ fontSize: '14px' }}>
                                            close
                                        </span>
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }}
                    />
                </Box>

                {/* 기간 선택 시 정보 표시 */}
                {(productStartDate || productEndDate) && (
                    <Box sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: 'rgba(232, 152, 48, 0.05)',
                        borderBottom: `1px solid rgba(232, 152, 48, 0.1)`
                    }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.primary,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '0.75rem'
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '12px', color: theme.palette.primary.main }}>
                                info
                            </span>
                            선택 기간: {productStartDate || '시작일'} ~ {productEndDate || '종료일'}
                        </Typography>
                    </Box>
                )}

                {/* 상품 차트 내용 */}
                <Box sx={{ p: 2, height: 'calc(100% - 60px)', overflow: 'hidden' }}>
                    {productData.length > 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5,
                            height: '100%',
                            overflowY: 'auto',
                            pr: 1
                        }}>
                            {productData.map((item, index) => (
                                <Box key={index} sx={{
                                    position: 'relative',
                                    minHeight: 60,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    {/* 상품명과 매출액 */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        mb: 1,
                                        gap: 2
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: theme.palette.text.primary,
                                                flex: 1,
                                                lineHeight: 1.3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                fontSize: '0.875rem'
                                            }}
                                            title={item.productName}
                                        >
                                            {item.productName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.primary.main,
                                                minWidth: 'fit-content',
                                                textAlign: 'right',
                                                fontSize: '0.875rem',
                                                flexShrink: 0
                                            }}
                                        >
                                            ₩{item.amount > 10000
                                            ? `${Math.floor(item.amount / 1000)}K`
                                            : item.amount.toLocaleString()}
                                        </Typography>
                                    </Box>

                                    {/* 프로그레스 바 */}
                                    <Box sx={{
                                        width: '100%',
                                        height: 8,
                                        backgroundColor: theme.palette.grey[200],
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        mb: 0.5
                                    }}>
                                        <Box
                                            sx={{
                                                width: `${(item.amount / maxProductAmount) * 100}%`,
                                                height: '100%',
                                                backgroundColor: item.color || theme.palette.primary.main,
                                                borderRadius: 4,
                                                transition: 'width 0.3s ease'
                                            }}
                                        />
                                    </Box>

                                    {/* 퍼센티지와 추가 정보 */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            전체의 {item.percentage.toFixed(1)}%
                                        </Typography>

                                        {/* 판매 횟수 표시 */}
                                        {item.salesCount && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: '0.75rem',
                                                    backgroundColor: theme.palette.grey[100],
                                                    px: 1,
                                                    py: 0.25,
                                                    borderRadius: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                <span className="material-icons" style={{ fontSize: '12px' }}>
                                                    shopping_cart
                                                </span>
                                                {item.salesCount}회
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{
                            textAlign: 'center',
                            py: 4,
                            color: theme.palette.text.secondary,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <span
                                className="material-icons"
                                style={{
                                    fontSize: '48px',
                                    color: theme.palette.grey[200],
                                    marginBottom: '16px',
                                    display: 'block'
                                }}
                            >
                                bar_chart
                            </span>
                            <Typography variant="body2">
                                {(productStartDate || productEndDate)
                                    ? '선택한 기간에 상품별 매출 데이터가 없습니다.'
                                    : '상품별 매출 데이터가 없습니다.'
                                }
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        );
    };

    return (
        <Card sx={{
            height: '100%',
            minHeight: 500, // 최소 높이 지정
            maxHeight: 600, // 최대 높이 지정
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: `1px solid ${theme.palette.grey[200]}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transform: 'translateY(-4px)'
            }
        }}>
            <CardContent sx={{
                p: 3,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                {/* 헤더 */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary
                        }}
                    >
                        {title}
                    </Typography>

                    {/* 년도 선택 (월별 차트에서만 표시) */}
                    {tabValue === 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    const prevYear = currentYear - 1;
                                    if (availableYears.includes(prevYear)) {
                                        setCurrentYear(prevYear);
                                        onYearChange?.(prevYear);
                                    }
                                }}
                                disabled={!availableYears.includes(currentYear - 1)}
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                <span className="material-icons">chevron_left</span>
                            </IconButton>

                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <Select
                                    value={currentYear.toString()}
                                    onChange={handleYearChange}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            py: 0.5,
                                            fontSize: '0.875rem',
                                            fontWeight: 600
                                        }
                                    }}
                                >
                                    {availableYears.map((year) => (
                                        <MenuItem key={year} value={year.toString()}>
                                            {year}년
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton
                                size="small"
                                onClick={() => {
                                    const nextYear = currentYear + 1;
                                    if (availableYears.includes(nextYear)) {
                                        setCurrentYear(nextYear);
                                        onYearChange?.(nextYear);
                                    }
                                }}
                                disabled={!availableYears.includes(currentYear + 1)}
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                <span className="material-icons">chevron_right</span>
                            </IconButton>
                        </Box>
                    )}
                </Box>

                {/* 탭 */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            minHeight: 40,
                            '& .MuiTab-root': {
                                minHeight: 40,
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem'
                            }
                        }}
                    >
                        <Tab
                            label="기간별 매출"
                            icon={<span className="material-icons" style={{ fontSize: '16px' }}>trending_up</span>}
                            iconPosition="start"
                        />
                        <Tab
                            label="상품별 매출"
                            icon={<span className="material-icons" style={{ fontSize: '16px' }}>inventory</span>}
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* 차트 영역 */}
                <Box sx={{
                    height: tabValue === 0 ? 280 : 320,
                    mb: 3,
                    border: `1px solid ${theme.palette.grey[100]}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                    {tabValue === 0 ? <MonthlyChart /> : <ProductChart />}
                </Box>

                {/* 매출 요약 */}
                {tabValue === 0 && (
                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                mb: 0.5
                            }}
                        >
                            ₩{totalSales.toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary
                                }}
                            >
                                {currentYear}년 총 매출
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: growthRate >= 0 ? '#48bb78' : '#f56565'
                            }}>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '16px',
                                        marginRight: '2px'
                                    }}
                                >
                                    {growthRate >= 0 ? 'trending_up' : 'trending_down'}
                                </span>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600
                                    }}
                                >
                                    {Math.abs(growthRate).toFixed(1)}%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* 상품별 매출용 날짜 범위 선택 팝오버 */}
                <DateRangePicker
                    startDate={productStartDate}
                    endDate={productEndDate}
                    onDateChange={handleProductDateRangeChange}
                    open={Boolean(productDatePickerAnchor)}
                    anchorEl={productDatePickerAnchor}
                    onClose={handleProductDatePickerClose}
                />

                {/* 상품별 매출 요약 */}
                {tabValue === 1 && productData.length > 0 && (
                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                mb: 0.5
                            }}
                        >
                            {productData.length}개
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary
                            }}
                        >
                            {(productStartDate || productEndDate)
                                ? `선택 기간 판매 상품 수`
                                : '전체 판매 상품 수'
                            }
                        </Typography>
                    </Box>
                )}

                {/* 데이터 내보내기 버튼 */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            console.log('매출 데이터 내보내기:', {
                                year: currentYear,
                                type: tabValue === 0 ? 'monthly' : 'product',
                                data: tabValue === 0 ? currentYearData : productData
                            });
                        }}
                        sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            textTransform: 'none',
                            '&:hover': {
                                borderColor: theme.palette.primary.dark,
                                backgroundColor: 'rgba(232, 152, 48, 0.04)'
                            }
                        }}
                        startIcon={
                            <span className="material-icons" style={{ fontSize: '16px' }}>
                                file_download
                            </span>
                        }
                    >
                        데이터 내보내기
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SalesChart;