// src/components/SellerDashboard/settlement/SalesChart.tsx
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
import { ReactNode, useState } from 'react';
import { SalesChartProps } from './types/settlement.types.ts';

// 컴포넌트 임포트
import MonthlyChart from './MonthlyChart';
import ProductChart from './ProductChart';
import YearSelector from './YearSelector';
import DateRangePicker from './DateRangePicker';

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

    const handleYearChange = (year: number) => {
        setCurrentYear(year);
        onYearChange?.(year);
    };

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
    };

    // 총 매출액 계산
    const totalSales = currentYearData.reduce((sum, item) => sum + item.amount, 0);

    // 성장률 계산 (마지막 달과 그 전 달 비교)
    const growthRate = currentYearData.length >= 2
        ? ((currentYearData[currentYearData.length - 1].amount - currentYearData[currentYearData.length - 2].amount) / currentYearData[currentYearData.length - 2].amount * 100)
        : 0;

    return (
        <Card sx={{
            height: '100%',
            minHeight: 500,
            maxHeight: 600,
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
                        <YearSelector
                            currentYear={currentYear}
                            availableYears={availableYears}
                            onYearChange={handleYearChange}
                        />
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
                    {tabValue === 0 ? (
                        <MonthlyChart data={currentYearData} />
                    ) : (
                        <ProductChart
                            data={productData}
                            startDate={productStartDate}
                            endDate={productEndDate}
                            onDatePickerOpen={handleProductDatePickerOpen}
                            onDateRangeChange={handleProductDateRangeChange}
                        />
                    )}
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