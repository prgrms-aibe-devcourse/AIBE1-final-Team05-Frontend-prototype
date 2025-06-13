// src/components/SellerDashboard/settlement/components/SalesInsight.tsx
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { ProductSalesData } from '@/components/SellerDashboard/settlement';

interface SalesInsightProps {
    productData: ProductSalesData[];
    selectedYear: number;
}

const SalesInsight = ({ productData, selectedYear }: SalesInsightProps) => {
    const theme = useTheme();

    const bestProduct = productData.length > 0 ? productData[0] : null;
    const averageMonthlyAmount = bestProduct ? Math.floor(bestProduct.amount / 4) : 0;

    return (
        <Box sx={{
            mt: 4,
            p: 3,
            backgroundColor: 'rgba(232, 152, 48, 0.05)',
            borderRadius: 3,
            border: `1px solid rgba(232, 152, 48, 0.2)`
        }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <span className="material-icons" style={{ fontSize: '20px', color: theme.palette.primary.main }}>
                    lightbulb
                </span>
                매출 인사이트
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{
                        p: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '16px', color: '#48bb78' }}>
                                trending_up
                            </span>
                            베스트 상품
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary, mb: 1 }}
                        >
                            {bestProduct ? `${bestProduct.productName}이(가) 가장 높은 매출을 기록했습니다.` : '판매 상품이 없습니다.'}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.primary.main, fontWeight: 500 }}
                        >
                            월 평균 ₩{averageMonthlyAmount.toLocaleString()} 매출
                        </Typography>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{
                        p: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                                mb: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <span className="material-icons" style={{ fontSize: '16px', color: '#3182ce' }}>
                                insights
                            </span>
                            성장률 분석
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary, mb: 1 }}
                        >
                            {selectedYear}년 대비 매출이 꾸준히 증가하고 있습니다.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: '#48bb78', fontWeight: 500 }}
                        >
                            평균 월 성장률: +12.5%
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SalesInsight;