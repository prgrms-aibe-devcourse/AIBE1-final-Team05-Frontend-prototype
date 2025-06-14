// src/components/SellerDashboard/settlement/components/SalesInsight.tsx
import { Box, Typography, Grid, useTheme, Card, CardContent } from '@mui/material';
import { ProductSalesData, SettlementItem } from '@/components/SellerDashboard/settlement';

interface SalesInsightProps {
    productData: ProductSalesData[];
    selectedYear: number;
    selectedMonth: number;
    viewMode: 'monthly' | 'yearly';
    allSettlementData: SettlementItem[]; // 전체 정산 데이터 추가
}

// 비교 분석을 위한 데이터 계산 함수들
const calculatePeriodData = (
    data: SettlementItem[],
    year: number,
    month?: number
): { totalAmount: number; productSales: Map<string, number> } => {
    const filteredData = data.filter(item => {
        const date = new Date(item.orderDate);
        const itemYear = date.getFullYear();
        const itemMonth = date.getMonth() + 1;

        if (month !== undefined) {
            return itemYear === year && itemMonth === month;
        } else {
            return itemYear === year;
        }
    });

    const totalAmount = filteredData.reduce((sum, item) => sum + item.settlementAmount, 0);
    const productSales = new Map<string, number>();

    filteredData.forEach(item => {
        const current = productSales.get(item.productName) || 0;
        productSales.set(item.productName, current + item.settlementAmount);
    });

    return { totalAmount, productSales };
};

const SalesInsight = ({
                          productData,
                          selectedYear,
                          selectedMonth,
                          viewMode,
                          allSettlementData
                      }: SalesInsightProps) => {
    const theme = useTheme();

    // 현재 기간 데이터
    const currentData = calculatePeriodData(
        allSettlementData,
        selectedYear,
        viewMode === 'monthly' ? selectedMonth : undefined
    );

    // 전월 대비 계산 (월별 모드일 때만)
    const getPreviousMonthComparison = () => {
        if (viewMode !== 'monthly') return null;

        let prevYear = selectedYear;
        let prevMonth = selectedMonth - 1;

        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear = selectedYear - 1;
        }

        const prevData = calculatePeriodData(allSettlementData, prevYear, prevMonth);

        if (prevData.totalAmount === 0) return null;

        const growthRate = ((currentData.totalAmount - prevData.totalAmount) / prevData.totalAmount) * 100;

        return {
            prevMonth,
            prevYear,
            growthRate: Math.round(growthRate * 10) / 10,
            isPositive: growthRate >= 0
        };
    };

    // 전년 동월 대비 계산
    const getYearOverYearComparison = () => {
        const prevYear = selectedYear - 1;
        const prevYearData = calculatePeriodData(
            allSettlementData,
            prevYear,
            viewMode === 'monthly' ? selectedMonth : undefined
        );

        if (prevYearData.totalAmount === 0) return null;

        const growthRate = ((currentData.totalAmount - prevYearData.totalAmount) / prevYearData.totalAmount) * 100;

        return {
            prevYear,
            growthRate: Math.round(growthRate * 10) / 10,
            isPositive: growthRate >= 0
        };
    };

    // 상품 간 비교 분석
    const getProductComparison = () => {
        if (productData.length === 0) return null;

        const topProduct = productData[0];
        const secondProduct = productData[1];
        const totalSales = productData.reduce((sum, item) => sum + item.amount, 0);

        return {
            topProduct: {
                name: topProduct.productName,
                percentage: Math.round(topProduct.percentage * 10) / 10,
                amount: topProduct.amount
            },
            secondProduct: secondProduct ? {
                name: secondProduct.productName,
                percentage: Math.round(secondProduct.percentage * 10) / 10
            } : null,
            totalSales
        };
    };

    const previousMonthComp = getPreviousMonthComparison();
    const yearOverYearComp = getYearOverYearComparison();
    const productComp = getProductComparison();

    const getPeriodLabel = () => {
        if (viewMode === 'monthly') {
            return `${selectedYear}년 ${selectedMonth}월`;
        } else {
            return `${selectedYear}년`;
        }
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                    insights
                </span>
                매출 인사이트 - {getPeriodLabel()}
            </Typography>

            <Grid container spacing={3}>
                {/* 전월 대비 인사이트 (월별 모드일 때만) */}
                {viewMode === 'monthly' && previousMonthComp && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card sx={{
                            borderRadius: 3,
                            border: `1px solid ${previousMonthComp.isPositive ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)'}`,
                            backgroundColor: previousMonthComp.isPositive ? 'rgba(72, 187, 120, 0.05)' : 'rgba(245, 101, 101, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        mb: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <span className="material-icons" style={{
                                        fontSize: '18px',
                                        color: previousMonthComp.isPositive ? '#48bb78' : '#f56565'
                                    }}>
                                        {previousMonthComp.isPositive ? 'trending_up' : 'trending_down'}
                                    </span>
                                    전월 대비
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 1.5,
                                        lineHeight: 1.5
                                    }}
                                >
                                    <strong>{selectedMonth}월</strong> 매출은 전월({previousMonthComp.prevMonth}월) 대비{' '}
                                    <span style={{
                                        color: previousMonthComp.isPositive ? '#48bb78' : '#f56565',
                                        fontWeight: 600
                                    }}>
                                        {Math.abs(previousMonthComp.growthRate)}% {previousMonthComp.isPositive ? '증가' : '감소'}
                                    </span>
                                    했습니다.
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: previousMonthComp.isPositive ? '#48bb78' : '#f56565',
                                        fontWeight: 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    현재 매출: ₩{currentData.totalAmount.toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* 전년 동월 대비 인사이트 */}
                {yearOverYearComp && (
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card sx={{
                            borderRadius: 3,
                            border: `1px solid ${yearOverYearComp.isPositive ? 'rgba(49, 130, 206, 0.2)' : 'rgba(237, 137, 54, 0.2)'}`,
                            backgroundColor: yearOverYearComp.isPositive ? 'rgba(49, 130, 206, 0.05)' : 'rgba(237, 137, 54, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        mb: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <span className="material-icons" style={{
                                        fontSize: '18px',
                                        color: yearOverYearComp.isPositive ? '#3182ce' : '#ed8936'
                                    }}>
                                        calendar_month
                                    </span>
                                    전년 동기 대비
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 1.5,
                                        lineHeight: 1.5
                                    }}
                                >
                                    작년 {viewMode === 'monthly' ? `${selectedMonth}월` : '전체'} 대비 매출이{' '}
                                    <span style={{
                                        color: yearOverYearComp.isPositive ? '#3182ce' : '#ed8936',
                                        fontWeight: 600
                                    }}>
                                        {Math.abs(yearOverYearComp.growthRate)}% {yearOverYearComp.isPositive ? '증가' : '감소'}
                                    </span>
                                    했습니다.
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {yearOverYearComp.isPositive ? '📈' : '📉'} 연간 성장세 {yearOverYearComp.isPositive ? '유지 중' : '개선 필요'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* 상품 간 비교 인사이트 */}
                {productComp && (
                    <Grid size={{ xs: 12, md: viewMode === 'monthly' && previousMonthComp ? 12 : 6 }}>
                        <Card sx={{
                            borderRadius: 3,
                            border: `1px solid rgba(232, 152, 48, 0.2)`,
                            backgroundColor: 'rgba(232, 152, 48, 0.05)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        mb: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    <span className="material-icons" style={{
                                        fontSize: '18px',
                                        color: theme.palette.primary.main
                                    }}>
                                        inventory_2
                                    </span>
                                    상품별 매출 분석
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        mb: 1.5,
                                        lineHeight: 1.5
                                    }}
                                >
                                    <strong style={{ color: theme.palette.primary.main }}>
                                        {productComp.topProduct.name}
                                    </strong>이(가) 전체 매출의{' '}
                                    <span style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: 600
                                    }}>
                                        {productComp.topProduct.percentage}%
                                    </span>
                                    를 차지합니다.
                                    {productComp.secondProduct && (
                                        <>
                                            {' '}다음으로 인기 있는 상품은{' '}
                                            <strong>{productComp.secondProduct.name}</strong>
                                            ({productComp.secondProduct.percentage}%)입니다.
                                        </>
                                    )}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1
                                }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontWeight: 500,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        🏆 1위 상품 매출: ₩{productComp.topProduct.amount.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        총 {productData.length}개 상품 분석
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                {/* 데이터가 없을 때 */}
                {!productComp && !yearOverYearComp && (
                    <Grid size={{ xs: 12 }}>
                        <Card sx={{
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.grey[200]}`,
                            backgroundColor: theme.palette.grey[50],
                            textAlign: 'center',
                            py: 4
                        }}>
                            <CardContent>
                                <span
                                    className="material-icons"
                                    style={{
                                        fontSize: '48px',
                                        color: theme.palette.grey[300],
                                        marginBottom: '16px',
                                        display: 'block'
                                    }}
                                >
                                    analytics
                                </span>
                                <Typography
                                    variant="h6"
                                    sx={{ color: theme.palette.text.secondary, mb: 1 }}
                                >
                                    {getPeriodLabel()} 인사이트
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.secondary }}
                                >
                                    비교할 데이터가 충분하지 않습니다.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>

            {/* 추천 액션 */}
            {productComp && yearOverYearComp && (
                <Box sx={{
                    mt: 3,
                    p: 2.5,
                    backgroundColor: 'rgba(232, 152, 48, 0.08)',
                    borderRadius: 2,
                    border: `1px solid rgba(232, 152, 48, 0.2)`
                }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <span className="material-icons" style={{ fontSize: '16px', color: theme.palette.primary.main }}>
                            lightbulb
                        </span>
                        추천 액션
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6,
                            fontSize: '0.875rem'
                        }}
                    >
                        {yearOverYearComp.isPositive
                            ? `✅ 매출 성장이 지속되고 있습니다. ${productComp.topProduct.name}의 성공 요인을 분석하여 다른 상품에도 적용해보세요.`
                            : `⚠️ 매출 개선이 필요합니다. ${productComp.topProduct.name} 외 다른 상품의 마케팅 강화를 고려해보세요.`
                        }
                        {productComp.topProduct.percentage > 50 && ' 특정 상품 의존도가 높으니 포트폴리오 다양화를 검토해보세요.'}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SalesInsight;