// src/components/SellerDashboard/settlement/SalesChart.tsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    useTheme,
    Tabs,
    Tab,
    Button
} from '@mui/material';

// 컴포넌트 임포트
import MonthlyChart from './MonthlyChart';
import ProductChart from './ProductChart';
import { SalesChartProps } from './types/settlement.types';

// 확장된 Props 타입
interface EnhancedSalesChartProps extends SalesChartProps {
    yearlyData?: YearlyMonthData[];
    productData?: ProductSalesData[];
    selectedYear?: number;
    selectedMonth?: number;
    viewMode?: 'monthly' | 'yearly';
    onYearChange?: (year: number) => void;
    onMonthChange?: (month: number) => void;
    onViewModeChange?: (mode: 'monthly' | 'yearly') => void; // 🔧 추가
}

interface YearlyMonthData {
    year: number;
    monthlyData: { month: string; amount: number; }[];
}

interface ProductSalesData {
    productName: string;
    amount: number;
    percentage: number;
    color: string;
    salesCount: number;
}

const SalesChart: React.FC<EnhancedSalesChartProps> = ({
                                                           data,
                                                           title = "매출 분석",
                                                           yearlyData = [],
                                                           productData = [],
                                                           selectedYear = new Date().getFullYear(),
                                                           selectedMonth = new Date().getMonth() + 1,
                                                           viewMode = 'monthly',
                                                           onYearChange,
                                                           onMonthChange,
                                                           onViewModeChange // 🔧 추가
                                                       }) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    // 사용 가능한 년도 목록 생성
    const availableYears = yearlyData.length > 0
        ? yearlyData.map(item => item.year)
        : [2022, 2023, 2024, 2025];

    // 사용 가능한 월 목록
    const availableMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // 현재 선택된 년도의 월별 데이터
    const currentYearData = yearlyData.find(item => item.year === selectedYear)?.monthlyData || data;

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // 총 매출액 및 성장률 계산
    const totalSales = currentYearData.reduce((sum, item) => sum + item.amount, 0);
    const growthRate = currentYearData.length >= 2
        ? ((currentYearData[currentYearData.length - 1].amount - currentYearData[currentYearData.length - 2].amount) / currentYearData[currentYearData.length - 2].amount * 100)
        : 0;

    // 상품별 매출 총합 계산
    const totalProductSales = productData.reduce((sum, item) => sum + item.amount, 0);

    const getPeriodLabel = () => {
        if (viewMode === 'yearly') {
            return `${selectedYear}년 전체`;
        } else {
            return `${selectedYear}년 ${selectedMonth}월`;
        }
    };

    return (
        <Card sx={{
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: `1px solid ${theme.palette.grey[200]}`,
            overflow: 'hidden'
        }}>
            <CardContent sx={{ p: 0 }}>
                {/* 헤더 */}
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
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: theme.palette.text.primary
                        }}
                    >
                        {title}
                    </Typography>
                </Box>

                {/* 탭 */}
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    px: 3
                }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                px: 3,
                                py: 2
                            }
                        }}
                    >
                        <Tab
                            label="기간별 매출"
                            icon={
                                <span
                                    className="material-icons"
                                    style={{ fontSize: '20px' }}
                                >
                                    trending_up
                                </span>
                            }
                            iconPosition="start"
                        />
                        <Tab
                            label="상품별 매출"
                            icon={
                                <span
                                    className="material-icons"
                                    style={{ fontSize: '20px' }}
                                >
                                    inventory
                                </span>
                            }
                            iconPosition="start"
                        />
                    </Tabs>
                </Box>

                {/* 차트 영역 */}
                <Box sx={{ minHeight: 500 }}>
                    {tabValue === 0 ? (
                        <MonthlyChart
                            data={currentYearData}
                            selectedYear={selectedYear}
                            onYearChange={onYearChange}
                            availableYears={availableYears}
                        />
                    ) : (
                        // 🔧 수정: ProductChart에 모든 필요한 props 전달
                        <ProductChart
                            data={productData}
                            selectedYear={selectedYear}
                            selectedMonth={selectedMonth}
                            viewMode={viewMode} // 🔧 viewMode 전달
                            onYearChange={onYearChange}
                            onMonthChange={onMonthChange}
                            onViewModeChange={onViewModeChange} // 🔧 viewMode 변경 핸들러 전달
                            availableYears={availableYears}
                            availableMonths={availableMonths}
                        />
                    )}
                </Box>

                {/* 요약 정보 */}
                <Box sx={{
                    p: 3,
                    backgroundColor: theme.palette.background.default,
                    borderTop: `1px solid ${theme.palette.grey[200]}`
                }}>
                    {tabValue === 0 ? (
                        // 기간별 매출 요약
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    mb: 1
                                }}
                            >
                                ₩{totalSales.toLocaleString()}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                flexWrap: 'wrap'
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {selectedYear}년 총 매출
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: growthRate >= 0 ? '#48bb78' : '#f56565',
                                    gap: 0.5
                                }}>
                                    <span className="material-icons">
                                        {growthRate >= 0 ? 'trending_up' : 'trending_down'}
                                    </span>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {Math.abs(growthRate).toFixed(1)}%
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ) : (
                        // 상품별 매출 요약
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    mb: 1
                                }}
                            >
                                ₩{totalProductSales.toLocaleString()}
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                flexWrap: 'wrap'
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    {getPeriodLabel()} 상품별 총 매출
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: theme.palette.text.secondary,
                                    gap: 0.5
                                }}>
                                    <span className="material-icons">
                                        inventory_2
                                    </span>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {productData.length}개 상품
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {/* 데이터 내보내기 버튼 */}
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={
                                <span
                                    className="material-icons"
                                    style={{ fontSize: '20px' }}
                                >
                                    file_download
                                </span>
                            }
                            onClick={() => {
                                if (tabValue === 0) {
                                    console.log('기간별 매출 데이터 내보내기:', {
                                        year: selectedYear,
                                        type: 'monthly',
                                        data: currentYearData
                                    });
                                } else {
                                    console.log('상품별 매출 데이터 내보내기:', {
                                        year: selectedYear,
                                        month: selectedMonth,
                                        viewMode: viewMode,
                                        type: 'product',
                                        data: productData
                                    });
                                }
                            }}
                            sx={{
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                textTransform: 'none',
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                borderRadius: 3,
                                '&:hover': {
                                    borderColor: theme.palette.primary.dark,
                                    backgroundColor: 'rgba(232, 152, 48, 0.04)',
                                    transform: 'translateY(-1px)'
                                }
                            }}
                        >
                            {tabValue === 0 ? '년도별 데이터 내보내기' : `${viewMode === 'yearly' ? '년도별' : '월별'} 상품 데이터 내보내기`}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SalesChart;