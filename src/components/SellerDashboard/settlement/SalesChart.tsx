import {
    Box,
    Typography,
    Card,
    CardContent,
    useTheme
} from '@mui/material';
import { SalesChartProps } from '../settlement';

const SalesChart = ({ data, title = "기간별 매출액" }: SalesChartProps) => {
    const theme = useTheme();

    // 총 매출액 계산
    const totalSales = data.reduce((sum, item) => sum + item.amount, 0);

    // 성장률 계산 (마지막 달과 그 전 달 비교)
    const growthRate = data.length >= 2
        ? ((data[data.length - 1].amount - data[data.length - 2].amount) / data[data.length - 2].amount * 100)
        : 0;

    // 간단한 CSS 차트로 대체
    const maxAmount = Math.max(...data.map(item => item.amount));

    const SimpleChart = () => (
        <Box sx={{
            display: 'flex',
            alignItems: 'end',
            gap: 1,
            height: 200,
            px: 2,
            py: 3
        }}>
            {data.map((item, index) => {
                const height = (item.amount / maxAmount) * 160;
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            gap: 1
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: theme.palette.primary.main,
                                fontWeight: 500
                            }}
                        >
                            ₩{item.amount}
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 40,
                                height: `${height}px`,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: '4px 4px 0 0',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                    transform: 'scaleY(1.1)'
                                }
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                fontSize: '0.7rem',
                                color: theme.palette.text.secondary
                            }}
                        >
                            {item.month}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );

    return (
        <Card sx={{
            height: '100%',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: `1px solid ${theme.palette.grey[200]}`,
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                transform: 'translateY(-4px)'
            }
        }}>
            <CardContent sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        fontWeight: 700,
                        color: theme.palette.text.primary
                    }}
                >
                    {title}
                </Typography>

                {/* 차트 영역 */}
                <Box sx={{ height: 280, mb: 3 }}>
                    <SimpleChart />
                </Box>

                {/* 매출 요약 */}
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
                            최근 30일
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
            </CardContent>
        </Card>
    );
};

export default SalesChart;