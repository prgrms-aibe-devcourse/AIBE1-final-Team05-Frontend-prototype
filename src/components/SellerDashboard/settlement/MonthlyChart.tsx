// src/components/SellerDashboard/settlement/components/MonthlyChart.tsx
import React from 'react';
import {
    Box,
    Typography,
    useTheme,
    IconButton,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';

interface MonthlyChartData {
    month: string;
    amount: number;
}

interface MonthlyChartProps {
    data: MonthlyChartData[];
    selectedYear?: number;
    onYearChange?: (year: number) => void;
    availableYears?: number[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({
                                                       data,
                                                       selectedYear = new Date().getFullYear(),
                                                       onYearChange,
                                                       availableYears = [2022, 2023, 2024, 2025]
                                                   }) => {
    const theme = useTheme();

    const handleYearChange = (event: SelectChangeEvent) => {
        const year = parseInt(event.target.value);
        onYearChange?.(year);
    };

    const handlePrevYear = () => {
        const prevYear = selectedYear - 1;
        if (availableYears.includes(prevYear)) {
            onYearChange?.(prevYear);
        }
    };

    const handleNextYear = () => {
        const nextYear = selectedYear + 1;
        if (availableYears.includes(nextYear)) {
            onYearChange?.(nextYear);
        }
    };

    if (!data || data.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 400,
                flexDirection: 'column',
                color: theme.palette.text.secondary
            }}>
                <span
                    className="material-icons"
                    style={{
                        fontSize: '64px',
                        color: theme.palette.grey[200],
                        marginBottom: '16px'
                    }}
                >
                    trending_up
                </span>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    기간별 매출 데이터가 없습니다.
                </Typography>
                <Typography variant="body2">
                    데이터가 업데이트되면 여기에 표시됩니다.
                </Typography>
            </Box>
        );
    }

    const maxAmount = Math.max(...data.map(item => item.amount));

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* 헤더 - 년도 선택 */}
            <Box sx={{
                p: 3,
                borderBottom: `1px solid ${theme.palette.grey[200]}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <span
                        className="material-icons"
                        style={{
                            fontSize: '20px',
                            color: theme.palette.primary.main
                        }}
                    >
                        trending_up
                    </span>
                    기간별 매출 분석
                </Typography>

                {/* 년도 선택 필터 */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <IconButton
                        size="small"
                        onClick={handlePrevYear}
                        disabled={!availableYears.includes(selectedYear - 1)}
                        sx={{
                            color: theme.palette.text.secondary,
                            border: `1px solid ${theme.palette.grey[300]}`,
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main
                            }
                        }}
                    >
                        <span className="material-icons">chevron_left</span>
                    </IconButton>

                    <FormControl size="small" sx={{ minWidth: 100 }}>
                        <Select
                            value={selectedYear.toString()}
                            onChange={handleYearChange}
                            sx={{
                                '& .MuiSelect-select': {
                                    py: 1,
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                }
                            }}
                        >
                            {availableYears.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}년
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <IconButton
                        size="small"
                        onClick={handleNextYear}
                        disabled={!availableYears.includes(selectedYear + 1)}
                        sx={{
                            color: theme.palette.text.secondary,
                            border: `1px solid ${theme.palette.grey[300]}`,
                            '&:hover': {
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main
                            }
                        }}
                    >
                        <span className="material-icons">chevron_right</span>
                    </IconButton>
                </Box>
            </Box>

            {/* 선택된 년도 정보 */}
            <Box sx={{
                px: 3,
                py: 1.5,
                backgroundColor: 'rgba(232, 152, 48, 0.05)',
                borderBottom: `1px solid rgba(232, 152, 48, 0.1)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.875rem'
                    }}
                >
                    <span
                        className="material-icons"
                        style={{
                            fontSize: '16px',
                            color: theme.palette.primary.main
                        }}
                    >
                        calendar_month
                    </span>
                    선택된 기간: {selectedYear}년 전체
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        fontSize: '0.75rem',
                        color: theme.palette.text.secondary,
                        backgroundColor: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}
                >
                    월별 매출 분석 중
                </Typography>
            </Box>

            {/* 차트 영역 */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
                gap: 1.5,
                height: 400,
                px: 3,
                py: 2,
                backgroundColor: theme.palette.background.paper
            }}>
                {data.map((item, index) => {
                    const height = maxAmount > 0 ? (item.amount / maxAmount) * 320 : 0;

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flex: 1,
                                gap: 1,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                '&:hover': {
                                    '& .chart-bar': {
                                        transform: 'scaleY(1.05)',
                                        backgroundColor: theme.palette.primary.dark,
                                        boxShadow: '0 4px 12px rgba(232, 152, 48, 0.4)'
                                    },
                                    '& .chart-amount': {
                                        color: theme.palette.primary.dark,
                                        transform: 'scale(1.1)'
                                    }
                                }
                            }}
                        >
                            {/* 금액 표시 */}
                            <Typography
                                className="chart-amount"
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: theme.palette.primary.main,
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    minHeight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                    mb: 0.5
                                }}
                            >
                                {item.amount > 0 ? (
                                    item.amount >= 10000
                                        ? `${Math.floor(item.amount / 10000)}만원`
                                        : item.amount >= 1000
                                            ? `${Math.floor(item.amount / 1000)}천원`
                                            : `${item.amount}원`
                                ) : ''}
                            </Typography>

                            {/* 바 차트 */}
                            <Box
                                className="chart-bar"
                                sx={{
                                    width: '100%',
                                    maxWidth: 32,
                                    height: `${Math.max(height, 8)}px`,
                                    background: `linear-gradient(180deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                                    borderRadius: '4px 4px 0 0',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    boxShadow: '0 2px 6px rgba(232, 152, 48, 0.2)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '30%',
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                                        borderRadius: '4px 4px 0 0'
                                    },
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        height: '20%',
                                        background: 'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 100%)',
                                        borderRadius: '0 0 4px 4px'
                                    }
                                }}
                            />

                            {/* 월 표시 */}
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    color: theme.palette.text.primary,
                                    textAlign: 'center',
                                    fontWeight: 600,
                                    minHeight: '16px',
                                    mt: 0.5
                                }}
                            >
                                {item.month}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default MonthlyChart;