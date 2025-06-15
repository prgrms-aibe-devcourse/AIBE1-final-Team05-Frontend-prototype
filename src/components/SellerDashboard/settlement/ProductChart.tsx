// src/components/SellerDashboard/settlement/components/ProductChart.tsx
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    IconButton,
    useTheme,
    Button,
    Chip,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';

interface ProductSalesData {
    productName: string;
    amount: number;
    percentage: number;
    color: string;
    salesCount: number;
}

interface ProductChartProps {
    data: ProductSalesData[];
    selectedYear?: number;
    selectedMonth?: number;
    viewMode?: 'monthly' | 'yearly'; // 🔧 상위에서 전달받는 viewMode
    onYearChange?: (year: number) => void;
    onMonthChange?: (month: number) => void;
    onViewModeChange?: (mode: 'monthly' | 'yearly') => void; // 🔧 viewMode 변경 핸들러
    availableYears?: number[];
    availableMonths?: number[];
}

const ProductChart: React.FC<ProductChartProps> = ({
                                                       data,
                                                       selectedYear = new Date().getFullYear(),
                                                       selectedMonth = new Date().getMonth() + 1,
                                                       viewMode = 'monthly', // 🔧 상위에서 전달받음
                                                       onYearChange,
                                                       onMonthChange,
                                                       onViewModeChange, // 🔧 상위로 전달
                                                       availableYears = [2022, 2023, 2024, 2025],
                                                       availableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                                   }) => {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    // 🔧 수정: viewMode가 변경될 때 페이지 초기화
    useEffect(() => {
        setCurrentPage(0);
    }, [viewMode, selectedYear, selectedMonth]);

    // 페이지네이션 계산
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentPageData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const handleYearChange = (event: SelectChangeEvent) => {
        const year = parseInt(event.target.value);
        onYearChange?.(year);
        setCurrentPage(0);
    };

    const handleMonthChange = (event: SelectChangeEvent) => {
        const month = parseInt(event.target.value);
        onMonthChange?.(month);
        setCurrentPage(0);
    };

    // 🔧 수정: viewMode 변경을 상위로 전달
    const handleViewModeChange = (
        _: React.MouseEvent<HTMLElement>,
        newViewMode: 'monthly' | 'yearly'
    ) => {
        if (newViewMode !== null) {
            onViewModeChange?.(newViewMode); // 🔧 상위로 전달
            setCurrentPage(0);
        }
    };

    const handlePrevYear = () => {
        const prevYear = selectedYear - 1;
        if (availableYears.includes(prevYear)) {
            onYearChange?.(prevYear);
            setCurrentPage(0);
        }
    };

    const handleNextYear = () => {
        const nextYear = selectedYear + 1;
        if (availableYears.includes(nextYear)) {
            onYearChange?.(nextYear);
            setCurrentPage(0);
        }
    };

    const handlePrevMonth = () => {
        let newYear = selectedYear;
        let newMonth = selectedMonth - 1;

        if (newMonth < 1) {
            newMonth = 12;
            newYear = selectedYear - 1;
        }

        if (availableYears.includes(newYear)) {
            onYearChange?.(newYear);
            onMonthChange?.(newMonth);
            setCurrentPage(0);
        }
    };

    const handleNextMonth = () => {
        let newYear = selectedYear;
        let newMonth = selectedMonth + 1;

        if (newMonth > 12) {
            newMonth = 1;
            newYear = selectedYear + 1;
        }

        if (availableYears.includes(newYear)) {
            onYearChange?.(newYear);
            onMonthChange?.(newMonth);
            setCurrentPage(0);
        }
    };

    const getMonthName = (month: number): string => {
        return `${month}월`;
    };

    const getPeriodLabel = (): string => {
        if (viewMode === 'yearly') {
            return `${selectedYear}년 전체`;
        } else {
            return `${selectedYear}년 ${getMonthName(selectedMonth)}`;
        }
    };

    const maxProductAmount = data.length > 0 ? Math.max(...data.map(item => item.amount)) : 0;

    // 🔧 디버깅용 로그
    console.log('📊 ProductChart 렌더링:', {
        viewMode,
        selectedYear,
        selectedMonth,
        데이터수: data.length,
        현재페이지: currentPage
    });

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* 🔧 필터 헤더 영역 - 항상 고정 높이 유지 */}
            <Box sx={{
                px: 3,
                py: 1.5,
                backgroundColor: 'rgba(232, 152, 48, 0.05)',
                borderBottom: `1px solid rgba(232, 152, 48, 0.1)`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
                minHeight: 80
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                            inventory
                        </span>
                        상품별 매출 분석 - {getPeriodLabel()}
                    </Typography>

                    <Chip
                        label={`총 ${data.length}개 상품`}
                        size="small"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem'
                        }}
                    />
                </Box>

                {/* 🔧 필터 컨트롤 영역 - 고정된 구조 유지 */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                    minWidth: 'fit-content'
                }}>
                    {/* 기간 선택 모드 토글 */}
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                px: 2,
                                py: 0.5,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                border: `1px solid ${theme.palette.grey[300]}`,
                                color: theme.palette.text.secondary,
                                '&.Mui-selected': {
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    borderColor: theme.palette.primary.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.dark,
                                    }
                                },
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main
                                }
                            }
                        }}
                    >
                        <ToggleButton value="monthly">월별</ToggleButton>
                        <ToggleButton value="yearly">년도별</ToggleButton>
                    </ToggleButtonGroup>

                    {/* 🔧 년도-월 선택 필터 - 고정된 레이아웃 */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: 'fit-content'
                    }}>
                        {/* 년도 선택 */}
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

                        {/* 🔧 월 선택 영역 - 고정된 공간 유지 */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            minWidth: viewMode === 'monthly' ? 200 : 0,
                            opacity: viewMode === 'monthly' ? 1 : 0,
                            visibility: viewMode === 'monthly' ? 'visible' : 'hidden',
                            transition: 'opacity 0.2s ease, visibility 0.2s ease',
                            overflow: 'hidden'
                        }}>
                            {/* 구분선 */}
                            <Box sx={{
                                width: 1,
                                height: 32,
                                backgroundColor: theme.palette.grey[300],
                                mx: 1
                            }} />

                            {/* 월 선택 */}
                            <IconButton
                                size="small"
                                onClick={handlePrevMonth}
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

                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <Select
                                    value={selectedMonth.toString()}
                                    onChange={handleMonthChange}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            py: 1,
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            color: theme.palette.text.primary
                                        }
                                    }}
                                >
                                    {availableMonths.map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {getMonthName(month)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton
                                size="small"
                                onClick={handleNextMonth}
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
                </Box>
            </Box>

            {/* 페이지네이션 헤더 - 데이터 유무와 관계없이 일관된 높이 */}
            {data.length > itemsPerPage && (
                <Box sx={{
                    px: 3,
                    py: 2,
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: theme.palette.grey[50],
                    minHeight: 60
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.875rem'
                        }}
                    >
                        {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, data.length)} / {data.length}개 상품
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            size="small"
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:disabled': { opacity: 0.3 }
                            }}
                        >
                            <span className="material-icons">chevron_left</span>
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages - 1}
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:disabled': { opacity: 0.3 }
                            }}
                        >
                            <span className="material-icons">chevron_right</span>
                        </IconButton>
                    </Box>
                </Box>
            )}

            {/* 메인 컨텐츠 영역 */}
            {data.length === 0 ? (
                // 빈 상태 - 고정된 높이로 레이아웃 안정화
                <Box sx={{
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    height: 400,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <span
                        className="material-icons"
                        style={{
                            fontSize: '64px',
                            color: theme.palette.grey[200],
                            marginBottom: '16px'
                        }}
                    >
                        bar_chart
                    </span>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {getPeriodLabel()} 상품별 매출 데이터가 없습니다.
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        데이터가 업데이트되면 여기에 표시됩니다.
                    </Typography>
                </Box>
            ) : (
                <>
                    {/* 상품별 차트 */}
                    <Box sx={{
                        flex: 1,
                        p: 3,
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'center',
                        minHeight: 350
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'space-between',
                            gap: 2,
                            height: '100%',
                            width: '100%',
                            maxWidth: 800
                        }}>
                            {currentPageData.map((item, index) => {
                                const height = maxProductAmount > 0 ? (item.amount / maxProductAmount) * 280 : 0;
                                const actualIndex = currentPage * itemsPerPage + index;

                                return (
                                    <Box
                                        key={`${currentPage}-${index}`}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            flex: 1,
                                            gap: 1,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            maxWidth: 80,
                                            '&:hover': {
                                                '& .product-bar': {
                                                    transform: 'scaleY(1.1)',
                                                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
                                                },
                                                '& .product-name': {
                                                    color: theme.palette.primary.main,
                                                    fontWeight: 700
                                                }
                                            }
                                        }}
                                    >
                                        {/* 순위 표시 (상위 3개에만) */}
                                        {actualIndex < 3 && (
                                            <Box sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -4,
                                                zIndex: 1,
                                                backgroundColor: actualIndex === 0 ? '#FFD700' :
                                                    actualIndex === 1 ? '#C0C0C0' : '#CD7F32',
                                                color: '#000',
                                                borderRadius: '50%',
                                                width: 18,
                                                height: 18,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.65rem',
                                                fontWeight: 700,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                            }}>
                                                {actualIndex + 1}
                                            </Box>
                                        )}

                                        {/* 매출액 표시 */}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.7rem',
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                                textAlign: 'center',
                                                minHeight: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {item.amount > 0 ? (
                                                item.amount >= 10000
                                                    ? `${Math.floor(item.amount / 10000)}만원`
                                                    : `${Math.floor(item.amount / 1000)}천원`
                                            ) : ''}
                                        </Typography>

                                        {/* 바 차트 */}
                                        <Box
                                            className="product-bar"
                                            sx={{
                                                width: 32,
                                                height: `${Math.max(height, 12)}px`,
                                                background: `linear-gradient(180deg, ${item.color}CC 0%, ${item.color} 100%)`,
                                                borderRadius: '3px 3px 0 0',
                                                transition: 'all 0.3s ease',
                                                position: 'relative',
                                                boxShadow: `0 2px 8px ${item.color}40`,
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: '30%',
                                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                                                    borderRadius: '3px 3px 0 0'
                                                }
                                            }}
                                        />

                                        {/* 상품명 */}
                                        <Typography
                                            className="product-name"
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.65rem',
                                                color: theme.palette.text.primary,
                                                textAlign: 'center',
                                                fontWeight: 500,
                                                minHeight: '32px',
                                                maxWidth: '100%',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                lineHeight: 1.2,
                                                transition: 'all 0.3s ease'
                                            }}
                                            title={item.productName}
                                        >
                                            {item.productName}
                                        </Typography>

                                        {/* 퍼센티지 */}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '0.6rem',
                                                color: theme.palette.text.secondary,
                                                fontWeight: 500
                                            }}
                                        >
                                            {item.percentage.toFixed(1)}%
                                        </Typography>

                                        {/* 판매 횟수 */}
                                        <Box sx={{
                                            backgroundColor: theme.palette.grey[100],
                                            px: 0.5,
                                            py: 0.25,
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.25
                                        }}>
                                            <span
                                                className="material-icons"
                                                style={{
                                                    fontSize: '10px',
                                                    color: theme.palette.text.secondary
                                                }}
                                            >
                                                shopping_cart
                                            </span>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: '0.6rem',
                                                    color: theme.palette.text.secondary,
                                                    fontWeight: 500
                                                }}
                                            >
                                                {item.salesCount}
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* 하단 페이지네이션 (상품이 8개 초과일 때만) */}
                    {data.length > itemsPerPage && (
                        <Box sx={{
                            px: 3,
                            py: 2,
                            borderTop: `1px solid ${theme.palette.grey[200]}`,
                            backgroundColor: theme.palette.grey[50],
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            minHeight: 60
                        }}>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handlePrevPage}
                                disabled={currentPage === 0}
                                sx={{
                                    minWidth: 80,
                                    textTransform: 'none',
                                    borderColor: theme.palette.grey[300],
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main
                                    },
                                    '&:disabled': {
                                        opacity: 0.5
                                    }
                                }}
                                startIcon={
                                    <span className="material-icons" style={{ fontSize: '16px' }}>
                                        chevron_left
                                    </span>
                                }
                            >
                                이전
                            </Button>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: '0.875rem',
                                    mx: 2
                                }}
                            >
                                {currentPage + 1} / {totalPages}
                            </Typography>

                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages - 1}
                                sx={{
                                    minWidth: 80,
                                    textTransform: 'none',
                                    borderColor: theme.palette.grey[300],
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main
                                    },
                                    '&:disabled': {
                                        opacity: 0.5
                                    }
                                }}
                                endIcon={
                                    <span className="material-icons" style={{ fontSize: '16px' }}>
                                        chevron_right
                                    </span>
                                }
                            >
                                다음
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default ProductChart;